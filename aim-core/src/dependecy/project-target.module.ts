import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTargetService } from 'src/core/applicationServices/ProjectTarget/ProjectTargetService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ProjectTarget } from 'src/core/domains/ProjectTarget/ProjectTarget';
import { ProjectTargetRepository } from 'src/infrastructure/repositories/ProjectTarget/ProjectTargetRepository';
import { ProjectTargetController } from 'src/ui/Portal/ProjectTarget/ProjectTargetController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECTTARGET_SERVICE,
            useClass: ProjectTargetService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PROJECTTARGET_REPOSITORY,
            useClass: ProjectTargetRepository,
        },
    ],
    controllers: [ProjectTargetController],
    imports: [TypeOrmModule.forFeature([ProjectTarget])],
})
export class ProjectTargetModule {}
