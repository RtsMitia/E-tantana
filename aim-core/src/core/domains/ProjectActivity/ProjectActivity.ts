import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { Project } from '../Project/Project';
import { ProjectTool } from '../ProjectTool/ProjectTool';

@Entity('project_activity')
export class ProjectActivity extends GeneralDto {
    @IsNotEmpty()
    @Column()
    project_id: number;

    @ManyToOne(() => Project)
    @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
    project: Project;

    @IsNotEmpty()
    @Column()
    name: string;

    @IsNotEmpty()
    @Column()
    detail: string;

    @OneToMany(() => ProjectTool, (projectTool) => projectTool.projectActivity)
    projectTools: ProjectTool[];
}
