import { MemberActivity } from 'src/core/domains/MemberActivity/MemberActivity';
import { MemberTransferRequest } from 'src/core/domains/MemberTransferRequest/MemberTransferRequest';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IMemberTransferRequestService extends IGeneralDtoService {
    memberTransferValidation(
        memberActivity: MemberActivity,
        memberTransferRequest: MemberTransferRequest,
        id: number,
    );
    fetchAllMemberTransferRequest(criteria);
}
