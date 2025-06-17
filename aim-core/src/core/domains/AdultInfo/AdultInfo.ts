import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { Member } from '../Member/Member';

@Entity('adult_info')
export class AdultInfo extends GeneralDto {
    @IsNotEmpty()
    @Column()
    member_id: number;

    @OneToOne(() => Member)
    @JoinColumn({ name: 'member_id', referencedColumnName: 'id' })
    member: Member;

    @IsNotEmpty()
    @Column()
    marital_status: string;

    @IsNumber()
    @Column()
    child_number: number;

    @IsOptional()
    @Column()
    profession?: string;

    @IsOptional()
    @Column()
    company_name?: string;

    @IsOptional()
    @Column()
    school_name?: string;

    @IsOptional()
    @Column()
    school_level?: string;

    @IsOptional()
    @Column()
    mail?: string;

    @IsOptional()
    @Column()
    facebook?: string;

    @IsOptional()
    @Column()
    church_activities?: string;

    @IsOptional()
    @Column()
    church_association?: string;
}
