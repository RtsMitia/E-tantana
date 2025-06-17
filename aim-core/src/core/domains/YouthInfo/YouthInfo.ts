import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { GeneralDto } from 'src/core/domains/GeneralDto/GeneralDto';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Member } from '../Member/Member';

@Entity()
export class YouthInfo extends GeneralDto {
    @IsOptional()
    @Column()
    father_name: string;

    @IsOptional()
    @Column()
    father_contact: string;

    @IsOptional()
    @IsEmail()
    @Column()
    father_mail: string;

    @IsOptional()
    @Column()
    mother_name: string;

    @IsOptional()
    @Column()
    mother_contact: string;

    @IsOptional()
    @IsEmail()
    @Column()
    mother_mail: string;

    @IsNotEmpty()
    @Column()
    member_id: number;

    @OneToOne(() => Member)
    @JoinColumn({ name: 'member_id', referencedColumnName: 'id' })
    member: Member;

    @IsOptional()
    @Column()
    school_name?: string;

    @IsOptional()
    @Column()
    level?: string;

    @IsOptional()
    @Column()
    note?: string;

    @IsNumber()
    @Column()
    siblings: number;

    @IsNumber()
    @Column()
    siblings_rank: number;

    @IsOptional()
    @Column()
    hobby?: string;

    @IsOptional()
    @Column()
    language?: string;

    @IsOptional()
    @Column()
    health_condition?: string;

    @IsOptional()
    @Column()
    allergy?: string;
}
