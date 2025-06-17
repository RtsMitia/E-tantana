import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcessType } from 'src/core/domains/ProcessType/ProcessType';
import { IProcessTypeRepository } from 'src/core/domainServices/ProcessType/IProcessTypeRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class ProcessTypeRepository
    extends GeneralDtoRepository
    implements IProcessTypeRepository
{
    constructor(
        @InjectRepository(ProcessType)
        processTypeRepository: Repository<ProcessType>,
    ) {
        super(processTypeRepository);
    }
}
