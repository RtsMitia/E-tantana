import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IPaymentDetailService extends IGeneralDtoService {
    statisticByCategory(criteria: any);
    globalStatistic(criteria: any);
    fetchPaymentDetailsByPaymentId(id: number): Promise<unknown>;
    fetchMemberPayment(id: number, criteria);
}
