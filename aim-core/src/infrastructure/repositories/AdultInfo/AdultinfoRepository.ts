import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdultInfo } from 'src/core/domains/AdultInfo/AdultInfo';
import { IAdultInfoRepository } from 'src/core/domainServices/AdultInfo/IAdultInfoRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class AdultInfoRepository
    extends GeneralDtoRepository
    implements IAdultInfoRepository
{
    constructor(
        @InjectRepository(AdultInfo)
        private adultInfoRepository: Repository<AdultInfo>,
    ) {
        super(adultInfoRepository);
    }

    async findAllAdultInfosWithCriteria(criteria): Promise<unknown> {
        if (criteria.pageNumber < 1 || criteria.page < 1)
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Page and page number values must be greater than 0.',
                },
                HttpStatus.BAD_REQUEST,
            );
        const limit = criteria.pageNumber || 20;
        const page = criteria.page || 1;
        const offset = (page - 1) * limit;
        delete criteria.pageNumber;
        delete criteria.page;
        let query = this.adultInfoRepository.createQueryBuilder();
        query = this.appendProperties(query, [
            {
                property: 'AdultInfo.member',
                alias: 'member',
            },
        ]);
        query = query
            .leftJoinAndSelect(
                'current_member_activity',
                'cma',
                'AdultInfo.member_id = cma.member_id',
            )
            .leftJoin('activity_field', 'af', 'cma.activity_field_id = af.id')
            .addSelect('af.name', 'activityField');
        if (criteria.name) {
            const name = `%${criteria.name}%`;
            delete criteria.name;
            query = query
                .where(
                    "concat(member.last_name, ' ', member.first_name) like :name",
                    {
                        name,
                    },
                )
                .andWhere(criteria);
        }
        const number = await query.getCount();
        let totalPage = Math.floor(Number(number) / limit);
        if (Number(number) % limit != 0) {
            totalPage = totalPage + 1;
        }
        return {
            data: await query.offset(offset).limit(limit).getRawAndEntities(),
            pagination: {
                page: +page,
                totalPages: totalPage,
                pageNumber: +limit,
            },
        };
    }

    async findAdultInfoById(id: number): Promise<unknown> {
        return {
            user: await this.findById(id, [
                { property: 'AdultInfo.member', alias: 'member' },
            ]),
        };
    }

    async saveAdultInfo(data: AdultInfo) {
        const adultInfo = await this.findAllWithCriteria({
            member_id: data.member_id,
        });
        if (adultInfo.data.length > 0) {
            throw new BadRequestException(
                'This member already has an adult info',
            );
        } else {
            return await this.save(data);
        }
    }
}
