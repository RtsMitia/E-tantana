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
import { IMailService } from 'src/core/applicationServices/Mail/IMailService';
import { IUserService } from 'src/core/applicationServices/User/IUserService';
import { User } from 'src/core/domains/User/User';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('users')
export class UserController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.USER_SERVICE)
        private userService: IUserService,
    ) {}

    @Get('isValidLink')
    isLinkValidWithCode(@Query() params) {
        return this.userService.isLinkValidWithCode(params.link);
    }

    @Get('password')
    forgottenPassword(@Query() params) {
        return this.userService.forgottenPassword(params.email);
    }

    @Get()
    fetchUsers(@Query() params) {
        return this.userService.fetchAllUsersWithCriteria(params);
    }

    @Get(':id')
    fetchUserById(@Param('id') id) {
        return this.userService.fetchUserById(id);
    }

    @Post()
    createUser(@Body() user: User) {
        return this.userService.createUser(user);
    }

    @Put(':id/password')
    updatePassword(@Param('id') id, @Body() passwords: any) {
        return this.userService.updatePassword(id, passwords);
    }

    @Put(':id/forgottenPassword')
    updatePasswordFromForgotten(@Param('id') id, @Body() password: any) {
        return this.userService.updatePasswordFromForgotten(
            id,
            password.password,
        );
    }

    @Put(':id/firstPassword')
    updatePasswordFromFirst(@Param('id') id, @Body() password: any) {
        return this.userService.updatePasswordFromFirst(id, password.password);
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
        return await this.userService.login(user);
    }

    @HttpCode(HttpStatus.OK)
    @Post('forgottenPasswordLogin')
    async forgottenPasswordLogin(@Body() user: { code: number; link: string }) {
        return await this.userService.forgottenPasswordLogin(
            user.link,
            user.code,
        );
    }

    @HttpCode(HttpStatus.OK)
    @Post('firstPasswordLogin')
    async firstPasswordLogin(@Body() user: { link: string }) {
        return await this.userService.firstPasswordLogin(user.link);
    }
}
