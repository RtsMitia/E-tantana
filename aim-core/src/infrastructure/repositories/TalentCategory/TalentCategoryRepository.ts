import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TalentCategory } from 'src/core/domains/TalentCategory/TalentCategory';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class TalentCategoryRepository extends GeneralDtoRepository {
    constructor(
        @InjectRepository(TalentCategory)
        talentCategoryRepository: Repository<TalentCategory>,
    ) {
        super(talentCategoryRepository);
    }
}
