import { MemberActivity } from 'src/core/domains/MemberActivity/MemberActivity';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IMemberActivityRepository extends IGeneralDtoRepository {
    updateMemberActivity(id, memberActivity: MemberActivity);
    createMemberActivity(memberActivity: MemberActivity);
    findAllMemberActivitiesWithCriteria(criteria): Promise<unknown>;
    findMemberActivityById(id: number): Promise<unknown>;
    getLastMemberActivity(member_id: number);
    getMemberActivityForMember(id: number);
    getNationalPresident();
}
