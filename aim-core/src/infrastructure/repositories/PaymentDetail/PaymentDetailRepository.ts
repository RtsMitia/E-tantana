import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IActivityFieldService } from 'src/core/applicationServices/ActivityField/IActivityFieldService';
import { IActivityYearService } from 'src/core/applicationServices/ActivityYear/IActivityYearService';
import { IMemberService } from 'src/core/applicationServices/Member/IMemberService';
import { PaymentDetail } from 'src/core/domains/PaymentDetail/PaymentDetail';
import { IPaymentDetailRepository } from 'src/core/domainServices/PaymentDetail/IPaymentDetailRepository';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class PaymentDetailRepository
    extends GeneralDtoRepository
    implements IPaymentDetailRepository
{
    constructor(
        @InjectRepository(PaymentDetail)
        private paymentDetailRepository: Repository<PaymentDetail>,
        @Inject(SERVICE_MAPPING_TOKEN.ACTIVITYFIELD_SERVICE)
        private activityFieldService: IActivityFieldService,
        @Inject(SERVICE_MAPPING_TOKEN.ACTIVITYYEAR_SERVICE)
        private activityYearService: IActivityYearService,
    ) {
        super(paymentDetailRepository);
    }

    async getMemberPayment(id: number, criteria) {
        const limit = criteria.pageNumber || 20;
        const page = criteria.page || 1;
        const offset = (page - 1) * limit;
        let query = await this.paymentDetailRepository
            .createQueryBuilder()
            .leftJoinAndSelect(
                'PaymentDetail.paymentDraftDetail',
                'paymentDraftDetail',
            )
            .leftJoinAndSelect(
                'paymentDraftDetail.activityYear',
                'activityYear',
            )
            .leftJoinAndSelect('paymentDraftDetail.feeType', 'feeType')
            .where('PaymentDetail.member_id =:id', { id });
        if (criteria.end_year) {
            const end_year = `%${criteria.end_year}%`;
            delete criteria.name;
            query = query.andWhere('end_year like :end_year', {
                end_year,
            });
        }
        const count = await query.getCount();
        let totalPage = Math.floor(Number(count) / limit);
        if (Number(count) % limit != 0) {
            totalPage = totalPage + 1;
        }
        return {
            paymentList: await query
                .orderBy('activityYear.end_year', 'DESC')
                .offset(offset)
                .limit(limit)
                .getMany(),
            pagination: {
                page: +page,
                totalPages: totalPage,
                pageNumber: +limit,
            },
        };
    }

    async statisticByCategory(criteria: any) {
        if (criteria.hierarchy) {
            return await this.activityFieldService.paymentStatisticByHierarchy(
                criteria,
            );
        } else {
            return await this.activityYearService.paymentStatisticByYear(
                criteria,
            );
        }
    }

    async globalStatistic(criteria: any) {
        return await this.activityYearService.statisticGlobal(criteria);
    }

    async findPaymentDetailsByPaymentId(id: number): Promise<unknown> {
        return {
            data: await this.findAllWithCriteria({ payment_id: id }, [
                {
                    property: 'PaymentDetail.payment',
                    alias: 'payment',
                },
                {
                    property: 'PaymentDetail.paymentDraftDetail',
                    alias: 'paymentDraftDetail',
                },
                {
                    property: 'paymentDraftDetail.section',
                    alias: 'section',
                },
                {
                    property: 'paymentDraftDetail.memberRole',
                    alias: 'memberRole',
                },
                {
                    property: 'paymentDraftDetail.hierarchy',
                    alias: 'hierarchy',
                },
                {
                    property: 'paymentDraftDetail.activityYear',
                    alias: 'activityYear',
                },
                {
                    property: 'paymentDraftDetail.feeType',
                    alias: 'feeType',
                },
                {
                    property: 'PaymentDetail.member',
                    alias: 'member',
                },
            ]),
        };
    }
}
