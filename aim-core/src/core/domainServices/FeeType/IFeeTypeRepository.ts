import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IFeeTypeRepository extends IGeneralDtoRepository {
    findAllFeeTypesWithCriteria(): Promise<unknown>;
    findFeeTypeById(id: number): Promise<unknown>;
    getFeeTypeForActivityField(activityField: Array<number>);
}
