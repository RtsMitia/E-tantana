import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { Hierarchy } from '../Hierarchy/Hierarchy';
import { PaymentDraftDetailActivityField } from '../PaymentDraftDetailActivityField/PaymentDraftDetailActivityField';

@Entity('activity_field')
export class ActivityField extends GeneralDto {
    @IsNotEmpty()
    @Column()
    number: string;

    @IsNotEmpty()
    @Column()
    name: string;

    @IsOptional()
    @Column({ nullable: true, default: null })
    superior_field?: number;

    @ManyToOne((type) => ActivityField)
    @JoinColumn({ name: 'superior_field' })
    superior: ActivityField;

    @IsNotEmpty()
    @Column()
    place: string;

    @IsNotEmpty()
    @Column()
    entity: string;

    @IsNotEmpty()
    @Column()
    hierarchy_id: number;

    @ManyToOne((type) => Hierarchy)
    @JoinColumn({ name: 'hierarchy_id' })
    hierarchy: Hierarchy;

    @OneToOne(
        () => PaymentDraftDetailActivityField,
        (paymentDraftDetailActivityField) =>
            paymentDraftDetailActivityField.activityField,
    )
    paymentDraftDetailActivityField: PaymentDraftDetailActivityField;
}
