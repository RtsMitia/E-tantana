import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sacrement } from 'src/core/domains/Sacrement/Sacrement';
import { ISacrementRepository } from 'src/core/domainServices/Sacrement/ISacrementRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class SacrementRepository
    extends GeneralDtoRepository
    implements ISacrementRepository
{
    constructor(
        @InjectRepository(Sacrement)
        sacrementRepository: Repository<Sacrement>,
    ) {
        super(sacrementRepository);
    }
}
