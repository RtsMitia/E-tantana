import { MemberActivity } from 'src/core/domains/MemberActivity/MemberActivity';
import { MemberTransferRequest } from 'src/core/domains/MemberTransferRequest/MemberTransferRequest';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IMemberTransferRequestRepository
    extends IGeneralDtoRepository {
    memberTransferValidation(
        memberActivity: MemberActivity,
        memberTransferRequest: MemberTransferRequest,
        id: number,
    );
    getAllMemberTransferRequest(criteria);
}
