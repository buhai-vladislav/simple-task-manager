import { Module } from '@nestjs/common';
import { MailService } from '../services/Mail';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        auth: {
          user: process.env.MAIL_FROM,
          pass: process.env.MAIL_PASS,
        },
        port: 587,
        host: 'smtp.gmail.com',
      },
      defaults: {
        from: '"Messor" <noreply@mail.com>',
      },
    }),
  ],
  providers: [MailService],
  exports: [],
})
export class MailModule {}
