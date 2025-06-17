import { Entity, OneToMany } from 'typeorm';
import { SimpleData } from '../SimpleData/SimpleData';

@Entity('process_type')
export class ProcessType extends SimpleData {}
