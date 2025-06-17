import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { PaymentDetail } from '../PaymentDetail/PaymentDetail';
import { PaymentDraft } from '../PaymentDraft/PaymentDraft';

@Entity()
export class Payment extends GeneralDto {
    @ManyToOne((type) => PaymentDraft)
    @JoinColumn({ name: 'payment_draft_id', referencedColumnName: 'id' })
    paymentDraft: PaymentDraft;

    @OneToMany(() => PaymentDetail, (paymentDetail) => paymentDetail.payment)
    paymentDetails: PaymentDetail[];

    @IsNotEmpty()
    @Column()
    payment_draft_id: number;

    @IsNotEmpty()
    @Column()
    date: Date;

    @IsOptional()
    @Column()
    note: string;
}
