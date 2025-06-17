import {
    BadRequestException,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';
import { ProjectUser } from 'src/core/domains/ProjectUser/ProjectUser';

@Injectable()
export class ProjectUserRepository extends GeneralDtoRepository {
    constructor(
        @InjectRepository(ProjectUser)
        private userRepository: Repository<ProjectUser>,
        private jwtService: JwtService,
        private config: ConfigService,
    ) {
        super(userRepository);
    }

    findByUsername(mail: string, phone_number: string): Promise<ProjectUser> {
        return this.userRepository
            .createQueryBuilder()
            .leftJoinAndSelect('ProjectUser.member', 'member')
            .addSelect('ProjectUser.password')
            .where('mail = :mail OR phone_number = :phone_number', {
                mail,
                phone_number,
            })
            .getOne();
    }

    findAllUsersWithCriteria(criteria): Promise<unknown> {
        return this.findAllWithCriteria(criteria, [
            { property: 'User.member', alias: 'member' },
        ]);
    }

    async findUserById(id: number): Promise<unknown> {
        return { user: await this.findById(id) };
    }

    async createUser(user: ProjectUser): Promise<unknown> {
        const userData = await this.findByUsername(
            user.mail,
            user.phone_number,
        );
        if (!userData) {
            user.password = await bcrypt.hash(user.password, 10);
            const mailData = await this.findAllWithCriteria({
                mail: user.mail,
            });
            if (mailData.data.length == 0) {
                const otherUser = await this.findAllWithCriteria({
                    member_id: user.member_id,
                });
                if (otherUser.data.length == 0) {
                    let res: any = await this.save(user);
                    res = await this.findById(res.id, [
                        { property: 'ProjectUser.member', alias: 'member' },
                    ]);
                    delete res.password;
                    delete res.deleted_at;
                    return { user: res };
                } else
                    throw new BadRequestException(
                        'Member already have a user account.',
                    );
            } else throw new BadRequestException('Email address already used.');
        } else throw new BadRequestException('Username already used.');
    }

    async login(user: {
        username: string;
        password: string;
    }): Promise<unknown> {
        const ex = new ForbiddenException('Username or password incorrect.');
        const userData = await this.findByUsername(
            user.username,
            user.username,
        );
        if (!userData) throw ex;
        else {
            const pwMatches = await bcrypt.compare(
                user.password,
                userData.password,
            );
            if (!pwMatches) throw ex;
            return this.signToken(userData);
        }
    }

    signToken(user: ProjectUser): Promise<string> {
        const payload = {
            sub: user.id,
            phone_number: user.phone_number,
            mail: user.mail,
            member_id: user.member && user.member.id,
        };
        return this.jwtService.signAsync(payload, {
            expiresIn: '1h',
            secret: this.config.get('JWT_SECRET'),
        });
    }
}
