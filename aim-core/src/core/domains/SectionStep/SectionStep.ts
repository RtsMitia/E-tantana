import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { Section } from '../Section/Section';

@Entity('section_steps')
export class SectionStep extends GeneralDto {
    @ManyToOne((type) => Section)
    @JoinColumn({ name: 'section_id', referencedColumnName: 'id' })
    section: Section;

    @IsNotEmpty()
    @Column()
    name: string;

    @IsNotEmpty()
    @Column()
    level: string;

    @IsNotEmpty()
    @Column()
    section_id: number;
}
