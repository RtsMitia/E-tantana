import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SimpleData } from '../SimpleData/SimpleData';
import { TalentCategory } from '../TalentCategory/TalentCategory';

@Entity()
export class Talent extends SimpleData {
    @IsNotEmpty()
    @Column()
    talent_category_id: number;

    @ManyToOne((type) => TalentCategory)
    @JoinColumn({ name: 'talent_category_id' })
    talent_category: TalentCategory;

    @IsNotEmpty()
    @Column()
    image: string;
}
