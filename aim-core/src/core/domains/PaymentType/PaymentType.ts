import { Column, Entity } from 'typeorm';
import { SimpleData } from '../SimpleData/SimpleData';

@Entity('payment_type')
export class PaymentType extends SimpleData {}
