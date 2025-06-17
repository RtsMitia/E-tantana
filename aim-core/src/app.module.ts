import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ActivityField } from './core/domains/ActivityField/ActivityField';
import { ActivityFieldSection } from './core/domains/ActivityFieldSection/ActivityFieldSection';
import { ActivityPlan } from './core/domains/ActivityPlan/ActivityPlan';
import { ActivityYear } from './core/domains/ActivityYear/ActivityYear';
import { AdultInfo } from './core/domains/AdultInfo/AdultInfo';
import { DetailActivityPlan } from './core/domains/DetailActivityPlan/DetailActivityPlan';
import { DetailActivityPlanGoal } from './core/domains/DetailActivityPlanGoal/DetailActivityPlanGoal';
import { DetailActivityPlanResponsible } from './core/domains/DetailActivityPlanResponsible/DetailActivityPlanResponsible';
import { DetailActivityPlanTalentGoal } from './core/domains/DetailActivityPlanTalentGoal/DetailActivityPlanTalentGoal';
import { EducationField } from './core/domains/EducationField/EducationField';
import { EducationGoal } from './core/domains/EducationGoal/EducationGoal';
import { FeeType } from './core/domains/FeeType/FeeType';
import { GroupSection } from './core/domains/GroupSection/GroupSection';
import { Hierarchy } from './core/domains/Hierarchy/Hierarchy';
import { Member } from './core/domains/Member/Member';
import { MemberActivity } from './core/domains/MemberActivity/MemberActivity';
import { MemberGroupName } from './core/domains/MemberGroupName/MemberGroupName';
import { MemberRole } from './core/domains/MemberRole/MemberRole';
import { MemberSacrement } from './core/domains/MemberSacrement/MemberSacrement';
import { MembershipFee } from './core/domains/MembershipFee/MembershipFee';
import { MemberTransferRequest } from './core/domains/MemberTransferRequest/MemberTransferRequest';
import { Payment } from './core/domains/Payment/Payment';
import { PaymentDetail } from './core/domains/PaymentDetail/PaymentDetail';
import { PaymentDraft } from './core/domains/PaymentDraft/PaymentDraft';
import { PaymentDraftDetail } from './core/domains/PaymentDraftDetail/PaymentDraftDetail';
import { PaymentDraftDetailActivityField } from './core/domains/PaymentDraftDetailActivityField/PaymentDraftDetailActivityField';
import { PaymentType } from './core/domains/PaymentType/PaymentType';
import { ProcessType } from './core/domains/ProcessType/ProcessType';
import { Project } from './core/domains/Project/Project';
import { ProjectActivity } from './core/domains/ProjectActivity/ProjectActivity';
import { ProjectGoal } from './core/domains/ProjectGoal/ProjectGoal';
import { ProjectImage } from './core/domains/ProjectImage/ProjectImage';
import { ProjectManager } from './core/domains/ProjectManager/ProjectManager';
import { ProjectPartner } from './core/domains/ProjectPartner/ProjectPartner';
import { ProjectResult } from './core/domains/ProjectResult/ProjectResult';
import { ProjectTarget } from './core/domains/ProjectTarget/ProjectTarget';
import { ProjectTool } from './core/domains/ProjectTool/ProjectTool';
import { ProjectUser } from './core/domains/ProjectUser/ProjectUser';
import { Sacrement } from './core/domains/Sacrement/Sacrement';
import { Section } from './core/domains/Section/Section';
import { SectionStep } from './core/domains/SectionStep/SectionStep';
import { Talent } from './core/domains/Talent/Talent';
import { TalentCategory } from './core/domains/TalentCategory/TalentCategory';
import { TalentGoal } from './core/domains/TalentGoal/TalentGoal';
import { User } from './core/domains/User/User';
import { YouthInfo } from './core/domains/YouthInfo/YouthInfo';
import { ActivityFieldSectionModule } from './dependecy/activity-field-section.module';
import { ActivityFieldModule } from './dependecy/activity-field.module';
import { ActivityPlanModule } from './dependecy/activity-plan.module';
import { ActivityYearModule } from './dependecy/activity-year.module';
import { AdultInfoModule } from './dependecy/adult-info.module';
import { DetailActivityPlanGoalModule } from './dependecy/detail-activity-plan-goal.module';
import { DetailActivityPlanResponsibleModule } from './dependecy/detail-activity-plan-responsible.module';
import { DetailActivityPlanTalentGoalModule } from './dependecy/detail-activity-plan-talent-goal.module';
import { DetailActivityPlanModule } from './dependecy/detail-activity-plan.module';
import { EducationFieldModule } from './dependecy/education-field.module';
import { EducationGoalModule } from './dependecy/education-goal.module';
import { ExcelModule } from './dependecy/excel.module';
import { FeeTypeModule } from './dependecy/fee-type.module';
import { FileUploadModule } from './dependecy/file-upload.module';
import { GeneralDtoModule } from './dependecy/general-dto.module';
import { GroupSectionModule } from './dependecy/group-section.module';
import { HierarchyModule } from './dependecy/hierarchy.module';
import { MemberActivityModule } from './dependecy/member-activity.module';
import { MemberGroupNameModule } from './dependecy/member-group-name.module';
import { MemberRoleModule } from './dependecy/member-role.module';
import { MemberSacrementModule } from './dependecy/member-sacrement.module';
import { MemberTransferRequestModule } from './dependecy/member-transfer-request.module';
import { MemberModule } from './dependecy/member.module';
import { MembershipFeeModule } from './dependecy/membership-fee.module';
import { PaymentDetailModule } from './dependecy/payment-detail.module';
import { PaymentDraftDetailActivityFieldModule } from './dependecy/payment-draft-detail-activity-field.module';
import { PaymentDraftDetailModule } from './dependecy/payment-draft-detail.module';
import { PaymentDraftModule } from './dependecy/payment-draft.module';
import { PaymentTypeModule } from './dependecy/payment-type.module';
import { PaymentModule } from './dependecy/payment.module';
import { ProcessTypeModule } from './dependecy/process-type.module';
import { ProjectActivityModule } from './dependecy/project-activity.module';
import { ProjectGoalModule } from './dependecy/project-goal.module';
import { ProjectImageModule } from './dependecy/project-image.module';
import { ProjectManagerModule } from './dependecy/project-manager.module';
import { ProjectPartnerModule } from './dependecy/project-partner.module';
import { ProjectResultModule } from './dependecy/project-result.module';
import { ProjectTargetModule } from './dependecy/project-target.module';
import { ProjectToolModule } from './dependecy/project-tool.module';
import { ProjectUserModule } from './dependecy/project-user.module';
import { ProjectModule } from './dependecy/project.module';
import { SacrementModule } from './dependecy/sacrement.module';
import { SectionStepModule } from './dependecy/section-step.module';
import { SectionModule } from './dependecy/section.module';
import { TalentCategoryModule } from './dependecy/talent-category.module';
import { TalentGoalModule } from './dependecy/talent-goal.module';
import { TalentModule } from './dependecy/talent.module';
import { UserModule } from './dependecy/user.module';
import { VersionModule } from './dependecy/version.module';
import { MailModule } from './dependecy/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';

@Module({
    imports: [
        MulterModule.register({
            dest: './files',
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                transport: {
                    host: config.get<string>('MAIL_HOST'),
                    secure: config.get<boolean>('MAIL_SECURE'),
                    port: config.get<number>('MAIL_PORT'),
                    auth: {
                        user: config.get<string>('MAIL_USER'),
                        pass: config.get<string>('MAIL_PASSWORD'),
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                },
                defaults: {
                    from: config.get<string>('MAIL_FROM'),
                },
                template: {
                    dir: join(__dirname, 'ui/MailTemplates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            entities: [
                User,
                ProjectUser,
                Sacrement,
                Member,
                MemberActivity,
                MemberRole,
                Hierarchy,
                Section,
                ActivityField,
                MemberSacrement,
                FeeType,
                PaymentType,
                EducationField,
                SectionStep,
                YouthInfo,
                AdultInfo,
                EducationGoal,
                ActivityFieldSection,
                GroupSection,
                MemberGroupName,
                ProcessType,
                Talent,
                TalentCategory,
                TalentGoal,
                ActivityYear,
                MembershipFee,
                Payment,
                PaymentDetail,
                Project,
                ProjectTarget,
                ProjectGoal,
                ProjectResult,
                ProjectManager,
                ProjectPartner,
                ProjectActivity,
                ProjectTool,
                ProjectImage,
                PaymentDraft,
                PaymentDraftDetail,
                PaymentDraftDetailActivityField,
                ActivityPlan,
                DetailActivityPlan,
                DetailActivityPlanGoal,
                DetailActivityPlanTalentGoal,
                DetailActivityPlanResponsible,
                MemberTransferRequest,
            ],
            synchronize: false,
        }),
        GeneralDtoModule,
        DetailActivityPlanModule,
        DetailActivityPlanGoalModule,
        DetailActivityPlanTalentGoalModule,
        DetailActivityPlanResponsibleModule,
        ActivityPlanModule,
        UserModule,
        ProjectUserModule,
        SacrementModule,
        MemberModule,
        MemberRoleModule,
        MemberTransferRequestModule,
        MemberActivityModule,
        HierarchyModule,
        MemberSacrementModule,
        SectionModule,
        ActivityFieldModule,
        FeeTypeModule,
        PaymentTypeModule,
        EducationFieldModule,
        SectionStepModule,
        AdultInfoModule,
        AdultInfoModule,
        EducationGoalModule,
        ActivityFieldSectionModule,
        GroupSectionModule,
        MemberGroupNameModule,
        ProcessTypeModule,
        TalentModule,
        TalentCategoryModule,
        TalentGoalModule,
        ActivityYearModule,
        MembershipFeeModule,
        PaymentModule,
        PaymentDetailModule,
        ProjectModule,
        ProjectTargetModule,
        ProjectGoalModule,
        ProjectResultModule,
        ProjectPartnerModule,
        ProjectToolModule,
        ProjectActivityModule,
        ProjectManagerModule,
        PaymentDraftDetailModule,
        PaymentDraftModule,
        PaymentDraftDetailActivityFieldModule,
        ExcelModule,
        VersionModule,
        FileUploadModule,
        ProjectImageModule,
        MailModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
