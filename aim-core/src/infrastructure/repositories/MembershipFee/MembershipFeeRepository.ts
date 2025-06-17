import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipFee } from 'src/core/domains/MembershipFee/MembershipFee';
import { IMembershipFeeRepository } from 'src/core/domainServices/MembershipFee/IMembershipFeeRepository';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class MembershipFeeRepository
    extends GeneralDtoRepository
    implements IMembershipFeeRepository
{
    constructor(
        @InjectRepository(MembershipFee)
        private membershipFeeRepository: Repository<MembershipFee>,
    ) {
        super(membershipFeeRepository);
    }
    membershipFeeValidation(id: number): Promise<unknown> {
        return this.update(id, {
            status: '1',
        });
    }

    findAllMembershipFeesWithCriteria(criteria): Promise<unknown> {
        return this.findAllWithCriteria(
            criteria,
            [
                { property: 'MembershipFee.hierarchy', alias: 'hierarchy' },
                {
                    property: 'MembershipFee.memberRole',
                    alias: 'memberRole',
                },
                {
                    property: 'MembershipFee.feeType',
                    alias: 'feeType',
                },
                {
                    property: 'MembershipFee.activityYear',
                    alias: 'activityYear',
                },
                {
                    property: 'MembershipFee.section',
                    alias: 'section',
                },
            ],
            [{ order: 'activityYear.start_year', option: 'DESC' }],
        );
    }

    async appendHierarchyCondition(
        query: SelectQueryBuilder<MembershipFee>,
        id: number,
    ) {
        return query.andWhere('hierarchy_id = :hierarchy', { hierarchy: id });
    }

    async getMembershipFeeByMemberInfo(data: any): Promise<MembershipFee> {
        /*console.log('Member role id:', data.member_role_id);
        console.log('Fee type id:', data.fee_type_id);
        console.log('Activity Year:', data.fee_type_id);*/
        let query = await this.membershipFeeRepository
            .createQueryBuilder()
            .leftJoinAndSelect('MembershipFee.activityYear', 'activityYear')
            .where('activityYear.end_year <= :year', { year: data.year })
            .andWhere('member_role_id = :role', { role: data.member_role_id })
            .andWhere('fee_type_id = :fee', { fee: data.fee_type_id });
        if (data.hierarchy_id) {
            query = await this.appendHierarchyCondition(
                query,
                data.hierarchy_id,
            );
        }
        if (data.section_id) {
            query = await query.andWhere('section_id =:id', {
                id: data.section_id,
            });
        }
        return await query.orderBy('activityYear.end_year', 'DESC').getOne();
    }

    async getMembershipFeeByMemberInfoName(data: any): Promise<MembershipFee> {
        let query = await this.membershipFeeRepository
            .createQueryBuilder()
            .leftJoinAndSelect('MembershipFee.activityYear', 'activityYear')
            .leftJoinAndSelect('MembershipFee.hierarchy', 'hierarchy')
            .leftJoinAndSelect('MembershipFee.memberRole', 'memberRole')
            .leftJoinAndSelect('MembershipFee.section', 'section')
            .leftJoinAndSelect('MembershipFee.feeType', 'feeType')
            .where('activityYear.end_year <= :year', { year: data.year })
            .andWhere('memberRole.name = :role', { role: data.memberRole })
            .andWhere('feeType.name = :fee', { fee: 'cotisation' });
        if (data.hierarchy) {
            query = query.andWhere('hierarchy.name =:hierarchy', {
                hierarchy: data.hierachy,
            });
        }
        return await query.orderBy('activityYear.end_year', 'DESC').getOne();
    }

    async findMembershipFeeById(id: number): Promise<unknown> {
        return {
            data: await this.findById(id, [
                {
                    property: 'MembershipFee.hierarchy',
                    alias: 'hierarchy',
                },
                {
                    property: 'MembershipFee.memberRole',
                    alias: 'memberRole',
                },
                {
                    property: 'MembershipFee.feeType',
                    alias: 'feeType',
                },
                {
                    property: 'MembershipFee.activityYear',
                    alias: 'activityYear',
                },
            ]),
        };
    }
}
