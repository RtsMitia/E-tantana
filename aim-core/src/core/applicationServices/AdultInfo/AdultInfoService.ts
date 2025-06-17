import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { AdultInfo } from 'src/core/domains/AdultInfo/AdultInfo';
import { IAdultInfoRepository } from 'src/core/domainServices/AdultInfo/IAdultInfoRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IAdultInfoService } from './IAdultInfoService';

@Injectable()
export class AdultInfoService
    extends GeneralDtoService
    implements IAdultInfoService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.ADULTINFO_REPOSITORY)
        private readonly adultInfoRepository: IAdultInfoRepository,
    ) {
        super(adultInfoRepository);
    }

    async fetchAllAdultInfosWithCriteria(criteria): Promise<unknown> {
        return this.adultInfoRepository.findAllAdultInfosWithCriteria(criteria);
    }

    async fetchAdultInfoById(id: number): Promise<unknown> {
        return this.adultInfoRepository.findAdultInfoById(id);
    }

    async saveAdultInfo(data: AdultInfo) {
        return this.adultInfoRepository.saveAdultInfo(data);
    }
}
