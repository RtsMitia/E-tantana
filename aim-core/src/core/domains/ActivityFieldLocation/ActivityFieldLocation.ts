import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Index } from 'typeorm';
import { ActivityField } from '../ActivityField/ActivityField';
import { Geometry } from 'geojson';
import { GeneralDto } from '../GeneralDto/GeneralDto';

@Entity('activity_field_location')
export class ActivityFieldLocation extends GeneralDto{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ActivityField, (activityField) => activityField.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'activity_field_id' })
    activityField: ActivityField;

    @Column({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326,
    })
    @Index({ spatial: true }) // Optional: adds spatial index if needed
    location: Geometry; // Or use `Point` from `@types/geojson` if you want to be more specific
}
