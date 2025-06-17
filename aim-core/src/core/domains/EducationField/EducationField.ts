import { Entity } from 'typeorm';
import { SimpleData } from '../SimpleData/SimpleData';

@Entity('education_field')
export class EducationField extends SimpleData {}
