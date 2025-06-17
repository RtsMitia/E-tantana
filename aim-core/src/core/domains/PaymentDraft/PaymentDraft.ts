import { IsNotEmpty, IsOptional } from 'class-validator';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { Payment } from '../Payment/Payment';
import { PaymentDraftDetail } from '../PaymentDraftDetail/PaymentDraftDetail';
import { PaymentType } from '../PaymentType/PaymentType';

@Entity('payment_draft')
export class PaymentDraft extends GeneralDto {
    @ManyToOne((type) => PaymentType)
    @JoinColumn({ name: 'payment_type_id', referencedColumnName: 'id' })
    paymentType: PaymentType;

    @OneToMany(
        () => PaymentDraftDetail,
        (paymentDraftDetail) => paymentDraftDetail.paymentDraft,
    )
    paymentDraftDetails: PaymentDraftDetail[];

    @OneToOne(() => Payment, (payment) => payment.paymentDraft)
    payment: Payment;

    @IsNotEmpty()
    @Column()
    payment_type_id: number;

    @IsOptional()
    @Column()
    payer: string;

    @IsOptional()
    @Column()
    date: Date;

    @IsNotEmpty()
    @Column()
    amount: number;

    @IsOptional()
    @Column()
    note: string;
}
