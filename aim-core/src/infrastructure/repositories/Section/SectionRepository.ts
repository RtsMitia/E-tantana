import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from 'src/core/domains/Section/Section';
import { ISectionRepository } from 'src/core/domainServices/Section/ISectionRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class SectionRepository
    extends GeneralDtoRepository
    implements ISectionRepository
{
    constructor(
        @InjectRepository(Section) sectionRepository: Repository<Section>,
    ) {
        super(sectionRepository);
    }
}
