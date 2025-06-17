import { ActivityFieldLocation } from 'src/core/domains/ActivityFieldLocation/ActivityFieldLocation';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { SelectQueryBuilder } from 'typeorm';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IActivityFieldLocationRepository extends IGeneralDtoRepository {
    appendProperties(
        query: SelectQueryBuilder<ActivityFieldLocation>,
        properties: JoinProperties[],
    );
    findAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
    ): Promise<Record<string, any>>;
    findAllDiosezyWithGeometry(): Promise<any[]>;
    findById(id: number, properties: JoinProperties[]): Promise<ActivityFieldLocation>;

}
