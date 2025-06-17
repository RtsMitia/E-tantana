import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EducationField } from 'src/core/domains/EducationField/EducationField';
import { IEducationFieldRepository } from 'src/core/domainServices/EducationField/IEducationFieldRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class EducationFieldRepository
    extends GeneralDtoRepository
    implements IEducationFieldRepository
{
    constructor(
        @InjectRepository(EducationField)
        educationFieldRepository: Repository<EducationField>,
    ) {
        super(educationFieldRepository);
    }
}
