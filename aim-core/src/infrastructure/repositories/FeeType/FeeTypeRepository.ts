import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeeType } from 'src/core/domains/FeeType/FeeType';
import { IFeeTypeRepository } from 'src/core/domainServices/FeeType/IFeeTypeRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class FeeTypeRepository
    extends GeneralDtoRepository
    implements IFeeTypeRepository
{
    constructor(
        @InjectRepository(FeeType)
        private feeTypeRepository: Repository<FeeType>,
    ) {
        super(feeTypeRepository);
    }
    findAllFeeTypesWithCriteria(): Promise<unknown> {
        return this.feeTypeRepository
            .createQueryBuilder()
            .leftJoinAndSelect('FeeType.activityField', 'activityField')
            .getMany();
    }

    async findFeeTypeById(id: number): Promise<unknown> {
        return {
            user: await this.findById(id, [
                { property: 'FeeType.activityField', alias: 'activityField' },
            ]),
        };
    }

    async getFeeTypeForActivityField(activityField: Array<number>) {
        let query = this.feeTypeRepository
            .createQueryBuilder()
            .where(' activity_field_id is null');
        activityField.forEach((activityField) => {
            query = query.orWhere('activity_field_id =:id', {
                id: activityField,
            });
        });
        return await query.getMany();
    }
}
