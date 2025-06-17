import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { Member } from 'src/core/domains/Member/Member';
import { IMemberRepository } from 'src/core/domainServices/Member/IMemberRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IMemberService } from './IMemberService';

@Injectable()
export class MemberService extends GeneralDtoService implements IMemberService {
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.MEMBER_REPOSITORY)
        private readonly memberRepository: IMemberRepository,
    ) {
        super(memberRepository);
    }

    async fetchMemberWithCriteria(criteria: any): Promise<Member> {
        return await this.memberRepository.findMemberWithCriteria(criteria);
    }

    async fetchMemberByName(name: string): Promise<Member> {
        return await this.memberRepository.findMemberByName(name);
    }

    async fetchAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
    ): Promise<Record<string, any>> {
        return await this.memberRepository.findAllWithCriteria(
            criteria,
            properties,
        );
    }

    async fetchMemberCard(id: number) {
        return await this.memberRepository.getMemberCard(id);
    }
}
