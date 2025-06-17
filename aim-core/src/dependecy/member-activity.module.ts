import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberActivityService } from 'src/core/applicationServices/MemberActivity/MemberActivityService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { MemberActivity } from 'src/core/domains/MemberActivity/MemberActivity';
import { MemberActivityRepository } from 'src/infrastructure/repositories/MemberActivity/MemberActivityRepository';
import { MemberActivityController } from 'src/ui/Portal/MemberActivity/MemberActivityController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.MEMBERACTIVITY_SERVICE,
            useClass: MemberActivityService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.MEMBERACTIVITY_REPOSITORY,
            useClass: MemberActivityRepository,
        },
    ],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.MEMBERACTIVITY_SERVICE,
            useClass: MemberActivityService,
        },
    ],
    controllers: [MemberActivityController],
    imports: [TypeOrmModule.forFeature([MemberActivity])],
})
export class MemberActivityModule {}
