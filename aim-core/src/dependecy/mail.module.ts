import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from 'src/core/applicationServices/Mail/MailService';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    imports: [MailerModule],
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.MAIL_SERVICE,
            useClass: MailService,
        },
    ],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.MAIL_SERVICE,
            useClass: MailService,
        },
    ],
})
export class MailModule {}
