import { IsNotEmpty } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AdultInfo } from '../AdultInfo/AdultInfo';
import { DetailActivityPlan } from '../DetailActivityPlan/DetailActivityPlan';
import { GeneralDto } from '../GeneralDto/GeneralDto';

@Entity('detail_activity_plan_responsible')
export class DetailActivityPlanResponsible extends GeneralDto {
    @IsNotEmpty()
    @Column()
    detail_activity_plan_id: number;

    @IsNotEmpty()
    @Column()
    adult_info_id: number;

    @ManyToOne((type) => DetailActivityPlan)
    @JoinColumn({ name: 'detail_activity_plan_id', referencedColumnName: 'id' })
    detailActivityPlan: DetailActivityPlan;

    @ManyToOne((type) => AdultInfo)
    @JoinColumn({ name: 'adult_info_id', referencedColumnName: 'id' })
    adultInfo: AdultInfo;
}
