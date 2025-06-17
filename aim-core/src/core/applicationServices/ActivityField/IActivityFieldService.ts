import { ActivityField } from 'src/core/domains/ActivityField/ActivityField';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IActivityFieldService extends IGeneralDtoService {
    fetchActivityFieldsFromSuperiorFieldIdAndHierarchy(data: any);
    paymentStatisticByHierarchy(criteria: any);
    fetchAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
    ): Promise<Record<string, any>>;
    fetchById(id: number, properties: JoinProperties[]): Promise<ActivityField>;
    getSuperiors(id: number);
    getAllInferiorActivityFields(id);
}
