import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'aws-sdk';
import { AppModule } from './app.module';

async function bootstrap() {
    config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
    await app.listen(80);
}
bootstrap();
