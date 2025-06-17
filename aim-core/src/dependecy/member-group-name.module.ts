import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberGroupNameService } from 'src/core/applicationServices/MemberGroupName/MemberGroupNameService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { MemberGroupName } from 'src/core/domains/MemberGroupName/MemberGroupName';
import { MemberGroupNameRepository } from 'src/infrastructure/repositories/MemberGroupName/MemberGroupNameRepository';
import { MemberGroupNameController } from 'src/ui/Portal/MemberGroupName/MemberGroupNameController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.MEMBERGROUPNAME_SERVICE,
            useClass: MemberGroupNameService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.MEMBERGROUPNAME_REPOSITORY,
            useClass: MemberGroupNameRepository,
        },
    ],
    controllers: [MemberGroupNameController],
    imports: [TypeOrmModule.forFeature([MemberGroupName])],
})
export class MemberGroupNameModule {}
