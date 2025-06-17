import { Member } from 'src/core/domains/Member/Member';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IMemberSacrementService extends IGeneralDtoService {
    fetchAllMemberSacrementsWithCriteria(criteria): Promise<unknown>;
    createMemberAndMemberSacrement(memberData: Member, query: any);
    fetchMemberSacrementById(id: number): Promise<unknown>;
    checkSacrementConfirmationOfMember(id: number);
}
