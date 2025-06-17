import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { ProjectActivity } from '../ProjectActivity/ProjectActivity';

@Entity('project_tool')
export class ProjectTool extends GeneralDto {
    @IsNotEmpty()
    @Column()
    project_activity_id: number;

    @ManyToOne(() => ProjectActivity)
    @JoinColumn({ name: 'project_activity_id', referencedColumnName: 'id' })
    projectActivity: ProjectActivity;

    @IsNotEmpty()
    @Column()
    name: string;

    @IsNotEmpty()
    @Column()
    amount: number;
}
