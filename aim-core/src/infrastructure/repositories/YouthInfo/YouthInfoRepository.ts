import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { YouthInfo } from 'src/core/domains/YouthInfo/YouthInfo';
import { IYouthInfoRepository } from 'src/core/domainServices/YouthInfo/IYouthInfoRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class YouthInfoRepository
    extends GeneralDtoRepository
    implements IYouthInfoRepository
{
    constructor(
        @InjectRepository(YouthInfo) youthInfoRepository: Repository<YouthInfo>,
    ) {
        super(youthInfoRepository);
    }
}
