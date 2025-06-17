import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberRole } from 'src/core/domains/MemberRole/MemberRole';
import { IMemberRoleRepository } from 'src/core/domainServices/MemberRole/IMemberRoleRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class MemberRoleRepository
    extends GeneralDtoRepository
    implements IMemberRoleRepository
{
    constructor(
        @InjectRepository(MemberRole)
        private memberRoleRepository: Repository<MemberRole>,
    ) {
        super(memberRoleRepository);
    }

    async findAllWithHierarchy(criteria: any): Promise<unknown> {
        return {
            data: await this.memberRoleRepository
                .createQueryBuilder()
                .leftJoinAndSelect('MemberRole.hierarchy', 'hierarchy')
                .where(criteria)
                .getMany(),
        };
    }
}
