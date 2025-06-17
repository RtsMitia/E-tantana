import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface ISectionStepRepository extends IGeneralDtoRepository {
    findAllSectionStepsWithCriteria(criteria): Promise<unknown>;
    findSectionStepById(id: number): Promise<unknown>;
}
