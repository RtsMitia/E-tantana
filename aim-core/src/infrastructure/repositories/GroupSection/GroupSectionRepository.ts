import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupSection } from 'src/core/domains/GroupSection/GroupSection';
import { IGroupSectionRepository } from 'src/core/domainServices/GroupSection/IGroupSectionRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class GroupSectionRepository
    extends GeneralDtoRepository
    implements IGroupSectionRepository
{
    constructor(
        @InjectRepository(GroupSection)
        GroupSectionRepository: Repository<GroupSection>,
    ) {
        super(GroupSectionRepository);
    }

    findAllGroupSectionsWithCriteria(criteria): Promise<unknown> {
        return this.findAllWithCriteria(criteria, [
            {
                property: 'GroupSection.activityFieldSection',
                alias: 'activityFieldSection',
            },
        ]);
    }

    async findGroupSectionById(id: number): Promise<unknown> {
        return {
            user: await this.findById(id, [
                {
                    property: 'GroupSection.activityFieldSection',
                    alias: 'activityFieldSection',
                },
            ]),
        };
    }
}
