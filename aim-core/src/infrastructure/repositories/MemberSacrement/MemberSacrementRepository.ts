import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMemberService } from 'src/core/applicationServices/Member/IMemberService';
import { ISacrementService } from 'src/core/applicationServices/Sacrement/ISacrementService';
import { Member } from 'src/core/domains/Member/Member';
import { MemberSacrement } from 'src/core/domains/MemberSacrement/MemberSacrement';
import { IMemberSacrementRepository } from 'src/core/domainServices/MemberSacrement/IMemberSacrementRepository';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class MemberSacrementRepository
    extends GeneralDtoRepository
    implements IMemberSacrementRepository
{
    constructor(
        @InjectRepository(MemberSacrement)
        private memberSacrementRepository: Repository<MemberSacrement>,
        @Inject(SERVICE_MAPPING_TOKEN.MEMBER_SERVICE)
        private memberService: IMemberService,
        @Inject(SERVICE_MAPPING_TOKEN.SACREMENT_SERVICE)
        private sacrementService: ISacrementService,
    ) {
        super(memberSacrementRepository);
    }

    findAllMemberSacrementsWithCriteria(criteria): Promise<unknown> {
        return this.findAllWithCriteria(criteria, [
            { property: 'MemberSacrement.sacrement', alias: 'sacrement' },
            { property: 'MemberSacrement.member', alias: 'member' },
        ]);
    }

    async createMemberAndMemberSacrement(memberData: Member, query: any) {
        const member = this.memberService.save(memberData);
        return member.then(async (member: Member) => {
            let data = null;
            if (query.sacrement) {
                const sacrements = query.sacrement.split(',');
                data = sacrements.map(async (sacrementName) => {
                    const name = sacrementName.replace(' ', '');
                    const sacrement =
                        await this.sacrementService.fetchIdWithCriteria({
                            name: name,
                        });
                    const memberSacrement = new MemberSacrement();
                    memberSacrement.sacrement_id = sacrement.id;
                    memberSacrement.member_id = member.id;
                    await this.save(memberSacrement);
                });
                await Promise.all(data);
                return member;
            } else {
                return member;
            }
        });
    }

    async findMemberSacrementById(id: number): Promise<unknown> {
        return {
            user: await this.findById(id, [
                { property: 'MemberSacrement.sacrement', alias: 'sacrement' },
                { property: 'MemberSacrement.member', alias: 'member' },
            ]),
        };
    }

    async checkSacrementConfirmationOfMember(id: number) {
        const confirmation = await this.memberSacrementRepository
            .createQueryBuilder()
            .leftJoin('MemberSacrement.sacrement', 'sacrement')
            .where(
                "sacrement.name='konfirmasiona' or sacrement.name='confirmation'",
            )
            .andWhere('member_id =:id', { id })
            .getCount();
        let check = true;
        if (confirmation === 0) {
            check = false;
        }
        return check;
    }
}
