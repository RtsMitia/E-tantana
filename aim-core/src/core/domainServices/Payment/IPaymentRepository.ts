import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IPaymentRepository extends IGeneralDtoRepository {
    findAllPaymentWithCriteria(criteria): Promise<unknown>;
    getAllPaymentDetails(id: number);
    findPublicPaymentsListByAfAndAy(
        activityField,
        activityYear,
    ): Promise<unknown>;
    findPublicPaymentsListByNameAndAy(name, activityYear): Promise<unknown>;
    generatePaymentTickets(payments: any[]): Promise<unknown>;
    checkPayment(id): Promise<unknown>;
}
