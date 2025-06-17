import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberActivity } from 'src/core/domains/MemberActivity/MemberActivity';
import { IMemberActivityRepository } from 'src/core/domainServices/MemberActivity/IMemberActivityRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class MemberActivityRepository
    extends GeneralDtoRepository
    implements IMemberActivityRepository
{
    props = [
        { property: 'MemberActivity.section', alias: 'section' },
        { property: 'MemberActivity.member', alias: 'member' },
        {
            property: 'MemberActivity.activityField',
            alias: 'activityField',
        },
        { property: 'MemberActivity.memberRole', alias: 'memberRole' },
        { property: 'MemberActivity.activityYear', alias: 'activityYear' },
    ];

    constructor(
        @InjectRepository(MemberActivity)
        private memberActivityRepository: Repository<MemberActivity>,
    ) {
        super(memberActivityRepository);
    }

    async getNationalPresident() {
        return await this.memberActivityRepository
            .createQueryBuilder()
            .leftJoin('MemberActivity.activityYear', 'activityYear')
            .leftJoin('MemberActivity.activityField', 'activityField')
            .leftJoinAndSelect('MemberActivity.member', 'member')
            .leftJoin('activityField.hierarchy', 'hierarchy')
            .where("hierarchy.name = 'nationaly'")
            .orderBy('activityYear.end_year', 'DESC')
            .getOne();
    }

    async updateMemberActivity(id, memberActivity: MemberActivity) {
        await this.update(id, memberActivity);
        return await this.findById(id, this.props);
    }

    async createMemberActivity(memberActivity: MemberActivity) {
        const res = await this.memberActivityRepository.save(memberActivity);
        return this.findById(res.id, this.props);
    }

    findAllMemberActivitiesWithCriteria(criteria): Promise<unknown> {
        return this.findAllWithCriteria(criteria, this.props, [
            { order: 'activityYear.end_year', option: 'DESC' },
        ]);
    }

    async findMemberActivityById(id: number): Promise<unknown> {
        return {
            memberActivity: await this.findById(id, this.props),
        };
    }

    async getLastMemberActivity(member_id: number): Promise<MemberActivity> {
        return await this.memberActivityRepository
            .createQueryBuilder()
            .leftJoinAndSelect(this.props[1].property, this.props[1].alias)
            .leftJoinAndSelect(this.props[2].property, this.props[2].alias)
            .leftJoinAndSelect(this.props[3].property, this.props[3].alias)
            .leftJoinAndSelect(this.props[4].property, this.props[4].alias)
            .leftJoinAndSelect(this.props[0].property, this.props[0].alias)
            .leftJoinAndSelect('activityField.hierarchy', 'hierarchy')
            .where('member_id =:member_id', { member_id })
            .orderBy('activityYear.end_year', 'DESC')
            .getOne();
    }

    async getMemberActivityForMember(id: number) {
        return {
            member_activity: await this.memberActivityRepository
                .createQueryBuilder()
                .leftJoinAndSelect('MemberActivity.memberRole', 'memberRole')
                .leftJoinAndSelect(
                    'MemberActivity.activityField',
                    'activityField',
                )
                .leftJoinAndSelect('MemberActivity.section', 'section')
                .leftJoin('MemberActivity.activityYear', 'activityYear')
                .where('member_id =:id', { id })
                .orderBy('activityYear.end_year', 'DESC')
                .getOne(),
            fivondronana: await this.memberActivityRepository
                .createQueryBuilder()
                .leftJoin('MemberActivity.memberRole', 'memberRole')
                .leftJoin('MemberActivity.activityField', 'activityField')
                .leftJoin('activityField.hierarchy', 'hierarchy')
                .select(' activityField.name')
                .where('member_id =:id', { id })
                .andWhere(" memberRole.name !='beazina'")
                .andWhere(" hierarchy.name='fivondronana'")
                .getRawMany(),
        };
    }
}
