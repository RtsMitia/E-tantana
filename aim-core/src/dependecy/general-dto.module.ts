import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralDtoService } from 'src/core/applicationServices/GeneralDto/GeneralDtoService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { GeneralDto } from 'src/core/domains/GeneralDto/GeneralDto';
import { GeneralDtoRepository } from 'src/infrastructure/repositories/GeneralDto/GeneralDtoRepository';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { Repository } from 'typeorm';

@Module({
    imports: [Repository, TypeOrmModule.forFeature([GeneralDto])],
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.GENERALDTO_SERVICE,
            useClass: GeneralDtoService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.GENERALDTO_REPOSITORY,
            useClass: GeneralDtoRepository,
        },
    ],
})
export class GeneralDtoModule {}
