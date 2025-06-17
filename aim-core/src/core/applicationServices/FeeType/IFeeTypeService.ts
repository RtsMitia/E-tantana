import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IFeeTypeService extends IGeneralDtoService {
    fetchAllFeeTypesWithCriteria(): Promise<unknown>;
    fetchFeeTypeById(id: number): Promise<unknown>;
    fetchFeeTypeForActivityField(activityField: Array<number>);
}
