import { Module } from '@nestjs/common';
import { VersionController } from 'src/ui/Version/version.controller';

@Module({
    controllers: [VersionController],
})
export class VersionModule {}
