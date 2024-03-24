import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ContactDto } from './dto/contact.dto';
import { EmailOptions } from './interfaces/email-options.interface';
import { ConfigService } from '@nestjs/config';
import { ProfileService } from 'src/profile/profile.service';
import * as fs from 'fs';
import { join } from 'path';
import { contactConstants } from 'src/common/constants/contact.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './schemas/contact.schema';
import { Model } from 'mongoose';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
    private readonly profileService: ProfileService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Sends a contact message.
   * @param contactDto The contact message data.
   * @returns A promise that resolves to a success message upon successful email sending.
   * @throws InternalServerErrorException if an error occurs during email sending.
   */
  async ContactMe(contactDto: ContactDto): Promise<any> {
    try {
      const { senderEmail, senderName, toProfileId, subject, message } =
        contactDto;
      const profile = await this.profileService.getProfileById(toProfileId);
      if (!profile) {
        throw new BadRequestException(contactConstants.INVALID_PROFILE);
      }
      const noReplyEmail = profile?.autoEmailCredentials?.email;
      const noReplyPasscode = profile?.autoEmailCredentials?.passcode;

      const defaultNoReplyEmail = this.configService.get(
        contactConstants.NO_REPLY_EMAIL_ADDRESS,
      );
      const defaultNoReplyPasscode = this.configService.get(
        contactConstants.NO_REPLY_EMAIL_PASSCODE,
      );

      // Send auto reply to the sender email address
      await this.sendAutoReply(
        noReplyEmail ?? defaultNoReplyEmail,
        noReplyPasscode ?? defaultNoReplyPasscode,
        senderEmail,
        senderName,
        subject,
        message,
        profile?.firstname,
        profile?.contactDetails.email,
        profile?.contactDetails?.phone,
      );

      // Send a notification to the owner email address
      await this.sendNotification(
        noReplyEmail ?? defaultNoReplyEmail,
        noReplyPasscode ?? defaultNoReplyPasscode,
        senderEmail,
        senderName,
        subject,
        message,
        profile?.firstname,
        profile?.contactDetails.email,
      );
      const newContactMsg = new this.contactModel(contactDto);
      await newContactMsg.save();
      return { message: contactConstants.SUCCESS };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Sends an auto-reply email to the sender.
   * @param noReplyEmailAddress The sender's email address.
   * @param noReplyEmailPassword The sender's email password.
   * @param senderEmail The sender's email address.
   * @param senderName The sender's name.
   * @param subject The email subject.
   * @param message The email message.
   * @param ownerName The owner's name.
   * @param ownerEmail The owner's email address.
   * @param ownerPhone The owner's phone number.
   * @returns A promise that resolves to a success message upon successful email sending.
   * @throws InternalServerErrorException if an error occurs during email sending.
   */
  private async sendAutoReply(
    noReplyEmailAddress: string,
    noReplyEmailPassword: string,
    senderEmail: string,
    senderName: string,
    subject: string,
    message: string,
    ownerName: string,
    ownerEmail: string,
    ownerPhone: string,
  ): Promise<string> {
    const filePath = join(__dirname, '../../public/templates/auto-reply.html');
    const htmlTemplate = fs.readFileSync(filePath, 'utf-8');
    const htmlContent = htmlTemplate
      .replaceAll('{{senderName}}', senderName)
      .replaceAll('{{senderEmail}}', senderEmail)
      .replaceAll('{{subject}}', subject)
      .replaceAll('{{message}}', message)
      .replaceAll('{{ownerName}}', ownerName)
      .replaceAll('{{ownerEmail}}', ownerEmail)
      .replaceAll('{{ownerPhone}}', ownerPhone);

    const autoReplySubject = contactConstants.AUTO_REPLY_SUBJECT;
    return await this.sendEmail(
      noReplyEmailAddress,
      noReplyEmailPassword,
      senderEmail,
      autoReplySubject,
      htmlContent,
    );
  }

  /**
   * Sends a notification email to the profile owner.
   * @param noReplyEmailAddress The sender's email address.
   * @param noReplyEmailPassword The sender's email password.
   * @param senderEmail The sender's email address.
   * @param senderName The sender's name.
   * @param subject The email subject.
   * @param message The email message.
   * @param ownerName The owner's name.
   * @param ownerEmail The owner's email address.
   * @returns A promise that resolves to a success message upon successful email sending.
   * @throws InternalServerErrorException if an error occurs during email sending.
   */
  private async sendNotification(
    noReplyEmailAddress: string,
    noReplyEmailPassword: string,
    senderEmail: string,
    senderName: string,
    subject: string,
    message: string,
    ownerName: string,
    ownerEmail: string,
  ): Promise<string> {
    const filePath = join(
      __dirname,
      '../../public/templates/notification.html',
    );
    const htmlTemplate = fs.readFileSync(filePath, 'utf-8');

    const htmlContent = htmlTemplate
      .replaceAll('{{senderName}}', senderName)
      .replaceAll('{{senderEmail}}', senderEmail)
      .replaceAll('{{subject}}', subject)
      .replaceAll('{{message}}', message)
      .replaceAll('{{ownerName}}', ownerName);

    const notificationSubject = `New Email from ${senderName}`;
    return await this.sendEmail(
      noReplyEmailAddress,
      noReplyEmailPassword,
      ownerEmail,
      notificationSubject,
      htmlContent,
    );
  }

  /**
   * Sends an email.
   * @param senderEmailAddress The sender's email address.
   * @param senderEmailPassword The sender's email password.
   * @param to The recipient's email address.
   * @param subject The email subject.
   * @param htmlConent The email HTML content.
   * @returns A promise that resolves to a success message upon successful email sending.
   * @throws InternalServerErrorException if an error occurs during email sending.
   */
  private async sendEmail(
    senderEmailAddress: string,
    senderEmailPassword: string,
    to: string,
    subject: string,
    htmlConent: string,
  ): Promise<string> {
    const transporter = nodemailer.createTransport({
      service: contactConstants.EMAIL_SERVICE,
      auth: {
        user: senderEmailAddress,
        pass: senderEmailPassword,
      },
    });

    const emailOptions: EmailOptions = {
      from: senderEmailAddress,
      to,
      subject,
      html: htmlConent,
    };

    try {
      const info = await transporter.sendMail(emailOptions);
      console.log(`Email sent: ${info.response}`);
      return `Email send to ${to} successfully.`;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
