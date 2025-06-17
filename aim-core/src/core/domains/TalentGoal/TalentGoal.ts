import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { Section } from '../Section/Section';
import { Talent } from '../Talent/Talent';

@Entity()
export class TalentGoal extends GeneralDto {
    @IsNotEmpty()
    @Column()
    talent_id: number;

    @ManyToOne((type) => Talent)
    @JoinColumn({ name: 'talent_id' })
    talent: Talent;

    @IsNotEmpty()
    @Column()
    section_id: number;

    @ManyToOne((type) => Section)
    @JoinColumn({ name: 'section_id' })
    section: Section;

    @IsNotEmpty()
    @Column()
    talent_goal: string;
}
