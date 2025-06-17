import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProjectActivityService } from 'src/core/applicationServices/ProjectActivity/IProjectActivityService';
import { IProjectGoalService } from 'src/core/applicationServices/ProjectGoal/IProjectGoalService';
import { IProjectManagerService } from 'src/core/applicationServices/ProjectManager/IProjectManagerService';
import { IProjectPartnerService } from 'src/core/applicationServices/ProjectPartner/IProjectPartnerService';
import { IProjectResultService } from 'src/core/applicationServices/ProjectResult/IProjectResultService';
import { IProjectToolService } from 'src/core/applicationServices/ProjectTool/IProjectToolService';
import { GlobalProject } from 'src/core/domains/GlobalProject/GlobalProject';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { OrderbyPropreties } from 'src/core/domains/OrderbyProperties/OrderbyProperties';
import { Project } from 'src/core/domains/Project/Project';
import { IProjectRepository } from 'src/core/domainServices/Project/IProjectRepository';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class ProjectRepository
    extends GeneralDtoRepository
    implements IProjectRepository
{
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        @Inject(SERVICE_MAPPING_TOKEN.PROJECTGOAL_SERVICE)
        private readonly projectGoalService: IProjectGoalService,
        @Inject(SERVICE_MAPPING_TOKEN.PROJECTRESULT_SERVICE)
        private readonly projectResultService: IProjectResultService,
        @Inject(SERVICE_MAPPING_TOKEN.PROJECTMANAGER_SERVICE)
        private readonly projectManagerService: IProjectManagerService,
        @Inject(SERVICE_MAPPING_TOKEN.PROJECTPARTNER_SERVICE)
        private readonly projectPartnerService: IProjectPartnerService,
        @Inject(SERVICE_MAPPING_TOKEN.PROJECTACTIVITY_SERVICE)
        private readonly projectActivityService: IProjectActivityService,
        @Inject(SERVICE_MAPPING_TOKEN.PROJECTTOOL_SERVICE)
        private readonly projectToolService: IProjectToolService,
    ) {
        super(projectRepository);
    }

    async createProject(gProject: GlobalProject) {
        const project = await this.projectRepository.save(gProject.project);
        gProject.projectGoals.forEach(async (goal) => {
            goal.project_id = project.id;
            await this.projectGoalService.save(goal);
        });
        gProject.projectResults.forEach(async (result) => {
            result.project_id = project.id;
            await this.projectResultService.save(result);
        });
        gProject.projectManagers.forEach(async (manager) => {
            manager.project_id = project.id;
            await this.projectManagerService.save(manager);
        });
        gProject.projectPartners.forEach(async (partner) => {
            partner.project_id = project.id;
            await this.projectPartnerService.save(partner);
        });
        gProject.projectActivities.forEach(async (activity) => {
            activity.project_id = project.id;
            const act: any = await this.projectActivityService.save(activity);
            activity.projectTools.forEach(async (tool) => {
                tool.project_activity_id = act.id;
                await this.projectToolService.save(tool);
            });
        });
        return gProject;
    }

    async validateProject(id: number) {
        return await this.update(id, { status: 1 });
    }

    async invalidateProject(id: number) {
        return await this.update(id, { status: -1 });
    }

    async getProjectNotValidated(criteria: any): Promise<Record<string, any>> {
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
        const number = await this.projectRepository
            .createQueryBuilder()
            .where(' status = 0')
            .getCount();
        let totalPage = Math.floor(Number(number) / limit);
        if (Number(number) % limit != 0) {
            totalPage = totalPage + 1;
        }
        return {
            data: await this.projectRepository
                .createQueryBuilder()
                .where(' status = 0')
                .orderBy('id', 'ASC')
                .offset(offset)
                .limit(limit)
                .getMany(),
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
        orders?: OrderbyPropreties[],
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
        delete criteria.pageNumber;
        delete criteria.page;
        let title = null;
        if (criteria.title) {
            title = criteria.title;
            delete criteria.title;
        }
        const number = await this.count(criteria);
        let totalPage = Math.floor(Number(number) / limit);
        if (Number(number) % limit != 0) {
            totalPage = totalPage + 1;
        }
        let query = this.projectRepository.createQueryBuilder();
        if (properties) query = this.appendProperties(query, properties);
        query = query.where(' status = 1').andWhere(criteria);
        if (title !== null)
            query = query.andWhere('title LIKE :title', {
                title: `%${title}%`,
            });
        if (orders) query = this.appendOrder(query, orders);
        return {
            data: await query.offset(offset).limit(limit).getMany(),
            pagination: {
                page: +page,
                totalPages: totalPage,
                pageNumber: +limit,
            },
        };
    }

    appendOrder(
        query: SelectQueryBuilder<Project>,
        orders: OrderbyPropreties[],
    ) {
        orders.forEach((order) => {
            query = query.addOrderBy(order.order, order.option);
        });
        return query;
    }

    appendProperties(
        query: SelectQueryBuilder<Project>,
        properties: JoinProperties[],
    ) {
        properties.forEach((prop) => {
            query = query.leftJoinAndSelect(prop.property, prop.alias);
        });
        return query;
    }
}
