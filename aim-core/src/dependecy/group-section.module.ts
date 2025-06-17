import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupSectionService } from 'src/core/applicationServices/GroupSection/GroupSectionService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { GroupSection } from 'src/core/domains/GroupSection/GroupSection';
import { GroupSectionRepository } from 'src/infrastructure/repositories/GroupSection/GroupSectionRepository';
import { GroupSectionController } from 'src/ui/Portal/GroupSection/GroupSectionController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.GROUPSECTION_SERVICE,
            useClass: GroupSectionService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.GROUPSECTION_REPOSITORY,
            useClass: GroupSectionRepository,
        },
    ],
    controllers: [GroupSectionController],
    imports: [TypeOrmModule.forFeature([GroupSection])],
})
export class GroupSectionModule {}
