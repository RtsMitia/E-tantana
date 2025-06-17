import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { extname } from 'path';
import { IFileUploadService } from './IFileUploadService';

@Injectable()
export class FileUploadService implements IFileUploadService {
    async uploadImage(imageBuffer: Buffer, filename: string) {
        const s3 = new S3();
        return await s3
            .upload({
                Bucket: process.env.BUCKET_NAME,
                Body: imageBuffer,
                Key: filename,
            })
            .promise();
    }
}

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const editFileName = (file) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    return `${name}-${Date.now()}${fileExtName}`;
};
