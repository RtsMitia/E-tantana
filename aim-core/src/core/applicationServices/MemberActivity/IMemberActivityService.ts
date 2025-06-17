import { IGeneralDtoService } from 'src/core/applicationServices/GeneralDto/IGeneralDtoService';
import { MemberActivity } from 'src/core/domains/MemberActivity/MemberActivity';

export interface IMemberActivityService extends IGeneralDtoService {
    updateMemberActivity(id, memberActivity: MemberActivity);
    createMemberActivity(memberActivity: MemberActivity);
    fetchAllMemberActivitiesWithCriteria(criteria): Promise<unknown>;
    fetchMemberActivityById(id: number): Promise<unknown>;
    fetchLastMemberActivity(member_id: number);
    fetchMemberActivityForMember(id: number);
    fetchNationalPresident();
}
