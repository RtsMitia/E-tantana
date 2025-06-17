import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityYear } from 'src/core/domains/ActivityYear/ActivityYear';
import { IActivityYearRepository } from 'src/core/domainServices/ActivityYear/IActivityYearRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class ActivityYearRepository
    extends GeneralDtoRepository
    implements IActivityYearRepository
{
    constructor(
        @InjectRepository(ActivityYear)
        private activityYearRepository: Repository<ActivityYear>,
    ) {
        super(activityYearRepository);
    }

    async findActivityYear(data: any): Promise<ActivityYear> {
        return await this.activityYearRepository
            .createQueryBuilder()
            .where('end_year =:year', { year: data.end_year })
            .getOne();
    }

    async statisticGlobal(criteria: any) {
        const limit = criteria.pageNumber || 16;
        const page = criteria.page || 1;
        const offset = (page - 1) * limit;
        let query = await this.activityYearRepository
            .createQueryBuilder()
            .leftJoin('ActivityYear.paymentDraftDetail', 'paymentDraftDetail')
            .leftJoin('paymentDraftDetail.paymentDetail', 'paymentDetail')
            .leftJoin('paymentDraftDetail.paymentDraft', 'paymentDraft')
            .select('ActivityYear.end_year as year');
        if (criteria.statisticType === 'Montant total') {
            query = query.addSelect(
                '(case when sum(paymentDraftDetail.amount) is null then 0 else sum(paymentDraftDetail.amount) end ) as nb',
            );
        }
        if (criteria.statisticType !== 'Montant total') {
            query = query.addSelect('count(paymentDetail.id) as nb');
        }
        query = query.where(
            '(paymentDraftDetail.id is null) or (paymentDraftDetail.id is not null and paymentDetail.id is not null)',
        );
        if (criteria.date_sup && !criteria.date_inf) {
            query = query.andWhere('paymentDraft.date <=:date', {
                date: criteria.date_sup,
            });
        }
        if (criteria.date_inf && !criteria.date_sup) {
            query = query.andWhere('paymentDraft.date >=:date', {
                date: criteria.date_inf,
            });
        }
        if (criteria.date_inf && criteria.date_sup) {
            query = query.andWhere(
                'paymentDraft.date >=:date1 and paymentDraft.date <=:date2 and paymentDraft.date is not null',
                {
                    date1: criteria.date_inf,
                    date2: criteria.date_sup,
                },
            );
        }
        query = query.groupBy('ActivityYear.id');
        if (criteria.date_sup || criteria.date_inf) {
            query = query.having("nb!='0'");
        }
        const queryWithoutLimit = await query.getRawMany();
        const count = queryWithoutLimit.length;
        let totalPage = Math.floor(Number(count) / limit);
        if (Number(count) % limit != 0) {
            totalPage = totalPage + 1;
        }
        return {
            statistic: await query.offset(offset).limit(limit).getRawMany(),
            pagination: {
                page: +page,
                totalPages: totalPage,
                pageNumber: +limit,
            },
        };
    }

    async paymentStatisticByYear(criteria: any) {
        const limit = criteria.pageNumber || 16;
        const page = criteria.page || 1;
        const offset = (page - 1) * limit;
        let query = await this.activityYearRepository
            .createQueryBuilder()
            .leftJoin('ActivityYear.paymentDraftDetail', 'paymentDraftDetail')
            .leftJoin('paymentDraftDetail.paymentDetail', 'paymentDetail')
            .select('ActivityYear.end_year as title')
            .addSelect('count(paymentDetail.id) as payé')
            .addSelect(
                '(select count(member_activity.id) as nb from member_activity join activity_year on activity_year.id=member_activity.activity_year_id where activity_year.end_year <= ActivityYear.end_year group by activity_year.id order by activity_year.end_year desc limit 1) as total',
            )
            .addSelect(
                '((select count(member_activity.id) as nb from member_activity join activity_year on activity_year.id=member_activity.activity_year_id  where activity_year.end_year <= ActivityYear.end_year group by activity_year.id order by activity_year.end_year desc limit 1) - count(paymentDetail.id)) as reste',
            );

        if (criteria.year) {
            query = query.where('ActivityYear.end_year =:year', {
                year: criteria.year,
            });
        } else {
            query = query.groupBy('ActivityYear.id');
        }
        const queryWithoutLimit = await query.getRawMany();
        const count = queryWithoutLimit.length;
        let totalPage = Math.floor(Number(count) / limit);
        if (Number(count) % limit != 0) {
            totalPage = totalPage + 1;
        }
        return {
            statistic: await query.offset(offset).limit(limit).getRawMany(),
            pagination: {
                page: +page,
                totalPages: totalPage,
                pageNumber: +limit,
            },
        };
    }
}
