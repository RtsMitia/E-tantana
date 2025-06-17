import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberGroupName } from 'src/core/domains/MemberGroupName/MemberGroupName';
import { IMemberGroupNameRepository } from 'src/core/domainServices/MemberGroupName/IMemberGroupNameRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class MemberGroupNameRepository
    extends GeneralDtoRepository
    implements IMemberGroupNameRepository
{
    constructor(
        @InjectRepository(MemberGroupName)
        memberGroupNameRepository: Repository<MemberGroupName>,
    ) {
        super(memberGroupNameRepository);
    }
    findAllMemberGroupNamesWithCriteria(criteria): Promise<unknown> {
        return this.findAllWithCriteria(criteria, [
            { property: 'MemberGroupName.groupSection', alias: 'groupSection' },
            {
                property: 'MemberGroupName.memberActivity',
                alias: 'memberActivity',
            },
        ]);
    }
    async findMemberGroupNameById(id: number): Promise<unknown> {
        return {
            user: await this.findById(id, [
                {
                    property: 'MemberGroupName.groupSection',
                    alias: 'groupSection',
                },
                {
                    property: 'MemberGroupName.memberActivity',
                    alias: 'memberActivity',
                },
            ]),
        };
    }
}
