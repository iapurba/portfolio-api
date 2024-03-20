import { Injectable, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ContactDto } from './dto/contact.dto';
import { EmailOptions } from './interfaces/email-options.interface';
import { ConfigService } from '@nestjs/config';
import { ProfileService } from 'src/profile/profile.service';
import * as fs from 'fs';
import { join } from 'path';
import { contactConstants } from 'src/common/constants/contact.constant';

@Injectable()
export class ContactService {
  constructor(
    private readonly profileService: ProfileService,
    private readonly configService: ConfigService,
  ) {}

  async ContactMe(contactDto: ContactDto): Promise<any> {
    const { senderEmail, senderName, toProfileId, subject, message } =
      contactDto;
    const owner = await this.profileService.getProfileById(toProfileId);
    if (!owner) {
      throw new NotFoundException('Owner Profile Not Found');
    }
    const ownerName = `${owner.firstname}_${owner.lastname}`.toUpperCase();
    console.log(ownerName);

    const noReplyEmailAddress = this.configService.get(
      ownerName === 'SOURAV_DINDA'
        ? 'NO_REPLY_EMAIL_ADDRESS'
        : 'NO_REPLY_EMAIL_ADDRESS_2',
    );
    const noReplyEmailPassword = this.configService.get(
      ownerName === 'SOURAV_DINDA'
        ? 'NO_REPLY_EMAIL_PASSWORD'
        : 'NO_REPLY_EMAIL_PASSWORD_2',
    );
    // Send auto reply to the sender email address
    const autoReply = await this.sendAutoReply(
      noReplyEmailAddress,
      noReplyEmailPassword,
      senderEmail,
      senderName,
      subject,
      message,
      owner?.firstname,
      owner?.contactDetails?.email,
      owner?.contactDetails?.phone,
    );

    // Send a notification to the owner email address
    const notification = await this.sendNotification(
      noReplyEmailAddress,
      noReplyEmailPassword,
      senderEmail,
      senderName,
      subject,
      message,
      owner?.firstname,
      owner?.contactDetails?.email,
    );
    return {
      info: {
        autoReply,
        notification,
      },
    };
  }

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
      console.log(error.message);
      throw new Error('Failed to send email');
    }
  }
}
