import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    Post,
    Put,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
    editFileName,
    imageFileFilter,
} from 'src/core/applicationServices/FileUpload/FileUploadService';
import { IFileUploadService } from 'src/core/applicationServices/FileUpload/IFileUploadService';
import { IProjectImageService } from 'src/core/applicationServices/ProjectImage/IProjectImageService';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('projectImages')
export class ProjectImageController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PROJECTIMAGE_SERVICE)
        private projectImageService: IProjectImageService,
        @Inject(SERVICE_MAPPING_TOKEN.FILEUPLOAD_SERVICE)
        private fileUploadService: IFileUploadService,
    ) {}

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return {
            projectImage: await this.projectImageService.fetchById(id),
        };
    }

    @Get()
    async fetchAll() {
        return {
            projectImages: await this.projectImageService.fetchAll(),
        };
    }

    @Post()
    @UseInterceptors(
        FilesInterceptor('images', 20, {
            fileFilter: imageFileFilter,
        }),
    )
    async create(
        @Body('project_id') id: number = 0,
        @UploadedFiles() images: Array<Express.Multer.File>,
    ) {
        if (images) {
            const projectImage = images.map((i) => {
                i.filename = editFileName(i);
                this.fileUploadService.uploadImage(i.buffer, i.filename);
                return {
                    id: null,
                    project_id: +id,
                    name: i.filename,
                    deleted_at: null,
                    project: null,
                };
            });
            return {
                projectImage: await this.projectImageService.save(projectImage),
            };
        } else {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'No images found.',
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Put(':id')
    async update(@Body() data: any, @Param('id') id: number) {
        return this.projectImageService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.projectImageService.delete(id);
    }
}
