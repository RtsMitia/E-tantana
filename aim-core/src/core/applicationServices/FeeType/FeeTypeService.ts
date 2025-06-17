import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IFeeTypeRepository } from 'src/core/domainServices/FeeType/IFeeTypeRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IFeeTypeService } from './IFeeTypeService';

@Injectable()
export class FeeTypeService
    extends GeneralDtoService
    implements IFeeTypeService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.FEETYPE_REPOSITORY)
        private readonly feeTypeRepository: IFeeTypeRepository,
    ) {
        super(feeTypeRepository);
    }
    async fetchAllFeeTypesWithCriteria(): Promise<unknown> {
        return await this.feeTypeRepository.findAllFeeTypesWithCriteria();
    }

    async fetchFeeTypeById(id: number): Promise<unknown> {
        return await this.feeTypeRepository.findFeeTypeById(id);
    }

    async fetchFeeTypeForActivityField(activityField: Array<number>) {
        return await this.feeTypeRepository.getFeeTypeForActivityField(
            activityField,
        );
    }
}
