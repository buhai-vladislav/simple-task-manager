import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Auth';
import { UserModule } from './User';
import { TaskModule } from './Task';
import { MailModule } from './Mail';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `.${process.env.NODE_ENV}.env`
        : '.env',
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    TaskModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
  exports: [ConfigModule],
})
export class AppModule {
  static port: number;

  constructor() {
    AppModule.port = Number.parseInt(process.env.PORT) || 4000;
  }
}
