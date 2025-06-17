import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { Member } from '../Member/Member';

@Entity()
export class ProjectUser extends GeneralDto {
    @IsString()
    @IsNotEmpty()
    @Column()
    phone_number: string;

    @IsEmail()
    @IsOptional()
    @Column()
    mail: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password too short' })
    @Column({ select: false })
    password: string;

    @IsOptional()
    @Column()
    member_id: number;

    @OneToOne(() => Member)
    @JoinColumn({ name: 'member_id', referencedColumnName: 'id' })
    member: Member;
}
