import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';

@Entity()
export class TalentCategory extends GeneralDto {
    @IsNotEmpty()
    @Column()
    name: string;

    @IsNotEmpty()
    @Column()
    color: string;
}
