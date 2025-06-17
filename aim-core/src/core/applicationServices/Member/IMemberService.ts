import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { Member } from 'src/core/domains/Member/Member';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IMemberService extends IGeneralDtoService {
    fetchMemberWithCriteria(criteria: any): Promise<Member>;
    fetchMemberByName(name: string): Promise<Member>;
    fetchAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
    ): Promise<Record<string, any>>;
    fetchMemberCard(id: number);
}
