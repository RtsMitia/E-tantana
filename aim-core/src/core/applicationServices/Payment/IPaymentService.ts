import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IPaymentService extends IGeneralDtoService {
    fetchAllPaymentWithCriteria(criteria): Promise<unknown>;
    fetchAllPaymentDetails(id: number);
    fetchPublicPaymentsListByAfAndAy(
        activityField,
        activityYear,
    ): Promise<unknown>;
    generatePaymentTickets(payments: any[]): Promise<unknown>;
    checkPayment(id): Promise<unknown>;
    findPublicPaymentsListByNameAndAy(name, activityYear): Promise<unknown>;
}
