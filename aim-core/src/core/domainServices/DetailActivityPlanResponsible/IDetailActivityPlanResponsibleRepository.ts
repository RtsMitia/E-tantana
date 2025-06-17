import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IDetailActivityPlanResponsibleRepository
    extends IGeneralDtoRepository {
    createDetailActivityPlanResponsible(data);
}
