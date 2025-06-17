import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ITalentCategoryRepository } from 'src/core/domainServices/TalentCategory/ITalentCategoryRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { ITalentCategoryService } from './ITalentCategoryService';

@Injectable()
export class TalentCategoryService
    extends GeneralDtoService
    implements ITalentCategoryService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.TALENTCATEGORY_REPOSITORY)
        talentCategoryRepository: ITalentCategoryRepository,
    ) {
        super(talentCategoryRepository);
    }
}
