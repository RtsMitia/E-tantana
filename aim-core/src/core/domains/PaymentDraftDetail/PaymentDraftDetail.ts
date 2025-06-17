import { IsNotEmpty, IsOptional } from 'class-validator';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { ActivityYear } from '../ActivityYear/ActivityYear';
import { FeeType } from '../FeeType/FeeType';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { Hierarchy } from '../Hierarchy/Hierarchy';
import { Member } from '../Member/Member';
import { MemberRole } from '../MemberRole/MemberRole';
import { PaymentDetail } from '../PaymentDetail/PaymentDetail';
import { PaymentDraft } from '../PaymentDraft/PaymentDraft';
import { PaymentDraftDetailActivityField } from '../PaymentDraftDetailActivityField/PaymentDraftDetailActivityField';
import { Section } from '../Section/Section';

@Entity('payment_draft_detail')
export class PaymentDraftDetail extends GeneralDto {
    @OneToMany(
        () => PaymentDraftDetailActivityField,
        (paymentDraftDetailActivityField) =>
            paymentDraftDetailActivityField.paymentDraftDetail,
    )
    paymentDraftDetailActivityFields: PaymentDraftDetailActivityField[];

    @ManyToOne((type) => PaymentDraft)
    @JoinColumn({ name: 'payment_draft_id', referencedColumnName: 'id' })
    paymentDraft: PaymentDraft;

    @ManyToOne((type) => FeeType)
    @JoinColumn({ name: 'fee_type_id', referencedColumnName: 'id' })
    feeType: FeeType;

    @ManyToOne((type) => ActivityYear)
    @JoinColumn({ name: 'activity_year_id', referencedColumnName: 'id' })
    activityYear: ActivityYear;

    @OneToOne(
        () => PaymentDetail,
        (paymentDetail) => paymentDetail.paymentDraftDetail,
    )
    paymentDetail: PaymentDetail;

    @ManyToOne((type) => Section)
    @JoinColumn({ name: 'section_id', referencedColumnName: 'id' })
    section: Section;

    @ManyToOne((type) => Hierarchy)
    @JoinColumn({ name: 'hierarchy_id', referencedColumnName: 'id' })
    hierarchy: Hierarchy;

    @ManyToOne((type) => Member)
    @JoinColumn({ name: 'member_id', referencedColumnName: 'id' })
    member: Member;

    @ManyToOne((type) => MemberRole)
    @JoinColumn({ name: 'member_role_id', referencedColumnName: 'id' })
    memberRole: MemberRole;

    @IsOptional()
    @Column()
    payment_draft_id: number;

    @IsNotEmpty()
    @Column()
    fee_type_id: number;

    @IsOptional()
    @Column()
    section_id: number;

    @IsOptional()
    @Column()
    member_id: number;

    @IsNotEmpty()
    @Column()
    amount: number;

    @IsNotEmpty()
    @Column()
    last_name: string;

    @IsNotEmpty()
    @Column()
    first_name: string;

    @IsOptional()
    @Column()
    phone_number: string;

    @IsOptional()
    @Column()
    email: string;

    @IsOptional()
    @Column()
    hierarchy_id: number;

    @IsNotEmpty()
    @Column()
    member_role_id: number;

    @IsNotEmpty()
    @Column()
    activity_year_id: number;

    @IsNotEmpty()
    @Column()
    activity_field_id: number;

    @IsOptional()
    @Column()
    promise_date: Date;

    @IsOptional()
    @Column()
    birthdate: Date;

    @IsOptional()
    @Column()
    training: string;

    @IsOptional()
    @Column()
    step: string;

    @IsOptional()
    @Column()
    sacrement: string;

    @IsOptional()
    @Column()
    number_card: string;

    @IsNotEmpty()
    @Column()
    address: string;

    @IsOptional()
    @Column()
    note: string;
}
