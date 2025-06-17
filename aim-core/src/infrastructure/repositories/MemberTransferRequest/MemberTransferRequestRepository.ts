import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMemberActivityService } from 'src/core/applicationServices/MemberActivity/IMemberActivityService';
import { MemberActivity } from 'src/core/domains/MemberActivity/MemberActivity';
import { MemberTransferRequest } from 'src/core/domains/MemberTransferRequest/MemberTransferRequest';
import { IMemberTransferRequestRepository } from 'src/core/domainServices/MemberTransferRequest/IMemberTransferRequestRepository';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class MemberTransferRequestRepository
    extends GeneralDtoRepository
    implements IMemberTransferRequestRepository
{
    props = [
        { property: 'MemberTransferRequest.section', alias: 'section' },
        { property: 'MemberTransferRequest.member', alias: 'member' },
        {
            property: 'MemberTransferRequest.activityField',
            alias: 'activityField',
        },
        { property: 'MemberTransferRequest.memberRole', alias: 'memberRole' },
        {
            property: 'MemberTransferRequest.activityYear',
            alias: 'activityYear',
        },
    ];

    constructor(
        @InjectRepository(MemberTransferRequest)
        private memberTransferRequestRepository: Repository<MemberTransferRequest>,
        @Inject(SERVICE_MAPPING_TOKEN.MEMBERACTIVITY_SERVICE)
        private memberActivityService: IMemberActivityService,
    ) {
        super(memberTransferRequestRepository);
    }

    async memberTransferValidation(
        memberActivity: MemberActivity,
        memberTransferRequest: MemberTransferRequest,
        id: number,
    ) {
        memberTransferRequest.status = 1;
        await this.update(id, memberTransferRequest);
        return await this.memberActivityService.save(memberActivity);
    }

    async getAllMemberTransferRequest(criteria) {
        const limit = criteria.pageNumber || 16;
        const page = criteria.page || 1;
        const offset = (page - 1) * limit;
        const query = await this.memberTransferRequestRepository
            .createQueryBuilder()
            .leftJoinAndSelect(this.props[1].property, this.props[1].alias)
            .leftJoinAndSelect(this.props[2].property, this.props[2].alias)
            .leftJoinAndSelect(this.props[3].property, this.props[3].alias)
            .leftJoinAndSelect(this.props[4].property, this.props[4].alias)
            .leftJoinAndSelect(this.props[0].property, this.props[0].alias)
            .where('status = 0')
            .andWhere('memberRole.level> :level', {
                level: criteria.level,
            });
        const queryWithoutLimit = await query.getRawMany();
        const count = queryWithoutLimit.length;
        let totalPage = Math.floor(Number(count) / limit);
        if (Number(count) % limit != 0) {
            totalPage = totalPage + 1;
        }
        return {
            data: await query.offset(offset).limit(limit).getMany(),
            pagination: {
                page: +page,
                totalPages: totalPage,
                pageNumber: +limit,
            },
        };
    }
}
