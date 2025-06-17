import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectToolService } from 'src/core/applicationServices/ProjectTool/ProjectToolService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ProjectTool } from 'src/core/domains/ProjectTool/ProjectTool';
import { ProjectToolRepository } from 'src/infrastructure/repositories/ProjectTool/ProjectToolRepository';
import { ProjectToolController } from 'src/ui/Portal/ProjectTool/ProjectToolController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECTTOOL_SERVICE,
            useClass: ProjectToolService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PROJECTTOOL_REPOSITORY,
            useClass: ProjectToolRepository,
        },
    ],
    controllers: [ProjectToolController],
    imports: [TypeOrmModule.forFeature([ProjectTool])],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECTTOOL_SERVICE,
            useClass: ProjectToolService,
        },
    ],
})
export class ProjectToolModule {}
