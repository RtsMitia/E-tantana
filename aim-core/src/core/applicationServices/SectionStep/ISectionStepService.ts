import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface ISectionStepService extends IGeneralDtoService {
    fetchAllSectionStepsWithCriteria(criteria): Promise<unknown>;
    fetchSectionStepById(id: number): Promise<unknown>;
}
