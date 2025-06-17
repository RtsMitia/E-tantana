import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IEducationFieldRepository } from 'src/core/domainServices/EducationField/IEducationFieldRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IEducationFieldService } from './IEducationFieldService';

@Injectable()
export class EducationFieldService
    extends GeneralDtoService
    implements IEducationFieldService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.EDUCATIONFIELD_REPOSITORY)
        educationFieldRepository: IEducationFieldRepository,
    ) {
        super(educationFieldRepository);
    }
}
