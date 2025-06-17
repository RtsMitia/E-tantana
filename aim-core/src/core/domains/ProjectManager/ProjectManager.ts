import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { Project } from '../Project/Project';

@Entity('project_manager')
export class ProjectManager extends GeneralDto {
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
    role: string;

    @IsNotEmpty()
    @Column()
    activity: string;

    @IsNotEmpty()
    @Column()
    member_id: number;
}
