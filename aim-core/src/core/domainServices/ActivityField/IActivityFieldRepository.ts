import { ActivityField } from 'src/core/domains/ActivityField/ActivityField';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { SelectQueryBuilder } from 'typeorm';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IActivityFieldRepository extends IGeneralDtoRepository {
    getActivityFieldsFromSuperiorFieldIdAndHierarchy(data: any);
    appendProperties(
        query: SelectQueryBuilder<ActivityField>,
        properties: JoinProperties[],
    );
    paymentStatisticByHierarchy(criteria: any);
    findAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
    ): Promise<Record<string, any>>;
    findById(id: number, properties: JoinProperties[]): Promise<ActivityField>;
    getSuperiors(id: number);
    getInferiorActivityFields(id);
    getAllInferiorActivityFields(id);
}
