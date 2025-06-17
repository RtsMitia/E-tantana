import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
// import { Member } from '../Member/Member';
import { ActivityField } from '../ActivityField/ActivityField';

@Entity()
export class User extends GeneralDto {
    @IsString()
    @IsNotEmpty()
    @Column()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password too short' })
    @Column({ select: false })
    password: string;

    // @IsNotEmpty()
    // @Column()
    // member_id: number;

    @IsEmail()
    @IsNotEmpty()
    @Column()
    email: string;

    @IsOptional()
    @Column()
    contact: string;

    @IsOptional()
    @Column({ default: false })
    is_active: boolean;

    @IsNumber()
    @Column({ default: 0 })
    errorCount: number;

    @IsOptional()
    @Column()
    generatedLink: string;

    @IsOptional()
    @Column()
    generatedCode: string;

    // @OneToOne(() => Member, (member) => member.adultInfo)
    // @JoinColumn({ name: 'member_id', referencedColumnName: 'id' })
    // member: Member;

    @IsNotEmpty()
    @Column()
    accountType: number;

    @IsNotEmpty()
    @Column()
    activity_field_id: number;

    @ManyToOne((type) => ActivityField)
    @JoinColumn({ name: 'activity_field_id' })
    activityField: ActivityField;
}
