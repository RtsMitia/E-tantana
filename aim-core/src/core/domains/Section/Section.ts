import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';

@Entity()
export class Section extends GeneralDto {
    @IsNotEmpty()
    @Column()
    name: string;

    @IsNotEmpty()
    @Column()
    code: string;

    @IsNotEmpty()
    @Column()
    color: string;

    @IsNotEmpty()
    @Column()
    min_age: number;

    @IsNotEmpty()
    @Column()
    max_age: number;

    @IsNotEmpty()
    @Column()
    section_name: string;

    @IsNotEmpty()
    @Column()
    group_name: string;

    @IsNotEmpty()
    @Column()
    motto: string;

    @IsNotEmpty()
    @Column()
    activity_name: string;

    @IsNotEmpty()
    @Column()
    outfit_color: string;

    @IsNotEmpty()
    @Column()
    council: string;

    @IsNotEmpty()
    @Column()
    patron_saint: string;

    @IsNotEmpty()
    @Column()
    base: string;

    @IsNotEmpty()
    @Column()
    engagement: string;
}
