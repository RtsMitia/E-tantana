import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IActivityFieldService } from 'src/core/applicationServices/ActivityField/IActivityFieldService';
import { IActivityYearService } from 'src/core/applicationServices/ActivityYear/IActivityYearService';
import { IExcelService } from 'src/core/applicationServices/Excel/IExcelService';
import { IFeeTypeService } from 'src/core/applicationServices/FeeType/IFeeTypeService';
import { IHierarchyService } from 'src/core/applicationServices/Hierarchy/IHierarchyService';
import { IMemberRoleService } from 'src/core/applicationServices/MemberRole/IMemberService';
import { IMembershipFeeService } from 'src/core/applicationServices/MembershipFee/IMembershipFeeService';
import { ISectionService } from 'src/core/applicationServices/Section/ISectionService';
import { ActivityField } from 'src/core/domains/ActivityField/ActivityField';
import { Hierarchy } from 'src/core/domains/Hierarchy/Hierarchy';
import { MemberRole } from 'src/core/domains/MemberRole/MemberRole';
import { PaymentDraftDetail } from 'src/core/domains/PaymentDraftDetail/PaymentDraftDetail';
import { Section } from 'src/core/domains/Section/Section';
import { IPaymentDraftDetailRepository } from 'src/core/domainServices/PaymentDraftDetail/IPaymentDraftDetailRepository';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';
import { ACM } from 'aws-sdk';

@Injectable()
export class PaymentDraftDetailRepository
    extends GeneralDtoRepository
    implements IPaymentDraftDetailRepository
{
    constructor(
        @InjectRepository(PaymentDraftDetail)
        private paymentDraftDetailRepository: Repository<PaymentDraftDetail>,
        @Inject(SERVICE_MAPPING_TOKEN.EXCEL_SERVICE)
        private excelService: IExcelService,
        @Inject(SERVICE_MAPPING_TOKEN.MEMBERROLE_SERVICE)
        private memberRoleService: IMemberRoleService,
        @Inject(SERVICE_MAPPING_TOKEN.HIERARCHY_SERVICE)
        private hierarchyService: IHierarchyService,
        @Inject(SERVICE_MAPPING_TOKEN.FEETYPE_SERVICE)
        private feeTypeService: IFeeTypeService,
        @Inject(SERVICE_MAPPING_TOKEN.MEMBERSHIPFEE_SERVICE)
        private membershipFeeService: IMembershipFeeService,
        @Inject(SERVICE_MAPPING_TOKEN.ACTIVITYYEAR_SERVICE)
        private activityYearService: IActivityYearService,
        @Inject(SERVICE_MAPPING_TOKEN.SECTION_SERVICE)
        private sectionService: ISectionService,
        @Inject(SERVICE_MAPPING_TOKEN.ACTIVITYFIELD_SERVICE)
        private activityFieldService: IActivityFieldService,
    ) {
        super(paymentDraftDetailRepository);
    }

    async getAllPaymentsDraftDetailsForOnePayment(id: number, criteria) {
        const limit = criteria.pageNumber || 20;
        const page = criteria.page || 1;
        const offset = (page - 1) * limit;
        const count = await this.paymentDraftDetailRepository
            .createQueryBuilder()
            .leftJoinAndSelect(
                'PaymentDraftDetail.paymentDraft',
                'paymentDraft',
            )
            .leftJoinAndSelect('PaymentDraftDetail.feeType', 'feeType')
            .leftJoinAndSelect('PaymentDraftDetail.hierarchy', 'hierarchy')
            .leftJoinAndSelect('PaymentDraftDetail.section', 'section')
            .leftJoinAndSelect('PaymentDraftDetail.memberRole', 'memberRole')
            .leftJoinAndSelect(
                'PaymentDraftDetail.activityYear',
                'activityYear',
            )
            .leftJoinAndSelect('PaymentDraftDetail.member', 'member')
            .where('PaymentDraftDetail.id is not null')
            .andWhere('paymentDraft.id =:id', { id: id })
            .getCount();
        let totalPage = Math.floor(Number(count) / limit);
        if (Number(count) % limit != 0) {
            totalPage = totalPage + 1;
        }
        return {
            paymentDraftDetails: await this.paymentDraftDetailRepository
                .createQueryBuilder()
                .leftJoinAndSelect(
                    'PaymentDraftDetail.paymentDraft',
                    'paymentDraft',
                )
                .leftJoinAndSelect('PaymentDraftDetail.feeType', 'feeType')
                .leftJoinAndSelect('PaymentDraftDetail.hierarchy', 'hierarchy')
                .leftJoinAndSelect('PaymentDraftDetail.section', 'section')
                .leftJoinAndSelect(
                    'PaymentDraftDetail.memberRole',
                    'memberRole',
                )
                .leftJoinAndSelect(
                    'PaymentDraftDetail.activityYear',
                    'activityYear',
                )
                .leftJoinAndSelect('PaymentDraftDetail.member', 'member')
                .where('PaymentDraftDetail.id is not null')
                .andWhere('paymentDraft.id =:id', { id: id })
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

    async assignmentMembersOfPayments(paymentDraftDetail: PaymentDraftDetail) {
        this.update(paymentDraftDetail.id, {
            member_id: paymentDraftDetail.member_id,
        });
    }

    async transmitDataToPaymentDraftDetails(file: Express.Multer.File, year) {
        const data = this.excelService.readingExcel(file);
        const activityYear = this.activityYearService.fetchActivityYear({
            end_year: year,
        });
        const payment_draft_details = [];
        const activity_fields_id = [];
        let total = 0;
        const fee_type = await this.feeTypeService.fetchIdWithCriteria({
            name: 'Cotisation',
        });
        return activityYear.then(async (activityYear) => {
            if (!activityYear) {
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: 'this activity year does not exist',
                    },
                    HttpStatus.CONFLICT,
                );
            } else {
                const elements = data.map(async (data) => {
                    //console.log('First row keys:', Object.keys(data));
                    //console.log('Full row:', data);
                    /*console.log(
                        `ANARANA: ${data['ANARANA']}, ANDRAIKITRA: ${data['ANDRAIKITRA']}, DIOSEZY: ${data['DIOSEZY']}, FARITRA: ${data['FARITRA']}, FIVONDRONANA: ${data['FIVONDRONANA']}`
                        );*/
                    const activityFields = [];
                    if (
                        data['ANARANA'] &&
                        data['ANARANA'] !== '' &&
                        data['ANARANA'].toLowerCase() !== 'anarana'
                    ) {
                        /*console.log(
                        `ANARANA: ${data['ANARANA']}, ANDRAIKITRA: ${data['ANDRAIKITRA']}, DIOSEZY: ${data['DIOSEZY']}, FARITRA: ${data['FARITRA']}, FIVONDRONANA: ${data['FIVONDRONANA']}`
                        );*/
                        const payment_draft_detail = new PaymentDraftDetail();
                        if (!data['ANDRAIKITRA']) {
                            throw new HttpException(
                                {
                                    status: HttpStatus.BAD_REQUEST,
                                    error:
                                        data['ANARANA'] +
                                        ' ' +
                                        data['FANAMPINY'] +
                                        ' does not have role',
                                },
                                HttpStatus.CONFLICT,
                            );
                        }
                        const role = data['ANDRAIKITRA'];
                        // .split(' ');
                        payment_draft_detail.last_name = data['ANARANA'];
                        payment_draft_detail.first_name = data['FANAMPINY'];
                        if (
                            payment_draft_detail.phone_number &&
                            payment_draft_detail.phone_number != ''
                        )
                            payment_draft_detail.phone_number = data['FINDAY'];
                        if (
                            payment_draft_detail.email &&
                            payment_draft_detail.email != ''
                        )
                            payment_draft_detail.email = data['MAILAKA'];
                        payment_draft_detail.birthdate =
                            data['DATY_NAHATERAHANA'];
                        payment_draft_detail.address = data['ADIRESY'];
                        payment_draft_detail.promise_date =
                            data['DATY_VELIRANO'];
                        payment_draft_detail.activity_year_id = activityYear.id;
                        const member_role =
                            this.memberRoleService.fetchIdWithCriteria({
                                name: role,
                            });
                        await member_role.then((member_role: MemberRole) => {
                            payment_draft_detail.memberRole = member_role;
                            payment_draft_detail.member_role_id =
                                member_role.id;
                        });
                        // if (role[1]) {
                        //     const hierarchy =
                        //         this.hierarchyService.fetchIdWithCriteria({
                        //             name: role[1],
                        //         });
                        //     await hierarchy.then((hierarchy: Hierarchy) => {
                        //         payment_draft_detail.hierarchy = hierarchy;
                        //         payment_draft_detail.hierarchy_id =
                        //             hierarchy.id;
                        //     });
                        // }
                        if (data['SAMPANA']) {
                            const section =
                                this.sectionService.fetchIdWithCriteria({
                                    name: data['SAMPANA'],
                                });
                            await section.then((section: Section) => {
                                payment_draft_detail.section = section;
                                payment_draft_detail.section_id = section.id;
                            });
                        }
                        if (data['VOLA']) {
                            payment_draft_detail.amount = Number(data['VOLA']);
                        } else {
                            //console.log("Fetching fee_type...");
                            const feeType = await fee_type;
                            //console.log("fee_type:", feeType);

                            //console.log("Preparing membership fee criteria:");
                            const criteria = {
                                fee_type_id: feeType?.id,
                                member_role_id: payment_draft_detail.member_role_id,
                                year: activityYear?.end_year,
                                hierarchy_id: payment_draft_detail.hierarchy_id,
                                section_id: payment_draft_detail.section_id,
                            };
                            //console.log("Criteria used to fetch membership fee:", criteria);

                            //console.log("Calling fetchMembershipFeeByMemberInfo...");
                            const membershipFee = await this.membershipFeeService.fetchMembershipFeeByMemberInfo(criteria);

                            if (!membershipFee) {
                                //console.error("No membershipFee returned for criteria:", criteria);
                            } else {
                                //console.log("Membership fee found:", membershipFee);
                                payment_draft_detail.amount = membershipFee.amount;
                            }
                        }
                        payment_draft_detail.fee_type_id = (await fee_type).id;
                        total = total + payment_draft_detail.amount;
                        if (data['SAKRAMENTA']) {
                            payment_draft_detail.sacrement = data['SAKRAMENTA'];
                        }
                        if (data['N°KARATRA']) {
                            payment_draft_detail.number_card =
                                data['N°KARATRA'];
                        }
                        if (data['DINGANA']) {
                            payment_draft_detail.step = data['DINGANA'];
                        }
                        if (data['FIOFANANA']) {
                            payment_draft_detail.training = data['FIOFANANA'];
                        }
                        const diosezy =
                            this.activityFieldService.fetchIdWithCriteria({
                                name: data['DIOSEZY'],
                            });
                        await diosezy.then((activityField: ActivityField) => {
                            activityFields.push(activityField);
                        });
                        const faritra =
                            this.activityFieldService.fetchIdWithCriteria({
                                name: data['FARITRA'],
                            });
                        await faritra.then((activityField: ActivityField) => {
                            activityFields.push(activityField);
                        });
                        const fivondronana =
                            this.activityFieldService.fetchIdWithCriteria({
                                name: data['FIVONDRONANA'],
                            });
                        await fivondronana.then(
                            (activityField: ActivityField) => {
                                activityFields.push(activityField);
                            },
                        );
                        activity_fields_id.push(activityFields);
                        //console.log('🧍 ANARANA:', data['ANARANA']);
                        //console.log('🏷️ Activity Fields:', activityFields);
                        payment_draft_details.push(payment_draft_detail);
                        // return payment_draft_details;
                    }
                });
                await Promise.all(elements);
                return {
                    payment_draft_details: payment_draft_details,
                    total: total,
                    activityFields: activity_fields_id,
                };
            }
        });
    }

    async transmitDataToPaymentDraftDetails1(file: Express.Multer.File, year) {
        const langage = 1;
        const dataTitle = [
            [
                'anarana',
                'fanampiny',
                'andraikitra',
                'sehatra',
                'teraka',
                'finday',
                'mailaka',
                'velirano',
            ],
            [
                'nom',
                'prenom',
                'role',
                'hierarchie',
                'date de naissance',
                'email',
                'telephone',
                'vœux',
            ],
        ];
        const payment_draft_details = [];
        let total = 0;
        const data = this.excelService.readingExcel(file);

        const activityYear = this.activityYearService.fetchActivityYear({
            end_year: year,
        });
        let i = 0;
        return activityYear.then(async (activityYear) => {
            const elements = data.map(async (data) => {
                const payment_draft_detail = new PaymentDraftDetail();
                payment_draft_detail.last_name = data[dataTitle[langage][0]];
                payment_draft_detail.first_name = data[dataTitle[langage][1]];
                payment_draft_detail.phone_number = data[dataTitle[langage][6]];
                payment_draft_detail.email = data[dataTitle[langage][5]];
                payment_draft_detail.birthdate = data[dataTitle[langage][4]];
                payment_draft_detail.promise_date = data[dataTitle[langage][7]];
                payment_draft_detail.activity_year_id = activityYear.id;
                const info = {
                    hierarchy: data[dataTitle[langage][3]],
                    memberRole: data[dataTitle[langage][2]],
                    year: year,
                    fee_type_id: null,
                };
                i++;
                const membershipFee =
                    await this.membershipFeeService.fetchMembershipFeeByMemberInfoName(
                        info,
                    );
                total = total + membershipFee.amount;
                if (membershipFee.hierarchy) {
                    payment_draft_detail.hierarchy_id =
                        membershipFee.hierarchy.id;
                    payment_draft_detail.hierarchy = membershipFee.hierarchy;
                }
                payment_draft_detail.amount = membershipFee.amount;
                payment_draft_detail.memberRole = membershipFee.memberRole;
                payment_draft_detail.member_role_id =
                    membershipFee.memberRole.id;
                payment_draft_details.push(payment_draft_detail);
                return payment_draft_details;
            });
            return {
                payment_draft_details: await Promise.all(elements),
                total: total,
            };
        });
    }
}
