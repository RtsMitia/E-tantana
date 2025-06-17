import { Member } from 'src/core/domains/Member/Member';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IMemberSacrementRepository extends IGeneralDtoRepository {
    findAllMemberSacrementsWithCriteria(criteria): Promise<unknown>;
    createMemberAndMemberSacrement(memberData: Member, query: any);
    findMemberSacrementById(id: number): Promise<unknown>;
    checkSacrementConfirmationOfMember(id: number);
}
