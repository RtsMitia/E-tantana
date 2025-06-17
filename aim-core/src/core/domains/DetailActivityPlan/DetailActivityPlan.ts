import { IsNotEmpty, IsOptional } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Type } from 'class-transformer';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { ActivityPlan } from '../ActivityPlan/ActivityPlan';

@Entity('detail_activity_plan')
export class DetailActivityPlan extends GeneralDto {
    @IsNotEmpty()
    @Column()
    activity_plan_id: number;

    @IsNotEmpty()
    @Column()
    participants: string;

    @IsNotEmpty()
    @Column()
    ressource_persons: string;

    @IsNotEmpty()
    @Column()
    ressource_tools: string;

    @IsNotEmpty()
    @Column()
    ressource_money: string;

    @IsNotEmpty()
    @Column()
    place: string;

    @IsNotEmpty()
    @Column()
    success_rate: string;

    @IsNotEmpty()
    @Column()
    blocking: string;

    @IsOptional()
    @Type(() => Date)
    @Column('text')
    date: Date;

    @IsNotEmpty()
    @Column()
    activity_name: string;

    @IsNotEmpty()
    @Column()
    other_goals: string;

    @ManyToOne((type) => ActivityPlan)
    @JoinColumn({ name: 'activity_plan_id', referencedColumnName: 'id' })
    activityPlan: ActivityPlan;
}
