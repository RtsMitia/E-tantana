import { IsOptional } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { SimpleData } from '../SimpleData/SimpleData';

@Entity()
export class Hierarchy extends SimpleData {
    @IsOptional()
    @Column()
    level: string;
}
