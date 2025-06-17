import { MembershipFee } from 'src/core/domains/MembershipFee/MembershipFee';
import { SelectQueryBuilder } from 'typeorm';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IMembershipFeeRepository extends IGeneralDtoRepository {
    membershipFeeValidation(id: number): Promise<unknown>;
    findAllMembershipFeesWithCriteria(criteria): Promise<unknown>;
    appendHierarchyCondition(
        query: SelectQueryBuilder<MembershipFee>,
        id: number,
    );
    getMembershipFeeByMemberInfo(data: any): Promise<MembershipFee>;
    getMembershipFeeByMemberInfoName(data: any): Promise<MembershipFee>;
    findMembershipFeeById(id: number): Promise<unknown>;
}
