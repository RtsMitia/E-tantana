import { MembershipFee } from 'src/core/domains/MembershipFee/MembershipFee';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IMembershipFeeService extends IGeneralDtoService {
    membershipFeeValidation(id: number): Promise<unknown>;
    fetchAllMembershipFeesWithCriteria(criteria): Promise<unknown>;
    fetchMembershipFeeByMemberInfo(data: any): Promise<MembershipFee>;
    fetchMembershipFeeByMemberInfoName(data: any): Promise<MembershipFee>;
    fetchMembershipFeeById(id: number): Promise<unknown>;
}
