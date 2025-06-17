import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectUserService } from 'src/core/applicationServices/ProjectUser/ProjectUserService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ProjectUser } from 'src/core/domains/ProjectUser/ProjectUser';
import { ProjectUserRepository } from 'src/infrastructure/repositories/ProjectUser/ProjectUserRepository';
import { ProjectUserController } from 'src/ui/Portal/ProjectUser/ProjectUserController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECTUSER_SERVICE,
            useClass: ProjectUserService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PROJECTUSER_REPOSITORY,
            useClass: ProjectUserRepository,
        },
        ProjectUserService,
    ],
    controllers: [ProjectUserController],
    imports: [JwtModule.register({}), TypeOrmModule.forFeature([ProjectUser])],
})
export class ProjectUserModule {}
