import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  public async sendMail(options: ISendMailOptions) {
    try {
      await this.mailService.sendMail(options);
    } catch (error) {
      console.log(error);
    }
  }
}
