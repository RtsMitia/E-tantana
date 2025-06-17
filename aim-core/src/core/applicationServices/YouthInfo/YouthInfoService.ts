import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IYouthInfoRepository } from 'src/core/domainServices/YouthInfo/IYouthInfoRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IYouthInfoService } from './IYouthInfoService';

@Injectable()
export class YouthInfoService
    extends GeneralDtoService
    implements IYouthInfoService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.YOUTHINFO_REPOSITORY)
        youthInfoRepository: IYouthInfoRepository,
    ) {
        super(youthInfoRepository);
    }
}
