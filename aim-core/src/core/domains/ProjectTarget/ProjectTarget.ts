import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';

@Entity('project_target')
export class ProjectTarget extends GeneralDto {
    @IsNotEmpty()
    @Column()
    name: string;

    @IsNotEmpty()
    @Column()
    other: boolean;
}
