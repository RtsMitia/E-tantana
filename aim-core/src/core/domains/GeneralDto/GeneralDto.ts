import { Column, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class GeneralDto {
    @PrimaryGeneratedColumn()
    id: number;

    @DeleteDateColumn()
    deleted_at?: Date;
}
