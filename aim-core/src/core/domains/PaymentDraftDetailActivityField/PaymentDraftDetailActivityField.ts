import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ActivityField } from '../ActivityField/ActivityField';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { PaymentDraftDetail } from '../PaymentDraftDetail/PaymentDraftDetail';

@Entity('payment_draft_detail_activity_field')
export class PaymentDraftDetailActivityField extends GeneralDto {
    @ManyToOne((type) => PaymentDraftDetail)
    @JoinColumn({ name: 'payment_draft_detail_id', referencedColumnName: 'id' })
    paymentDraftDetail: PaymentDraftDetail;

    @ManyToOne((type) => ActivityField)
    @JoinColumn({ name: 'activity_field_id', referencedColumnName: 'id' })
    activityField: ActivityField;

    @IsNotEmpty()
    @Column()
    payment_draft_detail_id: number;

    @IsNotEmpty()
    @Column()
    activity_field_id: number;
}
