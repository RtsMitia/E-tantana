import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { ProjectActivity } from '../ProjectActivity/ProjectActivity';
import { ProjectGoal } from '../ProjectGoal/ProjectGoal';
import { ProjectManager } from '../ProjectManager/ProjectManager';
import { ProjectPartner } from '../ProjectPartner/ProjectPartner';
import { ProjectResult } from '../ProjectResult/ProjectResult';
import { ProjectTarget } from '../ProjectTarget/ProjectTarget';

@Entity()
export class Project extends GeneralDto {
    @IsNotEmpty()
    @Column()
    title: string;

    @IsNotEmpty()
    @Column()
    summary: string;

    @IsNotEmpty()
    @Column()
    target_name: string;

    @IsNotEmpty()
    @Column()
    responsible_name: string;

    @IsNotEmpty()
    @Column()
    responsible_contact: string;

    @IsNotEmpty()
    @Column()
    responsible_mail: string;

    @IsNotEmpty()
    @Column()
    project_target_id: number;

    @ManyToOne(() => ProjectTarget)
    @JoinColumn({
        name: 'project_target_id',
        referencedColumnName: 'id',
    })
    project_target: ProjectTarget;

    @IsNotEmpty()
    @Column()
    context: string;

    @IsNotEmpty()
    @Column()
    problematics: string;

    @IsNotEmpty()
    @Column()
    group_profit: string;

    @IsNotEmpty()
    @Column()
    others_profit: string;

    @IsNotEmpty()
    @Column()
    direct_benefactor: number;

    @IsNotEmpty()
    @Column()
    indirect_benefactor: number;

    @IsNotEmpty()
    @Column()
    scout_benefactor: number;

    @IsNotEmpty()
    @Column()
    non_scout_benefactor: number;

    @IsNotEmpty()
    @Column()
    durability_plan: string;

    @IsNotEmpty()
    @Column()
    total_finances: number;

    @IsNotEmpty()
    @Type(() => Date)
    @Column('text')
    start_date: Date;

    @IsNotEmpty()
    @Type(() => Date)
    @Column('text')
    end_date: Date;

    @IsNotEmpty()
    @Column()
    responsible_number: number;

    @IsNotEmpty()
    @Column()
    participants_number: number;

    @IsNotEmpty()
    @Column()
    other_participants_number: number;

    @IsOptional()
    @Column()
    status: number;

    @OneToMany(
        () => ProjectActivity,
        (projectActivity) => projectActivity.project,
    )
    projectActivities: ProjectActivity[];

    @OneToMany(() => ProjectGoal, (projectGoal) => projectGoal.project)
    projectGoals: ProjectGoal[];

    @OneToMany(() => ProjectResult, (projectResult) => projectResult.project)
    projectResults: ProjectResult[];

    @OneToMany(() => ProjectManager, (projectManager) => projectManager.project)
    projectManagers: ProjectManager[];

    @OneToMany(() => ProjectPartner, (projectPartner) => projectPartner.project)
    projectPartners: ProjectPartner[];
}
