import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberRoleService } from 'src/core/applicationServices/MemberRole/MemberRoleService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { MemberRole } from 'src/core/domains/MemberRole/MemberRole';
import { MemberRoleRepository } from 'src/infrastructure/repositories/MemberRole/MemberRoleRepository';
import { MemberRoleController } from 'src/ui/Portal/MemberRole/MemberRoleController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.MEMBERROLE_SERVICE,
            useClass: MemberRoleService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.MEMBERROLE_REPOSITORY,
            useClass: MemberRoleRepository,
        },
    ],
    controllers: [MemberRoleController],
    imports: [TypeOrmModule.forFeature([MemberRole])],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.MEMBERROLE_SERVICE,
            useClass: MemberRoleService,
        },
    ],
})
export class MemberRoleModule {}
