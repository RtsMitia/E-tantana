import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityField } from 'src/core/domains/ActivityField/ActivityField';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { IActivityFieldRepository } from 'src/core/domainServices/ActivityField/IActivityFieldRepository';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class ActivityFieldRepository
    extends GeneralDtoRepository
    implements IActivityFieldRepository
{
    constructor(
        @InjectRepository(ActivityField)
        private activityFieldRepository: Repository<ActivityField>,
    ) {
        super(activityFieldRepository);
    }

    async getSuperiors(id: number) {
        const res = [];
        let sup = await this.activityFieldRepository.findOneById(id);
        while (sup.superior_field) {
            res.push(sup.name);
            sup = await this.activityFieldRepository.findOneById(
                sup.superior_field,
            );
        }
        res.reverse();
        return res;
    }

    async getAllInferiorActivityFields(id) {
        const res = [];
        let tmp = await this.getInferiorActivityFields(id);
        while (tmp.length > 0) {
            const current = tmp.pop();
            res.push(current);
            const next = await this.getInferiorActivityFields(current.id);
            tmp = [...next, ...tmp];
        }
        return res;
    }

    getInferiorActivityFields(id) {
        const query = this.activityFieldRepository
            .createQueryBuilder()
            .where('superior_field = :id', { id });
        return query.getMany();
    }

    getActivityFieldsFromSuperiorFieldIdAndHierarchy(data: any) {
        let query = this.activityFieldRepository
            .createQueryBuilder()
            .leftJoinAndSelect('ActivityField.hierarchy', 'hierarchy')
            .where('hierarchy.name =:hierarchy', {
                hierarchy: data.hierarchy,
            });
        if (data.superiorField) {
            query = query.andWhere('superior_field =:superior', {
                superior: data.superiorField,
            });
        }
        return query.getMany();
    }

    appendProperties(
        query: SelectQueryBuilder<ActivityField>,
        properties: JoinProperties[],
    ) {
        properties.forEach((prop) => {
            query = query.leftJoinAndSelect(prop.property, prop.alias);
        });
        return query;
    }

    async findById(
        id: number,
        properties: JoinProperties[],
    ): Promise<ActivityField> {
        let query = this.activityFieldRepository.createQueryBuilder();
        query = this.appendProperties(query, properties);
        return query
            .where(`${this.getTableName('.')}id = :id`, { id })
            .withDeleted()
            .getOne();
    }

    async paymentStatisticByHierarchy(criteria: any) {
        const limit = criteria.pageNumber || 16;
        const page = criteria.page || 1;
        const offset = (page - 1) * limit;
        let year = criteria.year;
        if (!criteria.year) {
            year = new Date().getFullYear();
        }
        let query = await this.activityFieldRepository
            .createQueryBuilder()
            .leftJoin(
                'ActivityField.paymentDraftDetailActivityField',
                'paymentDraftDetailActivityField',
            )
            .leftJoin(
                'paymentDraftDetailActivityField.paymentDraftDetail',
                'paymentDraftDetail',
            )
            .leftJoin('paymentDraftDetail.activityYear', 'activityYear')
            .leftJoin('paymentDraftDetail.paymentDetail', 'paymentDetail')
            .select('count(paymentDetail.id) as payé')
            .addSelect('ActivityField.name as title');
        if (criteria.hierarchy.toLowerCase() === 'faritra') {
            query = query
                .addSelect(
                    "((case when (select count(member_activity.id) from member_activity  join activity_year year on year.id = member_activity.activity_year_id join activity_field  on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id where hierarchy.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <=" +
                        year +
                        " and activity_field_id=ActivityField.id group by year.id order by year.end_year desc limit 1) is null then 0 else (select count(member_activity.id) from member_activity  join activity_year year on year.id = member_activity.activity_year_id join activity_field  on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id where hierarchy.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <=" +
                        year +
                        " and activity_field_id=ActivityField.id group by year.id order by year.end_year desc limit 1) end ) + ( case when (select count(member_activity.id) from member_activity join activity_year year on year.id = member_activity.activity_year_id join activity_field   on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id join activity_field as superior on superior.id = activity_field.superior_field join hierarchy as hierarchy_superior  on hierarchy_superior.id = superior.hierarchy_id where hierarchy_superior.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <= " +
                        year +
                        " and superior.id = ActivityField.id group by year.end_year order by year.end_year desc limit 1) is null then 0 else (select count(member_activity.id) from member_activity join activity_year year on year.id = member_activity.activity_year_id join activity_field   on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id join activity_field as superior on superior.id = activity_field.superior_field join hierarchy as hierarchy_superior  on hierarchy_superior.id = superior.hierarchy_id  where hierarchy_superior.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <= " +
                        year +
                        ' and superior.id = ActivityField.id group by year.id order by year.end_year desc limit 1) end) ) as total',
                )
                .addSelect(
                    "(((case when (select count(member_activity.id) from member_activity  join activity_year year on year.id = member_activity.activity_year_id join activity_field  on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id where hierarchy.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <=" +
                        year +
                        " and activity_field_id=ActivityField.id group by year.id order by year.end_year desc limit 1) is null then 0 else (select count(member_activity.id) from member_activity  join activity_year year on year.id = member_activity.activity_year_id join activity_field  on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id where hierarchy.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <=" +
                        year +
                        " and activity_field_id=ActivityField.id group by year.id order by year.end_year desc limit 1) end ) + ( case when (select count(member_activity.id) from member_activity join activity_year year on year.id = member_activity.activity_year_id join activity_field   on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id join activity_field as superior on superior.id = activity_field.superior_field join hierarchy as hierarchy_superior  on hierarchy_superior.id = superior.hierarchy_id where hierarchy_superior.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <= " +
                        year +
                        " and superior.id = ActivityField.id group by year.end_year order by year.end_year desc limit 1) is null then 0 else (select count(member_activity.id) from member_activity join activity_year year on year.id = member_activity.activity_year_id join activity_field   on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id join activity_field as superior on superior.id = activity_field.superior_field join hierarchy as hierarchy_superior  on hierarchy_superior.id = superior.hierarchy_id  where hierarchy_superior.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <= " +
                        year +
                        ' and superior.id = ActivityField.id group by year.id order by year.end_year desc limit 1) end) ) - count(paymentDetail.id)) as reste',
                )
                .where(
                    '(paymentDraftDetail.hierarchy_id is null or paymentDraftDetail.hierarchy_id =' +
                        criteria.hierarchy_id +
                        ' )',
                );
        } else if (criteria.hierarchy.toLowerCase() === 'diosezy') {
            query = query
                .addSelect(
                    "((case when (select count(member_activity.id) from member_activity  join activity_year year on year.id = member_activity.activity_year_id join activity_field  on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id where hierarchy.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <=" +
                        year +
                        " and activity_field_id=ActivityField.id group by year.id order by year.end_year desc limit 1) is null then 0 else (select count(member_activity.id) from member_activity  join activity_year year on year.id = member_activity.activity_year_id join activity_field  on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id where hierarchy.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <=" +
                        year +
                        " and activity_field_id=ActivityField.id group by year.id order by year.end_year desc limit 1) end ) + ( case when (select count(member_activity.id) from member_activity join activity_year year on year.id = member_activity.activity_year_id join activity_field   on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id join activity_field as superior on superior.id = activity_field.superior_field join hierarchy as hierarchy_superior  on hierarchy_superior.id = superior.hierarchy_id where hierarchy_superior.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <= " +
                        year +
                        " and superior.id = ActivityField.id group by year.end_year order by year.end_year desc limit 1) is null then 0 else (select count(member_activity.id) from member_activity join activity_year year on year.id = member_activity.activity_year_id join activity_field   on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id join activity_field as superior on superior.id = activity_field.superior_field join hierarchy as hierarchy_superior  on hierarchy_superior.id = superior.hierarchy_id  where hierarchy_superior.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <= " +
                        year +
                        " and superior.id = ActivityField.id group by year.id order by year.end_year desc limit 1) end) + (case when (select count(member_activity.id) from member_activity join activity_year year on year.id = member_activity.activity_year_id join activity_field   on activity_field.id = member_activity.activity_field_id join activity_field as faritra on faritra.id = activity_field.superior_field join activity_field as diosezy on diosezy.id = faritra.superior_field join  hierarchy as hierarchy_superior  on hierarchy_superior.id = diosezy.hierarchy_id where hierarchy_superior.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <= " +
                        year +
                        " and diosezy.id = ActivityField.id group by year.end_year order by year.end_year desc limit 1) is null then 0 else (select count(member_activity.id) from member_activity join activity_year year on year.id = member_activity.activity_year_id join activity_field   on activity_field.id = member_activity.activity_field_id join activity_field as superior on superior.id = activity_field.superior_field join activity_field as diosezy join  hierarchy as hierarchy_superior  on hierarchy_superior.id = diosezy.hierarchy_id where hierarchy_superior.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <= " +
                        year +
                        ' and diosezy.id = ActivityField.id group by year.end_year order by year.end_year desc limit 1) end) ) as total',
                )
                .addSelect(
                    "(((case when (select count(member_activity.id) from member_activity  join activity_year year on year.id = member_activity.activity_year_id join activity_field  on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id where hierarchy.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <=" +
                        year +
                        " and activity_field_id=ActivityField.id group by year.id order by year.end_year desc limit 1) is null then 0 else (select count(member_activity.id) from member_activity  join activity_year year on year.id = member_activity.activity_year_id join activity_field  on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id where hierarchy.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <=" +
                        year +
                        " and activity_field_id=ActivityField.id group by year.id order by year.end_year desc limit 1) end ) + ( case when (select count(member_activity.id) from member_activity join activity_year year on year.id = member_activity.activity_year_id join activity_field   on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id join activity_field as superior on superior.id = activity_field.superior_field join hierarchy as hierarchy_superior  on hierarchy_superior.id = superior.hierarchy_id where hierarchy_superior.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <= " +
                        year +
                        " and superior.id = ActivityField.id group by year.end_year order by year.end_year desc limit 1) is null then 0 else (select count(member_activity.id) from member_activity join activity_year year on year.id = member_activity.activity_year_id join activity_field   on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id join activity_field as superior on superior.id = activity_field.superior_field join hierarchy as hierarchy_superior  on hierarchy_superior.id = superior.hierarchy_id  where hierarchy_superior.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <= " +
                        year +
                        " and superior.id = ActivityField.id group by year.id order by year.end_year desc limit 1) end) + (case when (select count(member_activity.id) from member_activity join activity_year year on year.id = member_activity.activity_year_id join activity_field   on activity_field.id = member_activity.activity_field_id join activity_field as faritra on faritra.id = activity_field.superior_field join activity_field as diosezy on diosezy.id = faritra.superior_field join  hierarchy as hierarchy_superior  on hierarchy_superior.id = diosezy.hierarchy_id where hierarchy_superior.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <= " +
                        year +
                        " and diosezy.id = ActivityField.id group by year.end_year order by year.end_year desc limit 1) is null then 0 else ( select count(member_activity.id) from member_activity join activity_year year on year.id = member_activity.activity_year_id join activity_field   on activity_field.id = member_activity.activity_field_id join activity_field as superior on superior.id = activity_field.superior_field join activity_field as diosezy join  hierarchy as hierarchy_superior  on hierarchy_superior.id = diosezy.hierarchy_id where hierarchy_superior.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <= " +
                        year +
                        ' and diosezy.id = ActivityField.id group by year.end_year order by year.end_year desc limit 1) end) ) - count(paymentDetail.id)) as reste',
                )
                .where(
                    '(paymentDraftDetail.hierarchy_id is null or paymentDraftDetail.hierarchy_id =' +
                        criteria.hierarchy_id +
                        ' )',
                );
        } else if (criteria.hierarchy.toLowerCase() === 'fivondronana') {
            query = query
                .addSelect(
                    "(case when (select count(member_activity.id) from member_activity  join activity_year year on year.id = member_activity.activity_year_id join activity_field  on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id where hierarchy.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <=" +
                        year +
                        " and activity_field_id=ActivityField.id group by year.id order by year.end_year desc limit 1) is null then 0 else (select count(member_activity.id) from member_activity  join activity_year year on year.id = member_activity.activity_year_id join activity_field  on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id where hierarchy.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <=" +
                        year +
                        ' and activity_field_id=ActivityField.id group by year.id order by year.end_year desc limit 1) end )as total',
                )
                .addSelect(
                    "((case when (select count(member_activity.id) from member_activity  join activity_year year on year.id = member_activity.activity_year_id join activity_field  on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id where hierarchy.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <=" +
                        year +
                        " and activity_field_id=ActivityField.id group by year.id order by year.end_year desc limit 1) is null then 0 else (select count(member_activity.id) from member_activity  join activity_year year on year.id = member_activity.activity_year_id join activity_field  on activity_field.id = member_activity.activity_field_id join hierarchy on hierarchy.id = activity_field.hierarchy_id where hierarchy.name='" +
                        criteria.hierarchy +
                        "' and year.end_year <=" +
                        year +
                        ' and activity_field_id=ActivityField.id group by year.id order by year.end_year desc limit 1) end ) - count(paymentDetail.id)) as reste',
                )
                .where('paymentDraftDetail.hierarchy_id is null');
        }
        query = query
            .andWhere(
                '(activityYear.end_year = ' +
                    year +
                    ' or activityYear.end_year is null)',
            )
            .andWhere('ActivityField.hierarchy_id = :id', {
                id: criteria.hierarchy_id,
            })
            .groupBy('ActivityField.id');
        const queryWithoutLimit = await query.getRawMany();
        const count = queryWithoutLimit.length;
        let totalPage = Math.floor(Number(count) / limit);
        if (Number(count) % limit != 0) {
            totalPage = totalPage + 1;
        }
        return {
            statistic: await query.offset(offset).limit(limit).getRawMany(),
            pagination: {
                page: +page,
                totalPages: totalPage,
                pageNumber: +limit,
            },
        };
    }

    async findAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
    ): Promise<Record<string, any>> {
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
        const activityField = criteria.activityField;
        delete criteria.activityField;
        delete criteria.pageNumber;
        delete criteria.page;
        let query = this.activityFieldRepository.createQueryBuilder();
        if (properties) {
            query = this.appendProperties(query, properties);
        }
        let name = '';
        if (criteria.name) {
            name = '%' + criteria.name + '%';
            delete criteria.name;
        }
        query = query.where(criteria);
        if (name !== '')
            query = query.andWhere('ActivityField.name like :name', { name });
        if (activityField) {
            // get activity fields from inferior activity only
            let afInferiors = await this.getAllInferiorActivityFields(
                +activityField,
            );
            afInferiors = afInferiors.map((af) => af.id);
            const afWhere = afInferiors.map((af) => {
                return `ActivityField.superior_field = ${af}`;
            });
            if (afWhere.length > 0) {
                let afWhereStr = afWhere.join(' OR ');
                afWhereStr = `(${afWhereStr} OR ActivityField.superior_field = ${activityField})`;
                query.andWhere(afWhereStr);
            }
            delete criteria.activityField;
        }
        const number = await query.getCount();
        let totalPage = Math.floor(Number(number) / limit);
        if (Number(number) % limit != 0) {
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
