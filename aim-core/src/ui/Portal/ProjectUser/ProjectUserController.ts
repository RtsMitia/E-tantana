import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { IProjectUserService } from 'src/core/applicationServices/ProjectUser/IProjectUserService';
import { ProjectUser } from 'src/core/domains/ProjectUser/ProjectUser';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('projectUsers')
export class ProjectUserController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PROJECTUSER_SERVICE)
        private userService: IProjectUserService,
    ) {}

    @Get()
    findUsers(@Query() params) {
        return this.userService.fetchAllUsersWithCriteria(params);
    }

    @Get(':id')
    fetchUserById(@Param('id') id) {
        return this.userService.fetchUserById(id);
    }

    @Post()
    createUser(@Body() user: ProjectUser) {
        return this.userService.createUser(user);
    }

    @Put(':id')
    updateUser(@Param('id') id, @Body() user: any) {
        return this.userService.update(id, user);
    }

    @Delete(':id')
    deleteUser(@Param('id') id) {
        return this.userService.delete(id);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() user: { username: string; password: string }) {
        return {
            access_token: await this.userService.login(user),
        };
    }
}
