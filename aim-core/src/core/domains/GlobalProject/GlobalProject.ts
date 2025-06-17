import { IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { Project } from '../Project/Project';
import { ProjectActivity } from '../ProjectActivity/ProjectActivity';
import { ProjectGoal } from '../ProjectGoal/ProjectGoal';
import { ProjectManager } from '../ProjectManager/ProjectManager';
import { ProjectPartner } from '../ProjectPartner/ProjectPartner';
import { ProjectResult } from '../ProjectResult/ProjectResult';

export class GlobalProject {
    @IsNotEmptyObject()
    project: Project;

    @IsNotEmpty()
    projectGoals: ProjectGoal[];

    @IsNotEmpty()
    projectResults: ProjectResult[];

    @IsNotEmpty()
    projectManagers: ProjectManager[];

    @IsNotEmpty()
    projectPartners: ProjectPartner[];

    @IsNotEmpty()
    projectActivities: ProjectActivity[];
}
