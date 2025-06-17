import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberService } from 'src/core/applicationServices/Member/MemberService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { Member } from 'src/core/domains/Member/Member';
import { MemberRepository } from 'src/infrastructure/repositories/Member/MemberRepository';
import { MemberController } from 'src/ui/Portal/Member/MemberController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { ActivityFieldModule } from './activity-field.module';
import { MemberActivityModule } from './member-activity.module';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.MEMBER_SERVICE,
            useClass: MemberService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.MEMBER_REPOSITORY,
            useClass: MemberRepository,
        },
    ],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.MEMBER_SERVICE,
            useClass: MemberService,
        },
    ],
    controllers: [MemberController],
    imports: [
        TypeOrmModule.forFeature([Member]),
        MemberActivityModule,
        ActivityFieldModule,
    ],
})
export class MemberModule {}
