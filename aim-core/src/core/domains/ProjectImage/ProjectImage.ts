import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { Project } from '../Project/Project';

@Entity('project_image')
export class ProjectImage extends GeneralDto {
    @IsNotEmpty()
    @Column()
    name: string;

    @IsNotEmpty()
    @Column()
    project_id: number;

    @ManyToOne(() => Project)
    @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
    project: Project;
}
