import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hierarchy } from 'src/core/domains/Hierarchy/Hierarchy';
import { IHierarchyRepository } from 'src/core/domainServices/Hierarchy/IHierarchyRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class HierarchyRepository
    extends GeneralDtoRepository
    implements IHierarchyRepository
{
    constructor(
        @InjectRepository(Hierarchy)
        private hierarchyRepository: Repository<Hierarchy>,
    ) {
        super(hierarchyRepository);
    }

    findAllHierarchies() {
        return this.hierarchyRepository
            .createQueryBuilder()
            .orderBy('level', 'ASC')
            .getMany();
    }

    getHierarchies() {
        return this.hierarchyRepository
            .createQueryBuilder()
            .where('level != 1')
            .orderBy('level', 'ASC')
            .getMany();
    }
}
