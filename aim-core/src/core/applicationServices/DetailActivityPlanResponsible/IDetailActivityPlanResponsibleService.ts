import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IDetailActivityPlanResponsibleService
    extends IGeneralDtoService {
    createDetailActivityPlanResponsible(data);
}
