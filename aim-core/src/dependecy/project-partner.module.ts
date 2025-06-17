import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectPartnerService } from 'src/core/applicationServices/ProjectPartner/ProjectPartnerService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ProjectPartner } from 'src/core/domains/ProjectPartner/ProjectPartner';
import { ProjectPartnerRepository } from 'src/infrastructure/repositories/ProjectPartner/ProjectPartnerRepository';
import { ProjectPartnerController } from 'src/ui/Portal/ProjectPartner/ProjectPartnerController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECTPARTNER_SERVICE,
            useClass: ProjectPartnerService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PROJECTPARTNER_REPOSITORY,
            useClass: ProjectPartnerRepository,
        },
    ],
    controllers: [ProjectPartnerController],
    imports: [TypeOrmModule.forFeature([ProjectPartner])],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECTPARTNER_SERVICE,
            useClass: ProjectPartnerService,
        },
    ],
})
export class ProjectPartnerModule {}
