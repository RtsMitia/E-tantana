import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IMemberGroupNameRepository extends IGeneralDtoRepository {
    findAllMemberGroupNamesWithCriteria(criteria): Promise<unknown>;
    findMemberGroupNameById(id: number): Promise<unknown>;
}
