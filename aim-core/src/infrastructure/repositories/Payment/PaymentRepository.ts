import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/core/domains/Payment/Payment';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';
import { PaymentDetail } from 'src/core/domains/PaymentDetail/PaymentDetail';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { IActivityFieldService } from 'src/core/applicationServices/ActivityField/IActivityFieldService';

@Injectable()
export class PaymentRepository extends GeneralDtoRepository {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        @Inject(SERVICE_MAPPING_TOKEN.ACTIVITYFIELD_SERVICE)
        private activityFieldService: IActivityFieldService,
    ) {
        super(paymentRepository);
    }

    async checkPayment(id): Promise<unknown> {
        const req = `select pd.member_id, pdd.last_name, pdd.first_name, pdd.id paymentDetailId, p.\`date\`, pdd.activity_year_id, ma.activity_field_id, af.name activityField, concat(ay.start_year, '-', ay.end_year) activity_year
        from payment_detail pd 
            join payment p on pd.payment_id = p.id 
            join payment_draft_detail pdd on pdd.payment_draft_id = p.payment_draft_id and pdd.member_id = pd.member_id 
            join member_activity ma on ma.member_id = pd.member_id and ma.activity_year_id = pdd.activity_year_id
            join activity_field af on ma.activity_field_id = af.id
            join activity_year ay on pdd.activity_year_id = ay.id
        where pdd.id = ?`;
        const list = await this.paymentRepository.query(req, [id]);
        return list;
    }

    async generatePaymentTickets(payments: any[]): Promise<unknown> {
        let req = `select pdd.last_name, pdd.first_name, ma.activity_field_id, pdd.number_card, af.name activityField, pdd.id paymentDetailId
        from payment_detail pd 
            join payment p on pd.payment_id = p.id 
            join payment_draft_detail pdd on pdd.payment_draft_id = p.payment_draft_id and pdd.member_id = pd.member_id 
            join member_activity ma on ma.member_id = pd.member_id and ma.activity_year_id = pdd.activity_year_id
            join activity_field af on ma.activity_field_id = af.id
        where`;
        payments.forEach((p, i) => {
            if (i === 0) req += ` pdd.id = ?`;
            else req += ` or pdd.id = ?`;
        });
        const list = await this.paymentRepository.query(req, payments);
        return list;
    }

    async findPublicPaymentsListByAfAndAy(
        activityField,
        activityYear,
    ): Promise<unknown> {
        const req = `select pd.member_id, pdd.last_name, pdd.first_name, pdd.id paymentDetailId, p.\`date\`, pdd.activity_year_id, ma.activity_field_id, af.name activityField
        from payment_detail pd 
            join payment p on pd.payment_id = p.id 
            join payment_draft_detail pdd on pdd.payment_draft_id = p.payment_draft_id and pdd.member_id = pd.member_id 
            join member_activity ma on ma.member_id = pd.member_id and ma.activity_year_id = pdd.activity_year_id
            join activity_field af on ma.activity_field_id = af.id
        where pdd.activity_year_id = ? and ma.activity_field_id = ?`;
        const list = await this.paymentRepository.query(req, [
            activityYear,
            activityField,
        ]);
        return list;
    }

    async findPublicPaymentsListByNameAndAy(
        name,
        activityYear,
    ): Promise<unknown> {
        const req = `select pd.member_id, pdd.last_name, pdd.first_name, pdd.id paymentDetailId, p.\`date\`, pdd.activity_year_id, ma.activity_field_id, af.name activityField
        from payment_detail pd 
            join payment p on pd.payment_id = p.id 
            join payment_draft_detail pdd on pdd.payment_draft_id = p.payment_draft_id and pdd.member_id = pd.member_id 
            join member_activity ma on ma.member_id = pd.member_id and ma.activity_year_id = pdd.activity_year_id
            join activity_field af on ma.activity_field_id = af.id
        where pdd.activity_year_id = ? and CONCAT(pdd.last_name, ' ',pdd.first_name) like ?`;
        const list = await this.paymentRepository.query(req, [
            activityYear,
            `%${name}%`,
        ]);
        return list;
    }

    async findAllPaymentWithCriteria(criteria): Promise<unknown> {
        const limit = criteria.pageNumber || 20;
        const page = criteria.page || 1;
        const offset = (page - 1) * limit;

        //console.log('📌 Criteria:', criteria);
        //console.log(`📌 Pagination - page: ${page}, limit: ${limit}, offset: ${offset}`);

        let query = await this.paymentRepository
            .createQueryBuilder('Payment')
            .leftJoinAndSelect('Payment.paymentDraft', 'paymentDraft')
            .leftJoinAndSelect('paymentDraft.paymentDraftDetails', 'paymentDraftDetails')
            .leftJoinAndSelect('paymentDraftDetails.member', 'member')
            .leftJoinAndSelect('current_member_activity', 'cma', 'member.id = cma.member_id')
            .leftJoinAndSelect('paymentDraft.paymentType', 'paymentType')
            .where('Payment.id is not null');

        if (criteria.date_sup && !criteria.date_inf) {
            //console.log(`📌 Filtering where PaymentDraft.date <= ${criteria.date_sup}`);
            query = query.andWhere('PaymentDraft.date <= :date', {
                date: criteria.date_sup,
            });
        }

        if (criteria.date_inf && !criteria.date_sup) {
            //console.log(`📌 Filtering where PaymentDraft.date >= ${criteria.date_inf}`);
            query = query.andWhere('PaymentDraft.date >= :date', {
                date: criteria.date_inf,
            });
        }

        if (criteria.date_inf && criteria.date_sup) {
            //console.log(`📌 Filtering between ${criteria.date_inf} and ${criteria.date_sup}`);
            query = query.andWhere(
                'PaymentDraft.date >= :date1 and PaymentDraft.date <= :date2',
                {
                    date1: criteria.date_inf,
                    date2: criteria.date_sup,
                },
            );
        }

        if (criteria.activityField) {
            const activityField = criteria.activityField;
            //console.log(`📌 Filtering by activityField and inferiors of: ${activityField}`);

            let afInferiors =
                await this.activityFieldService.getAllInferiorActivityFields(+activityField);
            afInferiors = afInferiors.map((af) => af.id);
            afInferiors = [activityField, ...afInferiors];

            //console.log('📌 Activity field IDs:', afInferiors);

            const afWhere = afInferiors.map((af, i) => `cma.activity_field_id = :af${i}`).join(' OR ');
            const afParams = {};
            afInferiors.forEach((af, i) => (afParams[`af${i}`] = af));

            query = query.andWhere(`(${afWhere})`, afParams);
        }

        const count = await query.getCount();
        //console.log('📌 Total count of matching payments:', count);

        let totalPage = Math.floor(Number(count) / limit);
        if (Number(count) % limit !== 0) {
            totalPage += 1;
        }

        const payments = await query
            .orderBy('Payment.date', 'DESC')
            .offset(offset)
            .limit(limit)
            .getMany();

        //console.log('📌 Payments fetched:', payments.length);

        return {
            payments,
            pagination: {
                page: +page,
                totalPages: totalPage,
                pageNumber: +limit,
            },
        };
    }

    getAllPaymentDetails(id: number) {
        return this.paymentRepository
            .createQueryBuilder()
            .leftJoinAndSelect('Payment.paymentDetails', 'paymentDetail')
            .where('id =:id', { id: id })
            .andWhere('paymentDraft.id is not null')
            .getMany();
    }
}
