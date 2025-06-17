import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdultInfoService } from 'src/core/applicationServices/AdultInfo/AdultInfoService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { AdultInfo } from 'src/core/domains/AdultInfo/AdultInfo';
import { AdultInfoRepository } from 'src/infrastructure/repositories/AdultInfo/AdultinfoRepository';
import { AdultInfoController } from 'src/ui/Portal/AdultInfo/AdultInfoController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { ActivityFieldModule } from './activity-field.module';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.ADULTINFO_SERVICE,
            useClass: AdultInfoService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.ADULTINFO_REPOSITORY,
            useClass: AdultInfoRepository,
        },
        AdultInfoService,
    ],
    controllers: [AdultInfoController],
    imports: [TypeOrmModule.forFeature([AdultInfo]), ActivityFieldModule],
})
export class AdultInfoModule {}
