import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMemberRepository } from 'src/core/domainServices/Member/IMemberRepository';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { Member } from 'src/core/domains/Member/Member';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { IMemberActivityService } from 'src/core/applicationServices/MemberActivity/IMemberActivityService';
import { IActivityFieldService } from 'src/core/applicationServices/ActivityField/IActivityFieldService';
import { ActivityField } from 'src/core/domains/ActivityField/ActivityField';

@Injectable()
export class MemberRepository
    extends GeneralDtoRepository
    implements IMemberRepository
{
    constructor(
        @InjectRepository(Member) private memberRepository: Repository<Member>,
        @Inject(SERVICE_MAPPING_TOKEN.MEMBERACTIVITY_SERVICE)
        private memberActivityService: IMemberActivityService,
        @Inject(SERVICE_MAPPING_TOKEN.ACTIVITYFIELD_SERVICE)
        private activityFieldService: IActivityFieldService,
    ) {
        super(memberRepository);
    }

    appendProperties(
        query: SelectQueryBuilder<Member>,
        properties: JoinProperties[],
    ) {
        properties.forEach((prop) => {
            query = query.leftJoinAndSelect(prop.property, prop.alias);
        });
        return query;
    }

    async findMemberWithCriteria(criteria: any): Promise<Member> {
        return await this.memberRepository
            .createQueryBuilder()
            .where(criteria)
            .getOne();
    }

    async findMemberByName(name: string): Promise<Member> {
        const member = await this.memberRepository
            .createQueryBuilder()
            .where('first_name =:name', { name })
            .getOne();
        if (!member) {
            return await this.memberRepository
                .createQueryBuilder()
                .where('first_name like :name', { name })
                .getOne();
        }
        return member;
    }

    async getMemberCard(id: number) {
        const currentMemberActivity =
            await this.memberActivityService.fetchLastMemberActivity(id);
        let fivondronana = null;
        let faritra = null;
        let diosezy = null;
        if (
            currentMemberActivity.activityField.hierarchy.name.toLowerCase() ===
            'fivondronana'
        ) {
            fivondronana = currentMemberActivity.activityField.name;
            const activity_field_faritra =
                await this.activityFieldService.fetchById(
                    currentMemberActivity.activityField.superior_field,
                    [],
                );
            faritra = activity_field_faritra.name;
            const activity_field_diosezy =
                await this.activityFieldService.fetchById(
                    activity_field_faritra.superior_field,
                    [],
                );
            diosezy = activity_field_diosezy.name;
        } else if (
            currentMemberActivity.activityField.hierarchy.name.toLowerCase() ===
            'faritra'
        ) {
            faritra = currentMemberActivity.activityField.name;
            const activity_field_diosezy =
                await this.activityFieldService.fetchById(
                    currentMemberActivity.activityField.superior_field,
                    [],
                );
            diosezy = activity_field_diosezy.name;
        } else if (
            currentMemberActivity.activityField.hierarchy.name.toLowerCase() ===
            'diosezy'
        ) {
            diosezy = currentMemberActivity.activityField.name;
        }
        return {
            member: await this.findById(id),
            president:
                await this.memberActivityService.fetchNationalPresident(),
            fivondronana: fivondronana,
            faritra: faritra,
            diosezy: diosezy,
        };
    }

    async findAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
    ): Promise<Record<string, any>> {
        if (criteria.pageNumber < 1 || criteria.page < 1)
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Page and page number values must be greater than 0.',
                },
                HttpStatus.BAD_REQUEST,
            );
        let isAdult = false;
        const limit = criteria.pageNumber || 20;
        const page = criteria.page || 1;
        const offset = (page - 1) * limit;
        const activityField = criteria.activityField;
        delete criteria.activityField;
        delete criteria.pageNumber;
        delete criteria.page;

        let query = this.memberRepository.createQueryBuilder();
        if (properties) query = this.appendProperties(query, properties);
        query = query
            .leftJoinAndSelect(
                'current_member_activity',
                'cma',
                'Member.id = cma.member_id',
            )
            .leftJoin('activity_field', 'af', 'cma.activity_field_id = af.id')
            .addSelect('af.name', 'activityField');
        query = query.offset(offset).limit(limit);
        if (criteria.isAdult) {
            delete criteria.isAdult;
            isAdult = true;
        }
        if (criteria.last_name || criteria.first_name) {
            const name = `%${criteria.last_name || criteria.first_name}%`;
            delete criteria.last_name;
            delete criteria.first_name;
            query = query
                .where("concat(last_name, ' ', first_name) like :name", {
                    name,
                })
                .andWhere(criteria);
        } else {
            query = query.where(criteria);
            if (activityField) {
                // get members from inferior activity only
                let afInferiors =
                    await this.activityFieldService.getAllInferiorActivityFields(
                        +activityField,
                    );
                afInferiors = afInferiors.map((af) => af.id);
                afInferiors = [activityField, ...afInferiors];
                let afWhere = afInferiors.map((af) => {
                    return `cma.activity_field_id = ${af}`;
                });
                afWhere = afWhere.join(' OR ');
                afWhere = `(${afWhere})`;
                query.andWhere(afWhere);
            }
        }
        if (isAdult) query.andWhere('id IN (SELECT member_id FROM adult_info)');
        const number = await query.getCount();
        const totalPage = Math.ceil(Number(number) / limit);
        return {
            data: await query.getRawAndEntities(),
            pagination: {
                page: +page,
                totalPages: totalPage,
                pageNumber: +limit,
            },
        };
    }
}
