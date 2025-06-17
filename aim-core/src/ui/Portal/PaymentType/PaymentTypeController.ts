import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Inject,
} from '@nestjs/common';
import { IPaymentTypeService } from 'src/core/applicationServices/PaymentType/IPaymentTypeService';
import { PaymentType } from 'src/core/domains/PaymentType/PaymentType';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('paymentTypes')
export class PaymentTypeController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PAYMENTTYPE_SERVICE)
        private paymentTypeService: IPaymentTypeService,
    ) {}

    @Put(':id')
    async updatePaymentType(@Param('id') id: number, @Body() paymentType: any) {
        return {
            paymentType: await this.paymentTypeService.update(id, paymentType),
        };
    }

    @Post()
    async insertPaymentType(@Body() paymentType: PaymentType) {
        return {
            paymentType: await this.paymentTypeService.save(paymentType),
        };
    }

    @Delete(':id')
    async deletePaymentType(@Param('id') id: number) {
        return {
            paymentType: await this.paymentTypeService.delete(id),
        };
    }

    @Get(':id')
    async getPaymentType(@Param('id') id: number) {
        return {
            paymentType: await this.paymentTypeService.fetchById(id),
        };
    }

    @Get()
    getAllPaymentTypes() {
        return this.paymentTypeService.fetchAll();
    }
}
