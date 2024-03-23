import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContactDto } from './dto/contact.dto';
import { swaggerDocsConstants } from 'src/common/constants/swagger.constant';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiBody({ type: ContactDto })
  @ApiOperation({
    summary: swaggerDocsConstants.CONTACT.MESSAGE.SUMMARY,
    description: swaggerDocsConstants.CONTACT.MESSAGE.DESC,
  })
  @HttpCode(HttpStatus.OK)
  async contactMe(@Body() contactDto: ContactDto): Promise<any> {
    try {
      return this.contactService.ContactMe(contactDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
