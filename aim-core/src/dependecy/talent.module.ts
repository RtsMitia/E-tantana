import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalentService } from 'src/core/applicationServices/Talent/TalentService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { Talent } from 'src/core/domains/Talent/Talent';
import { TalentRepository } from 'src/infrastructure/repositories/Talent/TalentRepository';
import { TalentController } from 'src/ui/Portal/Talent/TalentController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.TALENT_SERVICE,
            useClass: TalentService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.TALENT_REPOSITORY,
            useClass: TalentRepository,
        },
    ],
    controllers: [TalentController],
    imports: [TypeOrmModule.forFeature([Talent])],
})
export class TalentModule {}
