import {
    BadRequestException,
    ForbiddenException,
    Inject,
    Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/domains/User/User';
import { IUserRepository } from 'src/core/domainServices/User/IUserRepository';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';
import { IMemberService } from 'src/core/applicationServices/Member/IMemberService';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { IMemberActivityService } from 'src/core/applicationServices/MemberActivity/IMemberActivityService';
import { IMailService } from 'src/core/applicationServices/Mail/IMailService';

@Injectable()
export class UserRepository
    extends GeneralDtoRepository
    implements IUserRepository
{
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
        private config: ConfigService,
        @Inject(SERVICE_MAPPING_TOKEN.MEMBER_SERVICE)
        private memberService: IMemberService,
        @Inject(SERVICE_MAPPING_TOKEN.MEMBERACTIVITY_SERVICE)
        private memberActivityService: IMemberActivityService,
        @Inject(SERVICE_MAPPING_TOKEN.MAIL_SERVICE)
        private mailService: IMailService,
        private configService: ConfigService,
    ) {
        super(userRepository);
    }

    findByUsername(username: string): Promise<User> {
        return (
            this.userRepository
                .createQueryBuilder()
                .addSelect('User.password')
                // .leftJoinAndSelect('User.member', 'member')
                .where('username like :username', { username })
                .orWhere('email like :username', { username })
                .orWhere('User.contact like :username', { username })
                // .orWhere(
                //     "lower(concat(member.last_name, ' ', member.first_name)) like :username",
                //     { username: username.toLowerCase() },
                // )
                // .orWhere(
                //     "lower(concat(member.first_name, ' ', member.last_name)) like :username",
                //     { username: username.toLowerCase() },
                // )
                .getOne()
        );
    }

    findByLinkAndCode(link: string, code: number): Promise<User> {
        return (
            this.userRepository
                .createQueryBuilder()
                // .leftJoinAndSelect('User.member', 'member')
                .where('generatedLink = :link', { link })
                .andWhere('generatedCode = :code', { code })
                .getOne()
        );
    }

    findByLink(link: string): Promise<User> {
        return (
            this.userRepository
                .createQueryBuilder()
                // .leftJoinAndSelect('User.member', 'member')
                .where('generatedLink = :link', { link })
                .andWhere('generatedCode is null')
                .getOne()
        );
    }

    async isLinkValidWithCode(link: string): Promise<User> {
        const user = await this.userRepository
            .createQueryBuilder()
            // .leftJoinAndSelect('User.member', 'member')
            .where('generatedLink = :link', { link })
            .andWhere('generatedCode IS NOT NULL')
            .getOne();
        if (!user)
            throw new BadRequestException(
                "Member doesn't exist or password reset unsuccessful.",
            );
        return user;
    }

    findAllUsersWithCriteria(criteria): Promise<unknown> {
        return this.findAllWithCriteria(criteria, [
            // { property: 'User.member', alias: 'member' },
            { property: 'User.activityField', alias: 'activityField' },
        ]);
    }

    async findUserById(id: number): Promise<unknown> {
        return (
            this.userRepository
                .createQueryBuilder()
                // .leftJoinAndSelect('User.member', 'member')
                .leftJoinAndSelect('User.activityField', 'activityField')
                .addSelect('User.password')
                .where('User.id = :id', { id })
                .getOne()
        );
    }

    async createUser(user: User): Promise<unknown> {
        const randomPassword = Math.random()
            .toString(36)
            .substring(2)
            .concat(Math.random().toString(36).substring(2));
        const generatedLink = Math.random()
            .toString(36)
            .substring(2)
            .concat(Math.random().toString(36).substring(2));
        user.password = randomPassword;
        user.generatedLink = generatedLink;
        const userData = await this.findByUsername(user.username);
        if (!userData) {
            user.password = await bcrypt.hash(user.password, 10);
            const mailData = await this.findAllWithCriteria({
                email: user.email,
            });
            user.errorCount = 0;
            if (mailData.data.length == 0) {
                // const otherUser = await this.findAllWithCriteria({
                //     member_id: user.member_id,
                // });
                // if (otherUser.data.length == 0) {
                let res: any = await this.save(user);
                res = await this.findById(
                    res.id,
                    //     , [
                    //     { property: 'User.member', alias: 'member' },
                    // ]
                );
                delete res.password;
                delete res.deleted_at;
                await this.mailService.sendMail(user.email, {
                    template: `./firstPassword`,
                    subject: `Bienvenue dans Antily-app.`,
                    // user: `${res.member.first_name} ${res.member.last_name}`,
                    username: user.username,
                    mail: user.email,
                    url: `${this.configService.get(
                        'FRONTEND_URL',
                    )}firstPassword/${generatedLink}`,
                });
                return { user: res };
                // } else
                //     throw new BadRequestException(
                //         'Member already have a user account.',
                //     );
            } else throw new BadRequestException('Email address already used.');
        } else throw new BadRequestException('Username already used.');
    }

async login(user: { username: string; password: string }): Promise<unknown> {
    console.log('Login attempt:', { username: user.username, password: user.password });

    const userData = await this.findByUsername(user.username);
    if (!userData){
        console.log('User Not Verified');
        throw new ForbiddenException('Username or password incorrect.');
    }   
    else {
        if (userData.errorCount > 2)
            throw new ForbiddenException('Account blocked.');
        console.log('Comparing passwords:', {
        enteredPassword: user.password,
        hashedPassword: userData.password,
        });
        /*const pwMatches = await bcrypt.compare(
            user.password,
            userData.password,
        );*/
        const pwMatches = user.password === userData.password;
        console.log('Password match result:', pwMatches);
        if (!pwMatches) {
            if (userData.errorCount >= 2)
                throw new ForbiddenException('Account blocked.');

            const count = userData.errorCount + 0;
            this.update(userData.id, {
                errorCount: count,
            });
            throw new ForbiddenException({
                message: 'Password incorrect.',
                errorCount: count,
            });
        }

        const token = await this.signToken(userData);
        delete userData.password;
        // delete userData.member;
        return {
            token,
            user: userData,
            // member: await this.memberService.fetchById(userData.member_id),
            // memberActivity:
            //     await this.memberActivityService.fetchLastMemberActivity(
            //         userData.member_id,
            //     ),
        };
    }
}

    signToken(user: User): Promise<string> {
        const payload = {
            sub: user.id,
            username: user.username,
            // member_id: user.member.id,
        };
        return this.jwtService.signAsync(payload, {
            expiresIn: '1h',
            secret: this.config.get('JWT_SECRET'),
        });
    }

    async updatePassword(
        id: number,
        oldPassword: string,
        newPassword: string,
    ): Promise<unknown> {
        const userData: any = await this.findUserById(id);
        if (!userData) throw new BadRequestException('User does not exist.');
        const pwMatches = await bcrypt.compare(oldPassword, userData.password);
        if (!pwMatches) throw new BadRequestException('Wrong old password.');
        return await this.update(id, {
            password: await bcrypt.hash(newPassword, 10),
        });
    }

    async updatePasswordFromForgotten(
        id: number,
        newPassword: string,
    ): Promise<unknown> {
        const userData: any = await this.findUserById(id);
        if (!userData) throw new BadRequestException('User does not exist.');
        return await this.update(id, {
            password: await bcrypt.hash(newPassword, 10),
            generatedCode: null,
            generatedLink: null,
        });
    }

    async updatePasswordFromFirst(
        id: number,
        newPassword: string,
    ): Promise<unknown> {
        const userData: any = await this.findUserById(id);
        if (!userData) throw new BadRequestException('User does not exist.');
        await this.update(id, {
            password: await bcrypt.hash(newPassword, 10),
            generatedCode: null,
            generatedLink: null,
        });
        return await this.login({
            username: userData.email,
            password: newPassword,
        });
    }

    async forgottenPassword(mail): Promise<unknown> {
        const userData = await this.findByUsername(mail);
        if (!userData) throw new BadRequestException('User does not exist.');
        let generatedCode = Math.floor(
            Math.random() * 1000000 + 100000,
        ).toString();
        if (generatedCode.length > 6)
            generatedCode = generatedCode.substring(generatedCode.length - 6);
        const generatedLink = Math.random()
            .toString(36)
            .substring(2)
            .concat(Math.random().toString(36).substring(2));
        const result = {
            generatedCode,
            generatedLink,
        };
        this.update(userData.id, result);
        await this.mailService.sendMail(mail, {
            template: './forgotPassword',
            subject: `${generatedCode} est votre code de récupération Antily-app.`,
            username: `${userData.username} ${userData.email}`,
            code: generatedCode,
            url: `${this.configService.get(
                'FRONTEND_URL',
            )}passwordForgottenCode/${generatedLink}`,
        });
        return { generatedLink, email: userData.email };
    }

    async forgottenPasswordLogin(link, code): Promise<unknown> {
        if (!link || !code)
            throw new ForbiddenException(
                'Wrong link or code for password reset.',
            );
        const userData: any = await this.findByLinkAndCode(link, code);
        if (!userData)
            throw new ForbiddenException(
                'Wrong link or code for password reset.',
            );
        else {
            delete userData.password;
            delete userData.contact;
            delete userData.deleted_at;
            delete userData.errorCount;
            delete userData.generatedCode;
            delete userData.generatedLink;
            delete userData.is_active;
            // delete userData.member_id;
            // userData.name = `${userData.member.first_name} ${userData.member.last_name}`;
            // delete userData.member;
            return {
                tempUser: userData,
            };
        }
    }

    async firstPasswordLogin(link): Promise<unknown> {
        if (!link)
            throw new ForbiddenException('Wrong link for password reset.');
        const userData: any = await this.findByLink(link);
        if (!userData)
            throw new ForbiddenException('Wrong link for password reset.');
        else {
            delete userData.password;
            delete userData.contact;
            delete userData.deleted_at;
            delete userData.errorCount;
            delete userData.generatedCode;
            delete userData.generatedLink;
            delete userData.is_active;
            delete userData.member_id;
            userData.name = `${userData.member.first_name} ${userData.member.last_name}`;
            delete userData.member;
            return {
                tempUser: userData,
            };
        }
    }
}
