import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { Member } from '../Member/Member';
import { Payment } from '../Payment/Payment';
import { PaymentDraftDetail } from '../PaymentDraftDetail/PaymentDraftDetail';

@Entity('payment_detail')
export class PaymentDetail extends GeneralDto {
    @ManyToOne((type) => Payment)
    @JoinColumn({ name: 'payment_id', referencedColumnName: 'id' })
    payment: Payment;

    @ManyToOne((type) => Member)
    @JoinColumn({ name: 'member_id', referencedColumnName: 'id' })
    member: Member;

    @ManyToOne((type) => PaymentDraftDetail)
    @JoinColumn({ name: 'payment_draft_detail_id', referencedColumnName: 'id' })
    paymentDraftDetail: PaymentDraftDetail;

    @IsOptional()
    @Column()
    payment_id: number;

    @IsNotEmpty()
    @Column()
    member_id: number;

    @IsNotEmpty()
    @Column()
    payment_draft_detail_id: number;
}
