import { MailerService } from '@nestjs-modules/mailer';
import { IMailService } from './IMailService';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService implements IMailService {
    constructor(private mailerService: MailerService) {}

    async sendMail(email, data): Promise<void> {
        const template = data.template;
        const subject = data.subject;
        delete data.template;
        return await this.mailerService.sendMail({
            to: email,
            subject,
            template,
            context: data,
        });
    }
}
