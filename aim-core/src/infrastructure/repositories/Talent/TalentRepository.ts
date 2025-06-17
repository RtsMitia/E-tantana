import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talent } from 'src/core/domains/Talent/Talent';
import { ITalentRepository } from 'src/core/domainServices/Talent/ITalentRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class TalentRepository
    extends GeneralDtoRepository
    implements ITalentRepository
{
    constructor(
        @InjectRepository(Talent) talentRepository: Repository<Talent>,
    ) {
        super(talentRepository);
    }
}
