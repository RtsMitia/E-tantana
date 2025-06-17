import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ITalentRepository } from 'src/core/domainServices/Talent/ITalentRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { ITalentService } from './ITalentService';

@Injectable()
export class TalentService extends GeneralDtoService implements ITalentService {
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.TALENT_REPOSITORY)
        talentRepository: ITalentRepository,
    ) {
        super(talentRepository);
    }
}
