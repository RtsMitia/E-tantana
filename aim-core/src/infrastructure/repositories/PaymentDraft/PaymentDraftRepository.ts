import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMemberService } from 'src/core/applicationServices/Member/IMemberService';
import { IPaymentService } from 'src/core/applicationServices/Payment/IPaymentService';
import { IPaymentDetailService } from 'src/core/applicationServices/PaymentDetail/IPaymentDetailService';
import { IPaymentDraftDetailService } from 'src/core/applicationServices/PaymentDraftDetail/IPaymentDraftDetailService';
import { IPaymentDraftDetailActivityFieldService } from 'src/core/applicationServices/PaymentDraftDetailActivityField/IPaymentDraftDetailActivityFieldService';
import { ActivityField } from 'src/core/domains/ActivityField/ActivityField';
import { Payment } from 'src/core/domains/Payment/Payment';
import { PaymentDetail } from 'src/core/domains/PaymentDetail/PaymentDetail';
import { PaymentDraft } from 'src/core/domains/PaymentDraft/PaymentDraft';
import { PaymentDraftDetail } from 'src/core/domains/PaymentDraftDetail/PaymentDraftDetail';
import { PaymentDraftDetailActivityField } from 'src/core/domains/PaymentDraftDetailActivityField/PaymentDraftDetailActivityField';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';
import { MemberActivity } from 'src/core/domains/MemberActivity/MemberActivity';
import { IMemberActivityService } from 'src/core/applicationServices/MemberActivity/IMemberActivityService';
import { IActivityFieldService } from 'src/core/applicationServices/ActivityField/IActivityFieldService';

@Injectable()
export class PaymentDraftRepository extends GeneralDtoRepository {
    constructor(
        @InjectRepository(PaymentDraft)
        private paymentDraftRepository: Repository<PaymentDraft>,
        @Inject(SERVICE_MAPPING_TOKEN.PAYMENTDRAFTDETAIL_SERVICE)
        private paymentDraftDetailService: IPaymentDraftDetailService,
        @Inject(SERVICE_MAPPING_TOKEN.MEMBER_SERVICE)
        private memberService: IMemberService,
        @Inject(SERVICE_MAPPING_TOKEN.PAYMENTDRAFTDETAILACTIVITYFIELD_SERVICE)
        private paymentDraftDetailActivityFieldService: IPaymentDraftDetailActivityFieldService,
        @Inject(SERVICE_MAPPING_TOKEN.PAYMENT_SERVICE)
        private paymentService: IPaymentService,
        @Inject(SERVICE_MAPPING_TOKEN.PAYMENTDETAIL_SERVICE)
        private paymentDetailService: IPaymentDetailService,
        @Inject(SERVICE_MAPPING_TOKEN.MEMBERACTIVITY_SERVICE)
        private memberActivityService: IMemberActivityService,
        @Inject(SERVICE_MAPPING_TOKEN.ACTIVITYFIELD_SERVICE)
        private activityFieldService: IActivityFieldService,
    ) {
        super(paymentDraftRepository);
    }

    findAllPaymentDraftWithCriteria(criteria): Promise<unknown> {
        return this.findAllWithCriteria(
            criteria,
            [],
            [{ order: 'paymentDraft.date', option: 'DESC' }],
        );
    }

    async saveGroupPayment(
        PaymentDraftDetails: PaymentDraftDetail[],
        paymentDraftData: PaymentDraft,
        activityFields: ActivityField[][],
    ) {
        if (!paymentDraftData.date) {
            paymentDraftData.date = new Date(Date.now());
        }
        const paymentDraft = this.paymentDraftRepository.save(paymentDraftData);
        const response = paymentDraft.then((paymentDraft) => {
            PaymentDraftDetails.forEach((paymentDraftDetailData, index) => {
                paymentDraftDetailData.payment_draft_id = paymentDraft.id;
                //console.log("PaymentDraft id: ", paymentDraftDetailData.payment_draft_id);
                const name = {
                    last_name: paymentDraftDetailData.last_name,
                    first_name: paymentDraftDetailData.first_name,
                };
                //console.log("Last name ", paymentDraftDetailData.last_name);
                //console.log("First name ", paymentDraftDetailData.first_name);
                const member = this.memberService.fetchMemberWithCriteria(name);
                return member.then(async (member) => {
                    if (member) {
                        console.log("Member Found: ", member.id);
                        paymentDraftDetailData.member_id = member.id;
                        paymentDraftDetailData.activity_field_id =
                            activityFields[index][0]?.id || 1;

                        if (!activityFields[index][0]) {
                        console.warn(`⚠️ Missing activityField at index ${index}, defaulting to ID 1 for ${paymentDraftDetailData.last_name}`);
                        } else {
                        console.log(`✅ Found activityField ID: ${activityFields[index][0].id} for ${paymentDraftDetailData.last_name}`);
                        }

                        const isValidDate = (d) => d instanceof Date && !isNaN(d.getTime());

                        if (!isValidDate(paymentDraftDetailData.birthdate)) {
                            //console.warn("Invalid birthdate:", paymentDraftDetailData.birthdate);
                            paymentDraftDetailData.birthdate = null; // or set to null
                        }

                        if (!isValidDate(paymentDraftDetailData.promise_date)) {
                            //console.warn("Invalid promise_date:", paymentDraftDetailData.promise_date);
                            paymentDraftDetailData.promise_date = null; // or set to null
                        }
                        await this.paymentDraftDetailService
                            .save(paymentDraftDetailData)
                            .then(
                                async (
                                    paymentDraftDetail: PaymentDraftDetail,
                                ) => {
                                    paymentDraftDetailData = paymentDraftDetail;
                                    await Promise.all(
                                    activityFields[index].map(async (activityField) => {
                                        if (activityField) {
                                        console.log("Saving activity field id:", activityField.id);

                                        const link = new PaymentDraftDetailActivityField();
                                        link.payment_draft_detail_id = paymentDraftDetail.id;
                                        link.activity_field_id = activityField.id;

                                        await this.paymentDraftDetailActivityFieldService.save(link);
                                        console.log("Saved activity field link");
                                        }
                                    })
                                    );
                                },
                            );
                    } else {
                        console.log("No member of that name foundfffff");
                        const member1 = this.memberService.fetchMemberByName(
                            paymentDraftDetailData.first_name,
                        );
                        paymentDraftDetailData.activity_field_id =
                            activityFields[index][0]?.id || 1;
                        return member1
                        .then((member) => {
                            if (member) {
                            //console.log("Found member by first name:", member.first_name);
                            paymentDraftDetailData.member_id = member.id;
                            } else {
                           // console.warn("No member found at all.");
                            }
                            const isValidDate = (d) => d instanceof Date && !isNaN(d.getTime());

                            if (!isValidDate(paymentDraftDetailData.birthdate)) {
                                //console.warn("Invalid birthdate:", paymentDraftDetailData.birthdate);
                                paymentDraftDetailData.birthdate = null; // or set to null
                            }

                            if (!isValidDate(paymentDraftDetailData.promise_date)) {
                                //console.warn("Invalid promise_date:", paymentDraftDetailData.promise_date);
                                paymentDraftDetailData.promise_date = null; // or set to null
                            }
                            console.log("Saving PaymentDraftDetail:", paymentDraftDetailData);
                            return this.paymentDraftDetailService.save(paymentDraftDetailData);
                        })
                        .then(async (paymentDraftDetail: PaymentDraftDetail) => {
                            console.log("Saved PaymentDraftDetail with id:", paymentDraftDetail.id);

                            if (!activityFields[index]) {
                            console.warn("No activity fields for index:", index);
                            return;
                            }

                            await Promise.all(
                            activityFields[index].map(async (activityField) => {
                                if (activityField) {
                                console.log("Saving activity field id:", activityField.id);

                                const link = new PaymentDraftDetailActivityField();
                                link.payment_draft_detail_id = paymentDraftDetail.id;
                                link.activity_field_id = activityField.id;

                                await this.paymentDraftDetailActivityFieldService.save(link);
                                console.log("Saved activity field link");
                                }
                            })
                            );
                        })
                        .catch((err) => {
                            console.error("Error in processing member1:", err);
                        });
                    }
                });
            });
        });
        return await response;
    }

    async getPaymentsInvalide(criteria) {
        const limit = criteria.pageNumber || 20;
        const page = criteria.page || 1;
        const offset = (page - 1) * limit;
        let query = await this.paymentDraftRepository
            .createQueryBuilder()
            .leftJoinAndSelect('PaymentDraft.payment', 'payment')
            .leftJoinAndSelect('PaymentDraft.paymentType', 'paymentType')
            .leftJoinAndSelect(
                'PaymentDraft.paymentDraftDetails',
                'paymentDraftDetails',
            )
            .leftJoinAndSelect('paymentDraftDetails.member', 'member')
            .leftJoinAndSelect(
                'current_member_activity',
                'cma',
                'member.id = cma.member_id',
            )
            .where('payment.id is null');
        if (criteria.date_sup && !criteria.date_inf) {
            query = query.andWhere('PaymentDraft.date <=:date', {
                date: criteria.date_sup,
            });
        }
        if (criteria.date_inf && !criteria.date_sup) {
            query = query.andWhere('PaymentDraft.date >=:date', {
                date: criteria.date_inf,
            });
        }
        if (criteria.date_inf && criteria.date_sup) {
            query = query.andWhere(
                'PaymentDraft.date >=:date1 and PaymentDraft.date <=:date2',
                {
                    date1: criteria.date_inf,
                    date2: criteria.date_sup,
                },
            );
        }
        if (criteria.activityField) {
            const activityField = criteria.activityField;
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
        const count = await query.getCount();
        let totalPage = Math.floor(Number(count) / limit);
        if (Number(count) % limit != 0) {
            totalPage = totalPage + 1;
        }
        return {
            paymentInvalid: await query
                .orderBy('PaymentDraft.date', 'ASC')
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

    async checkValidatePayment(id: number) {
        let check = false;
        const payments = await this.paymentService.fetchAllWithCriteria({
            payment_draft_id: id,
        });
        payments.data.every((payment) => {
            if (payment && payment.id) {
                check = true;
                return false;
            }
            return true;
        });
        return check;
    }

    async validatePayment(
        paymentDraft: PaymentDraft,
        paymentDraftDetails: PaymentDraftDetail[],
        data: any,
    ) {
        const payment = new Payment();
        const check = await this.checkValidatePayment(
            paymentDraftDetails[0].payment_draft_id,
        );
        if (check === true) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'payment already validated',
                },
                HttpStatus.CONFLICT,
            );
        }
        payment.payment_draft_id = paymentDraftDetails[0].payment_draft_id;
        payment.date = new Date(Date.now());
        if (data && data.note) {
            payment.note = data.note;
        }
        paymentDraftDetails.forEach((paymentDraftDetail) => {
            if (!paymentDraftDetail.member_id) {
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: 'some payments have no corresponding member',
                    },
                    HttpStatus.CONFLICT,
                );
            }
        });
        const paymentData = this.paymentService.save(payment);
        paymentData.then((payment: Payment) => {
            paymentDraftDetails.forEach(async (paymentDraftDetail) => {
                // create payment detail
                const paymentDetail = new PaymentDetail();
                paymentDetail.member_id = paymentDraftDetail.member_id;
                paymentDetail.payment_draft_detail_id = paymentDraftDetail.id;
                paymentDetail.payment_id = payment.id;
                this.paymentDetailService.save(paymentDetail);
                // get member with old member activity
                const member = await this.memberService.fetchAllWithCriteria({
                    id: paymentDraftDetail.member_id,
                });
                // check member activity if doesn't exist then add
                if (
                    member.data.raw &&
                    member.data.raw.length > 0 &&
                    member.data.raw[0].activity_year_id === null &&
                    member.data.raw[0].member_role_id === null &&
                    member.data.raw[0].activity_year_id === null
                ) {
                    // member activity
                    const memberActivity = new MemberActivity();
                    memberActivity.member_id = paymentDraftDetail.member_id;
                    memberActivity.activity_year_id =
                        paymentDraftDetail.activity_year_id;
                    memberActivity.member_role_id =
                        paymentDraftDetail.member_role_id;
                    memberActivity.section_id = paymentDraftDetail.section_id;
                    memberActivity.activity_field_id =
                        paymentDraftDetail.activity_field_id;
                    this.memberActivityService.save(memberActivity);
                }
            });
        });
    }

    async getAllPaymentDraftDetails(id: number, criteria) {
        const limit = criteria.pageNumber || 20;
        const page = criteria.page || 1;
        const offset = (page - 1) * limit;
        // const count = this.paymentDraftDetailService.pa
        return {
            paymentDraft: await this.paymentDraftRepository
                .createQueryBuilder()
                .leftJoinAndSelect(
                    'PaymentDraft.paymentDraftDetails',
                    'paymentDraftDetail',
                )
                .leftJoinAndSelect(
                    'paymentDraftDetail.paymentDraftDetailActivityFields',
                    'paymentDraftDetailActivityFields',
                )
                .leftJoinAndSelect(
                    'paymentDraftDetailActivityFields.activityField',
                    'activityField',
                )
                .leftJoinAndSelect('activityField.hierarchy', 'hierarchy')
                .select('paymentDraftDetail')
                .where('paymentDraftDetail.id is not null')
                .andWhere('paymentDraft.id =:id', { id: id })
                .offset(offset)
                .limit(limit)
                .getMany(),
        };
    }

    async saveIndividualPaymentDraft(
        paymentDraftData: PaymentDraft,
        paymentDraftDetailData: PaymentDraftDetail,
        activityFields: [],
    ) {
        paymentDraftData.payer =
            paymentDraftDetailData.last_name +
            ' ' +
            paymentDraftDetailData.first_name;
        const name = {
            last_name: paymentDraftDetailData.last_name,
            first_name: paymentDraftDetailData.first_name,
        };
        if (!paymentDraftData.date) {
            paymentDraftData.date = new Date(Date.now());
        }
        const paymentDraft = this.paymentDraftRepository.save(paymentDraftData);
        await paymentDraft.then((paymentDraft) => {
            paymentDraftDetailData.payment_draft_id = paymentDraft.id;
            const member = this.memberService.fetchMemberWithCriteria(name);
            return member.then(async (member) => {
                if (member) {
                    paymentDraftDetailData.member_id = member.id;
                    const data = this.paymentDraftDetailService.save(
                        paymentDraftDetailData,
                    );
                    data.then(
                        async (paymentDraftDetail: PaymentDraftDetail) => {
                            paymentDraftDetailData = paymentDraftDetail;
                            activityFields.forEach(async (activityField) => {
                                const paymentDraftDetailActivityField =
                                    new PaymentDraftDetailActivityField();
                                paymentDraftDetailActivityField.payment_draft_detail_id =
                                    paymentDraftDetail.id;
                                paymentDraftDetailActivityField.activity_field_id =
                                    activityField;
                                await this.paymentDraftDetailActivityFieldService.save(
                                    paymentDraftDetailActivityField,
                                );
                            });
                            return await paymentDraftDetailData;
                        },
                    );
                } else {
                    const member1 = this.memberService.fetchMemberByName(
                        paymentDraftDetailData.first_name,
                    );
                    return member1
                        .then((member) => {
                            if (member) {
                                paymentDraftDetailData.member_id = member.id;
                            }
                            return this.paymentDraftDetailService.save(
                                paymentDraftDetailData,
                            );
                        })
                        .then(
                            async (paymentDraftDetail: PaymentDraftDetail) => {
                                paymentDraftDetailData = paymentDraftDetail;
                                activityFields.forEach(
                                    async (activityField) => {
                                        const paymentDraftDetailActivityField =
                                            new PaymentDraftDetailActivityField();
                                        paymentDraftDetailActivityField.payment_draft_detail_id =
                                            paymentDraftDetail.id;
                                        paymentDraftDetailActivityField.activity_field_id =
                                            activityField;
                                        await this.paymentDraftDetailActivityFieldService.save(
                                            paymentDraftDetailActivityField,
                                        );
                                    },
                                );
                                return await paymentDraftDetailData;
                            },
                        );
                }
            });
        });
    }
}
