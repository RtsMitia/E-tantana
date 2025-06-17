import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Entity, Column, OneToOne } from 'typeorm';
import { GeneralDto } from '../GeneralDto/GeneralDto';
import { AdultInfo } from '../AdultInfo/AdultInfo';
import { YouthInfo } from '../YouthInfo/YouthInfo';

@Entity()
export class Member extends GeneralDto {
    @IsNotEmpty()
    @Column()
    last_name: string;

    @IsNotEmpty()
    @Column()
    first_name: string;

    @IsOptional()
    @MinLength(10)
    @Column()
    contact: string;

    @IsOptional()
    @Type(() => Date)
    @Column('text')
    birthdate: Date;

    @IsOptional()
    @Column()
    birth_place: string;

    @IsOptional()
    @Column()
    address: string;

    @IsOptional()
    @Column()
    church: string;

    @IsOptional()
    @Type(() => Date)
    @Column('text')
    entry_date: Date;

    @IsOptional()
    @Column()
    promise_date: Date;

    @IsOptional()
    @Column()
    picture: string;

    @IsOptional()
    @Column()
    talent: string;

    @IsOptional()
    @Column()
    religion: string;

    @OneToOne(() => AdultInfo, (adultInfo) => adultInfo.member)
    adultInfo: AdultInfo;

    @OneToOne(() => YouthInfo, (youthInfo) => youthInfo.member)
    youthInfo: YouthInfo;

    set(
        id: number,
        last_name: string,
        first_name: string,
        contact: string,
        birthdate: Date,
        birth_place: string,
        address: string,
        church: string,
        entry_date: Date,
        promise_date: Date,
        picture: string,
        talent: string,
        religion: string,
    ): void {
        super.id = id;
        this.last_name = last_name;
        this.first_name = first_name;
        this.church = church;
        this.contact = contact;
        this.entry_date = entry_date;
        this.picture = picture;
        this.promise_date = promise_date;
        this.address = address;
        this.religion = religion;
        this.birth_place = birth_place;
        this.birthdate = birthdate;
        this.talent = talent;
    }
}
