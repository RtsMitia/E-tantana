import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityFieldLocation } from 'src/core/domains/ActivityFieldLocation/ActivityFieldLocation';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { IActivityFieldLocationRepository } from 'src/core/domainServices/ActivityFieldLocation/IActivityFieldLocationRepository';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class ActivityFieldLocationRepository
    extends GeneralDtoRepository
    implements IActivityFieldLocationRepository
{
    constructor(
        @InjectRepository(ActivityFieldLocation)
        private ActivityFieldLocationRepository: Repository<ActivityFieldLocation>,
    ) {
        super(ActivityFieldLocationRepository);
    }

    appendProperties(
        query: SelectQueryBuilder<ActivityFieldLocation>,
        properties: JoinProperties[],
    ) {
        properties.forEach((prop) => {
            query = query.leftJoinAndSelect(prop.property, prop.alias);
        });
        return query;
    }

    async findById(
        id: number,
        properties: JoinProperties[],
    ): Promise<ActivityFieldLocation> {
        let query = this.ActivityFieldLocationRepository.createQueryBuilder();
        query = this.appendProperties(query, properties);
        return query
            //.where(`${this.getTableName('.')}id = :id`, { id })
            .withDeleted()
            .getOne();
    }


    async findAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
    ): Promise<Record<string, any>> {
        console.log('[DEBUG] Initial criteria:', { ...criteria });

        // Query activity_field_location grouped by district
        const query = this.ActivityFieldLocationRepository.createQueryBuilder("afl")
            .select("af2.id", "district_id")
            .addSelect("af2.name", "district_name")
            .addSelect("ST_AsGeoJSON(ST_ConvexHull(ST_Collect(afl.location)))", "geometry")
            .addSelect("COUNT(*)", "fivondronana_count")
            .innerJoin("activity_field", "af1", "af1.id = afl.activity_field_id AND af1.hierarchy_id = 4")
            .innerJoin("activity_field", "af2", "af2.id = af1.superior_field AND af2.hierarchy_id = 3")
            .groupBy("af2.id")
            .addGroupBy("af2.name")
            .orderBy("af2.name", "ASC");

        console.log('[DEBUG] Executing main query...');
        const rawData = await query.getRawMany();
        console.log('[DEBUG] Query result count:', rawData.length);
        console.log('[DEBUG] Raw query result:', rawData);

        const finalData = (rawData || []).map((row) => ({
            id: row.district_id,
            name: row.district_name,
            geometry: (() => {
                try {
                    return JSON.parse(row.geometry);
                } catch (e) {
                    console.error("[ERROR] Failed to parse geometry:", row.geometry);
                    return null;
                }
            })(),
            foivondronanaCount: Number(row.fivondronana_count),
        }));

        console.log('[DEBUG] Final mapped data:', finalData);

        return {
            data: finalData,
        };
    }

    async findAllDiosezyWithGeometry(): Promise<any[]> {
        console.log("Starting findAllDiosezyWithGeometry query");

        const query = this.ActivityFieldLocationRepository.createQueryBuilder("afl")
                .select("af3.id", "region_id")
                .addSelect("af3.name", "region_name")
                .addSelect("ST_AsGeoJSON(ST_Union(afl.location))", "geometry")
                .addSelect("COUNT(DISTINCT af2.id)", "district_count")
                .innerJoin("activity_field", "af1", "af1.id = afl.activity_field_id AND af1.hierarchy_id = 4") // fokontany
                .innerJoin("activity_field", "af2", "af2.id = af1.superior_field AND af2.hierarchy_id = 3") // district
                .innerJoin("activity_field", "af3", "af3.id = af2.superior_field AND af3.hierarchy_id = 2") // region
                .groupBy("af3.id")
                .addGroupBy("af3.name")
                .orderBy("af3.name", "ASC");

            console.log("Query built:", query.getSql());

            let rawData;
            try {
                rawData = await query.getRawMany();
                console.log(`Query returned ${rawData.length} rows`);
            } catch (error) {
                console.error("Error executing query:", error);
                throw error; // rethrow after logging
            }

            const parsed = rawData.map((row, idx) => {
                let geometryObj;
                try {
                geometryObj = JSON.parse(row.geometry);
                } catch (e) {
                console.warn(`Failed to parse geometry JSON at row ${idx}`, row.geometry);
                geometryObj = null;
                }
                return {
                id: row.region_id,
                name: row.region_name,
                geometry: geometryObj,
                districtCount: Number(row.district_count),
                };
            });

            console.log("Parsed data sample:", parsed[0]);

            return parsed;
    }

    /*async findAllDiosezyWithGeometry(): Promise<any[]> {
    console.log("Starting findAllDiosezyWithGeometry query");

    const query = this.ActivityFieldLocationRepository.createQueryBuilder("afl")
        .select("af3.id", "region_id")
        .addSelect("af3.name", "region_name")
        .addSelect("ST_AsGeoJSON(ST_ConvexHull(ST_Collect(afl.location)))", "geometry")
        .addSelect("COUNT(DISTINCT af2.id)", "district_count")
        .innerJoin("activity_field", "af1", "af1.id = afl.activity_field_id AND af1.hierarchy_id = 4") // fokontany
        .innerJoin("activity_field", "af2", "af2.id = af1.superior_field AND af2.hierarchy_id = 3")     // district
        .innerJoin("activity_field", "af3", "af3.id = af2.superior_field AND af3.hierarchy_id = 2")     // region
        .groupBy("af3.id")
        .addGroupBy("af3.name")
        .orderBy("af3.name", "ASC");

    console.log("Query built:", query.getSql());

    let rawData;
    try {
        rawData = await query.getRawMany();
        console.log(`Query returned ${rawData.length} rows`);
    } catch (error) {
        console.error("Error executing query:", error);
        throw error;
    }

    const parsed = rawData
        .map((row, idx) => {
            let geometryObj;
            try {
                geometryObj = JSON.parse(row.geometry);
            } catch (e) {
                console.warn(`Failed to parse geometry JSON at row ${idx}`, row.geometry);
                return null;
            }

            return {
                id: row.region_id,
                name: row.region_name,
                geometry: geometryObj,
                districtCount: Number(row.district_count),
            };
        })
        .filter((item) => item !== null);

    console.log("Parsed data sample:", parsed[0]);

    return parsed;
}*/
}
