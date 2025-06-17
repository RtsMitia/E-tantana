import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, OneToOne } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { PaymentDraftDetail } from '../PaymentDraftDetail/PaymentDraftDetail';

@Entity('activity_year')
export class ActivityYear extends GeneralDto {
    @IsNotEmpty()
    @Column()
    start_year: number;

    @IsNotEmpty()
    @Column()
    end_year: number;

    @IsOptional()
    @Column()
    note: string;

    @OneToOne(
        () => PaymentDraftDetail,
        (paymentDraftDetail) => paymentDraftDetail.activityYear,
    )
    paymentDraftDetail: PaymentDraftDetail;
}
