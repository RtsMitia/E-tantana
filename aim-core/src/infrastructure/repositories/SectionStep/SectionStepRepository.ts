import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionStep } from 'src/core/domains/SectionStep/SectionStep';
import { ISectionStepRepository } from 'src/core/domainServices/SectionStep/ISectionStepRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class SectionStepRepository
    extends GeneralDtoRepository
    implements ISectionStepRepository
{
    constructor(
        @InjectRepository(SectionStep)
        sectionStepRepository: Repository<SectionStep>,
    ) {
        super(sectionStepRepository);
    }

    findAllSectionStepsWithCriteria(criteria): Promise<unknown> {
        return this.findAllWithCriteria(criteria, [
            { property: 'SectionStep.section', alias: 'section' },
        ]);
    }

    async findSectionStepById(id: number): Promise<unknown> {
        return {
            user: await this.findById(id, [
                { property: 'SectionStep.section', alias: 'section' },
            ]),
        };
    }
}
