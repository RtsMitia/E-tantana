import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Query,
    UploadedFile,
    UseInterceptors,
    Inject,
    Put,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { IPaymentDraftDetailService } from 'src/core/applicationServices/PaymentDraftDetail/IPaymentDraftDetailService';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('paymentDraftDetails')
export class PaymentDraftDetailController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PAYMENTDRAFTDETAIL_SERVICE)
        private paymentDraftDetailService: IPaymentDraftDetailService,
    ) {}

    @Post('importExcel')
    @UseInterceptors(FileInterceptor('file'))
    importExcel(@UploadedFile() file: Express.Multer.File, @Body() year) {
        return this.paymentDraftDetailService.transmitDataToPaymentDraftDetails(
            file,
            year.year,
        );
    }

    @Get(':id')
    async getAllPaymentDraftDetailsForOnePayment(
        @Param('id') id: number,
        @Query() query: any,
    ) {
        return await this.paymentDraftDetailService.fetchAllPaymentsDraftDetailsForOnePayment(
            id,
            query,
        );
    }

    @Put(':id')
    async updatePaymentDraftDetail(@Param('id') id: number, @Body() data) {
        console.log("Miditra update");
        return await this.paymentDraftDetailService.update(id, data);
    }
}
