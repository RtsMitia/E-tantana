import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IPaymentDetailRepository extends IGeneralDtoRepository {
    statisticByCategory(criteria: any);
    globalStatistic(criteria: any);
    findPaymentDetailsByPaymentId(id: number): Promise<unknown>;
    getMemberPayment(id: number, criteria);
}
