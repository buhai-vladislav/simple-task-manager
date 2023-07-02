import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Auth';
import { UserModule } from './User';
import { TaskModule } from './Task';
import { MailModule } from './Mail';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../src/frontend/build'),
    }),
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
