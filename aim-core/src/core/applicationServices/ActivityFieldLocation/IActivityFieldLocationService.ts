import { ActivityFieldLocation } from 'src/core/domains/ActivityFieldLocation/ActivityFieldLocation';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IActivityFieldLocationService extends IGeneralDtoService {
    fetchAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
    ): Promise<Record<string, any>>;
    fetchById(id: number, properties: JoinProperties[]): Promise<ActivityFieldLocation>;
}