import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';

export class SimpleData extends GeneralDto {
    @IsNotEmpty()
    @Column()
    name: string;

    @IsOptional()
    @Column()
    note: string;
}
