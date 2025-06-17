import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HierarchyService } from 'src/core/applicationServices/Hierarchy/HierarchyService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { Hierarchy } from 'src/core/domains/Hierarchy/Hierarchy';
import { HierarchyRepository } from 'src/infrastructure/repositories/Hierarchy/HierarchyRepository';
import { HierarchyController } from 'src/ui/Portal/Hierarchy/HierarchyController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.HIERARCHY_SERVICE,
            useClass: HierarchyService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.HIERARCHY_REPOSITORY,
            useClass: HierarchyRepository,
        },
    ],
    controllers: [HierarchyController],
    imports: [TypeOrmModule.forFeature([Hierarchy])],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.HIERARCHY_SERVICE,
            useClass: HierarchyService,
        },
    ],
})
export class HierarchyModule {}
