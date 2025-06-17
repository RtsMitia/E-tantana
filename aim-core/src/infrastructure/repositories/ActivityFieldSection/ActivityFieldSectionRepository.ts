import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityFieldSection } from 'src/core/domains/ActivityFieldSection/ActivityFieldSection';
import { IActivityFieldSectionRepository } from 'src/core/domainServices/ActivityFieldSection/IActivityFieldSectionRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class ActivityFieldSectionRepository
    extends GeneralDtoRepository
    implements IActivityFieldSectionRepository
{
    constructor(
        @InjectRepository(ActivityFieldSection)
        activityFieldSectionRepository: Repository<ActivityFieldSection>,
    ) {
        super(activityFieldSectionRepository);
    }

    findAllActivityFieldSectionsWithCriteria(criteria): Promise<unknown> {
        return this.findAllWithCriteria(criteria, [
            {
                property: 'ActivityFieldSection.activityField',
                alias: 'activityField',
            },
            { property: 'ActivityFieldSection.section', alias: 'section' },
        ]);
    }

    async findActivityFieldSectionById(id: number): Promise<unknown> {
        return {
            user: await this.findById(id, [
                {
                    property: 'ActivityFieldSection.activityField',
                    alias: 'activityField',
                },
                { property: 'ActivityFieldSection.section', alias: 'section' },
            ]),
        };
    }
}
