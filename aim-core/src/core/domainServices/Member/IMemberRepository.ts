import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { Member } from 'src/core/domains/Member/Member';
import { IGeneralDtoRepository } from 'src/core/domainServices/GeneralDto/IGeneralDtoRepository';
import { SelectQueryBuilder } from 'typeorm';

export interface IMemberRepository extends IGeneralDtoRepository {
    appendProperties(
        query: SelectQueryBuilder<Member>,
        properties: JoinProperties[],
    );
    findMemberWithCriteria(criteria: any): Promise<Member>;
    findMemberByName(name: string): Promise<Member>;
    findAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
    ): Promise<Record<string, any>>;
    getMemberCard(id: number);
}
