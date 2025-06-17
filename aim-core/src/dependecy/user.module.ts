import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/core/applicationServices/User/UserService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { User } from 'src/core/domains/User/User';
import { UserRepository } from 'src/infrastructure/repositories/User/UserRepository';
import { UserController } from 'src/ui/Portal/User/UserController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { MemberActivityModule } from './member-activity.module';
import { MemberModule } from './member.module';
import { MailModule } from './mail.module';
import { ConfigModule } from '@nestjs/config';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.USER_SERVICE,
            useClass: UserService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.USER_REPOSITORY,
            useClass: UserRepository,
        },
    ],
    controllers: [UserController],
    imports: [
        JwtModule.register({}),
        TypeOrmModule.forFeature([User]),
        MemberModule,
        MemberActivityModule,
        MailModule,
        ConfigModule,
    ],
})
export class UserModule {}
