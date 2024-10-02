import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
const session = require('express-session');
import { NestExpressApplication } from '@nestjs/platform-express';
import { RootModule } from './di/root.module';

export class ServerApplication {
  public async run(): Promise<void> {
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(RootModule);
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Strip properties that do not have decorators
        forbidNonWhitelisted: true, // Throw an error if unknown properties are found
        transform: true, // Automatically transform payloads to DTO instances
      }),
    );

    app.use(
      session({
        secret: 'my-secret-key', // Replace with a secure secret
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set to true if using HTTPS
      }),
    );

    await app.listen(3333);
    console.log('Server is online!');
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
