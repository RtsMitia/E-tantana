CREATE TABLE activity_year ( 
	id                   SERIAL PRIMARY KEY,
	start_year           int      ,
	end_year             int      ,
	note                 text      ,
	deleted_at           date      
 );


CREATE TABLE education_field ( 
	id                   SERIAL PRIMARY KEY,
	note                 varchar(600)      ,
	deleted_at           date      ,
	name                 varchar(100)      
 );

CREATE TABLE hierarchy ( 
	id                   SERIAL PRIMARY KEY,
	name                 varchar(100)      ,
	note                 varchar(600)      ,
	deleted_at           date      ,
	level                varchar(100)      
 );

CREATE TABLE member ( 
	id                   SERIAL PRIMARY KEY,
	last_name            varchar(100)      ,
	first_name           varchar(100)      ,
	contact              varchar(20)      ,
	birthdate            date      ,
	birth_place          varchar(100)      ,
	address              varchar(100)      ,
	church               varchar(255)      ,
	entry_date           date      ,
	promise_date         date      ,
	picture              varchar(255)      ,
	talent               varchar(255)      ,
	religion             varchar(200)      ,
	deleted_at           date      
 );

CREATE TABLE member_role ( 
	id                   SERIAL PRIMARY KEY,
	name                 varchar(100)      ,
	note                 varchar(600)      ,
	deleted_at           date      ,
	level                varchar(100)
 );

CREATE TABLE payment_type ( 
	id                   SERIAL PRIMARY KEY,
	name                 varchar(100)      ,
	note                 varchar(600)      ,
	deleted_at           date      
 );

CREATE TABLE process_type ( 
	id                   SERIAL PRIMARY KEY,
	name                 varchar(100)      ,
	note                 varchar(600)      ,
	deleted_at           date      
 );

CREATE TABLE sacrement ( 
	id                   SERIAL PRIMARY KEY,
	name                 varchar(100)      ,
	note                 varchar(600)      ,
	deleted_at           date      
 );

CREATE TABLE section ( 
	id                   SERIAL PRIMARY KEY,
	name                 varchar(100)      ,
	code                 varchar(50)      ,
	color                varchar(100)      ,
	min_age              int      ,
	max_age              int      ,
	section_name         varchar(100)      ,
	group_name           varchar(100)      ,
	motto                varchar(600)      ,
	activity_name        varchar(100)      ,
	outfit_color         varchar(600)      ,
	council              varchar(200)      ,
	patron_saint         varchar(255)      ,
	base                 varchar(255)      ,
	engagement           varchar(255)      ,
	deleted_at           date      
 );

CREATE TABLE section_steps ( 
	id                   SERIAL PRIMARY KEY,
	section_id           int  NOT NULL    ,
	level                varchar(200)      ,
	name                 varchar(100)      ,
	deleted_at           date      ,
	CONSTRAINT fk_section_steps_section FOREIGN KEY ( section_id ) REFERENCES section( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_section_steps_section ON section_steps ( section_id );

CREATE TABLE talent_category ( 
	id                   SERIAL PRIMARY KEY,
	name                 varchar(100)      ,
	color                varchar(100)      ,
	deleted_at           date      
 );

CREATE TABLE "user" ( 
	id                   SERIAL PRIMARY KEY,
	username             varchar(100)      ,
	password             varchar(255)      ,
	member_id            int  NOT NULL    ,
	deleted_at           date      ,
	email                varchar(250)      ,
	is_active            boolean      ,
	CONSTRAINT fk_user_member FOREIGN KEY ( member_id ) REFERENCES member( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_user_member ON "user" ( member_id );

CREATE TABLE youth_info ( 
	id                   SERIAL PRIMARY KEY,
	father_name          varchar(100)      ,
	father_contact       varchar(100)      ,
	father_mail          varchar(100)      ,
	mother_name          varchar(100)      ,
	mother_contact       varchar(100)      ,
	mother_mail          varchar(100)      ,
	member_id            int  NOT NULL    ,
	school_name          varchar(100)      ,
	level                varchar(100)      ,
	note                 varchar(600)      ,
	siblings             int      ,
	siblings_rank        int      ,
	hobby                varchar(255)      ,
	language             varchar(255)      ,
	health_condition     varchar(255)      ,
	allergy              varchar(255)      ,
	deleted_at           date      ,
	CONSTRAINT fk_youth_info_member FOREIGN KEY ( member_id ) REFERENCES member( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_youth_info_member ON youth_info ( member_id );

CREATE TABLE youth_section_step ( 
	id                   SERIAL PRIMARY KEY,
	section_steps_id     int  NOT NULL    ,
	youth_info_id        int  NOT NULL    ,
	"date"               date      ,
	status               boolean      ,
	deleted_at           date      ,
	CONSTRAINT fk_youth_section_step_section_steps FOREIGN KEY ( section_steps_id ) REFERENCES section_steps( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_youth_section_step_youth_info FOREIGN KEY ( youth_info_id ) REFERENCES youth_info( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_youth_section_step_section_steps ON youth_section_step ( section_steps_id );

CREATE INDEX fk_youth_section_step_youth_info ON youth_section_step ( youth_info_id );

CREATE TABLE activity_field ( 
	id                   SERIAL PRIMARY KEY,
	number               varchar(20)      ,
	name                 varchar(100)      ,
	superior_field       int      ,
	place                varchar(200)      ,
	entity               varchar(100)      ,
	hierarchy_id         int  NOT NULL    ,
	deleted_at           date      ,
	CONSTRAINT fk_activity_field_activity_field FOREIGN KEY ( superior_field ) REFERENCES activity_field( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_activity_field_hierarchy FOREIGN KEY ( hierarchy_id ) REFERENCES hierarchy( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_activity_field_activity_field ON activity_field ( superior_field );

CREATE INDEX fk_activity_field_hierarchy ON activity_field ( hierarchy_id );

CREATE TABLE activity_field_section ( 
	id                   SERIAL PRIMARY KEY,
	activity_field_id    int  NOT NULL    ,
	section_id           int  NOT NULL    ,
	deleted_at           date      ,
	CONSTRAINT fk_activity_field_section_activity_field FOREIGN KEY ( activity_field_id ) REFERENCES activity_field( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_activity_field_section_section FOREIGN KEY ( section_id ) REFERENCES section( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_activity_field_section_activity_field ON activity_field_section ( activity_field_id );

CREATE INDEX fk_activity_field_section_section ON activity_field_section ( section_id );

CREATE TABLE activity_plan ( 
	id                   SERIAL PRIMARY KEY,
	activity_year_id     int  NOT NULL    ,
	activity_field_section_id int      ,
	start_month          int      ,
	end_month            int      ,
	status               char(1)      ,
	note                 varchar(600)      ,
	purpose              text      ,
	deleted_at           date      ,
	activity_field_id    int      ,
	CONSTRAINT fk_activity_plan_activity_field FOREIGN KEY ( activity_field_id ) REFERENCES activity_field( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_activity_plan_activity_field_section FOREIGN KEY ( activity_field_section_id ) REFERENCES activity_field_section( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_activity_plan_activity_year FOREIGN KEY ( activity_year_id ) REFERENCES activity_year( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_activity_plan_activity_field ON activity_plan ( activity_field_id );

CREATE INDEX fk_activity_plan_activity_field_section ON activity_plan ( activity_field_section_id );

CREATE INDEX fk_activity_plan_activity_year ON activity_plan ( activity_year_id );

CREATE TABLE adult_info ( 
	id                   SERIAL PRIMARY KEY,
	member_id            int  NOT NULL    ,
	marital_status       char(1)      ,
	child_number         int      ,
	profession           varchar(100)      ,
	company_name         varchar(100)      ,
	school_name          varchar(100)      ,
	school_level         varchar(100)      ,
	mail                 varchar(255)      ,
	facebook             varchar(255)      ,
	church_activities    varchar(200)      ,
	church_association   varchar(255)      ,
	deleted_at           date      ,
	CONSTRAINT fk_adult_info_member FOREIGN KEY ( member_id ) REFERENCES member( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_adult_info_member ON adult_info ( member_id );

CREATE TABLE detail_activity_plan ( 
	id                   SERIAL PRIMARY KEY,
	participants         varchar(255)      ,
	activity_plan_id     int  NOT NULL    ,
	ressource_persons    text      ,
	ressource_tools      text      ,
	ressource_money      text      ,
	place                varchar(200)      ,
	success_rate         text      ,
	blocking             text      ,
	"date"               date      ,
	deleted_at           date      ,
	activity_name        varchar(100)      ,
	other_goals          text      ,
	CONSTRAINT fk_detail_activity_plan_activity_plan FOREIGN KEY ( activity_plan_id ) REFERENCES activity_plan( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_detail_activity_plan_activity_plan ON detail_activity_plan ( activity_plan_id );

CREATE TABLE detail_activity_plan_responsible ( 
	id                   SERIAL PRIMARY KEY,
	detail_activity_plan_id int  NOT NULL    ,
	adult_info_id        int      ,
	deleted_at           date      ,
	CONSTRAINT fk_detail_activity_plan_responsible_adult_info FOREIGN KEY ( adult_info_id ) REFERENCES adult_info( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_detail_activity_plan_responsible_detail_activity_plan FOREIGN KEY ( detail_activity_plan_id ) REFERENCES detail_activity_plan( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_detail_activity_plan_responsible_adult_info ON detail_activity_plan_responsible ( adult_info_id );

CREATE INDEX fk_detail_activity_plan_responsible_detail_activity_plan ON detail_activity_plan_responsible ( detail_activity_plan_id );

CREATE TABLE education_goal ( 
	id                   SERIAL PRIMARY KEY,
	section_steps_id     int  NOT NULL    ,
	education_field_id   int  NOT NULL    ,
	education_goal       varchar(255)      ,
	deleted_at           date      ,
	CONSTRAINT fk_education_goal_eduction_field FOREIGN KEY ( education_field_id ) REFERENCES education_field( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_education_goal_section_steps FOREIGN KEY ( section_steps_id ) REFERENCES section_steps( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_education_goal_eduction_field ON education_goal ( education_field_id );

CREATE INDEX fk_education_goal_section_steps ON education_goal ( section_steps_id );

CREATE TABLE fee_type ( 
	id                   SERIAL PRIMARY KEY,
	name                 varchar(100)      ,
	note                 varchar(600)      ,
	deleted_at           date      ,
	activity_field_id    int      ,
	CONSTRAINT fk_fee_type_activity_field FOREIGN KEY ( activity_field_id ) REFERENCES activity_field( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_fee_type_activity_field ON fee_type ( activity_field_id );

CREATE TABLE group_section ( 
	id                   SERIAL PRIMARY KEY,
	name                 varchar(100)      ,
	note                 varchar(600)      ,
	activity_field_section_id int  NOT NULL    ,
	deleted_at           date      ,
	CONSTRAINT fk_group_section_activity_field_section FOREIGN KEY ( activity_field_section_id ) REFERENCES activity_field_section( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_group_section_activity_field_section ON group_section ( activity_field_section_id );

CREATE TABLE member_activity ( 
	id                   SERIAL PRIMARY KEY,
	member_id            int  NOT NULL    ,
	activity_field_id    int  NOT NULL    ,
	activity_year_id     int  NOT NULL    ,
	member_role_id       int  NOT NULL    ,
	section_id           int      ,
	note_role            varchar(600)      ,
	level                varchar(10)      ,
	deleted_at           date      ,
	CONSTRAINT fk_member_activity_activity_field FOREIGN KEY ( activity_field_id ) REFERENCES activity_field( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_member_activity_activity_year FOREIGN KEY ( activity_year_id ) REFERENCES activity_year( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_member_activity_member FOREIGN KEY ( member_id ) REFERENCES member( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_member_activity_member_role FOREIGN KEY ( member_role_id ) REFERENCES member_role( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_member_activity_section FOREIGN KEY ( section_id ) REFERENCES section( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_member_activity_activity_field ON member_activity ( activity_field_id );

CREATE INDEX fk_member_activity_activity_year ON member_activity ( activity_year_id );

CREATE INDEX fk_member_activity_member ON member_activity ( member_id );

CREATE INDEX fk_member_activity_member_role ON member_activity ( member_role_id );

CREATE INDEX fk_member_activity_section ON member_activity ( section_id );

CREATE TABLE member_group_name ( 
	id                   SERIAL PRIMARY KEY,
	group_section_id     int  NOT NULL    ,
	member_activity_id   int  NOT NULL    ,
	deleted_at           date      ,
	CONSTRAINT fk_member_group_name_group_section FOREIGN KEY ( group_section_id ) REFERENCES group_section( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_member_group_name_member_activity FOREIGN KEY ( member_activity_id ) REFERENCES member_activity( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_member_group_name_group_section ON member_group_name ( group_section_id );

CREATE INDEX fk_member_group_name_member_activity ON member_group_name ( member_activity_id );

CREATE TABLE member_sacrement ( 
	id                   SERIAL PRIMARY KEY,
	sacrement_id         int  NOT NULL    ,
	member_id            int  NOT NULL    ,
	"date"               date      ,
	place                varchar(250)      ,
	deleted_at           date      ,
	CONSTRAINT fk_member_sacrement_member FOREIGN KEY ( member_id ) REFERENCES member( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_member_sacrement_sacrement FOREIGN KEY ( sacrement_id ) REFERENCES sacrement( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_member_sacrement_member ON member_sacrement ( member_id );

CREATE INDEX fk_member_sacrement_sacrement ON member_sacrement ( sacrement_id );

CREATE TABLE membership_fee ( 
	id                   SERIAL PRIMARY KEY,
	hierarchy_id         int      ,
	member_role_id       int  NOT NULL    ,
	activity_year_id     int  NOT NULL    ,
	fee_type_id          int  NOT NULL    ,
	amount               int      ,
	status               char(1)      ,
	deleted_at           date      ,
	CONSTRAINT membership_fee_ibfk_1 FOREIGN KEY ( activity_year_id ) REFERENCES activity_year( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT membership_fee_ibfk_2 FOREIGN KEY ( fee_type_id ) REFERENCES fee_type( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT membership_fee_ibfk_3 FOREIGN KEY ( hierarchy_id ) REFERENCES hierarchy( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT membership_fee_ibfk_4 FOREIGN KEY ( member_role_id ) REFERENCES member_role( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX activity_year_id ON membership_fee ( activity_year_id );

CREATE INDEX fee_type_id ON membership_fee ( fee_type_id );

CREATE INDEX hierarchy_id ON membership_fee ( hierarchy_id );

CREATE INDEX member_role_id ON membership_fee ( member_role_id );

CREATE TABLE payment_draft ( 
	id                   SERIAL PRIMARY KEY,
	payer                varchar(250)  NOT NULL    ,
	"date"               date  NOT NULL    ,
	amount               decimal(10,0)      ,
	note                 text      ,
	deleted_at           date      ,
	payment_type_id      int  NOT NULL    ,
	CONSTRAINT fk_payment_draft_payment_type FOREIGN KEY ( payment_type_id ) REFERENCES payment_type( id ) ON DELETE NO ACTION ON UPDATE NO ACTION
 ) ;

-- CREATE INDEX unq_payment_draft_payment_type ON payment_draft ( payment_type_id );

CREATE TABLE payment_draft_detail ( 
	id                   SERIAL PRIMARY KEY,
	last_name            varchar(100)      ,
	first_name           varchar(250)      ,
	phone_number         varchar(50)      ,
	email                varchar(100)      ,
	activity_year_id     int  NOT NULL    ,
	member_role_id       int  NOT NULL    ,
	fee_type_id          int  NOT NULL    ,
	payment_draft_id     int  NOT NULL    ,
	member_id            int      ,
	hierarchy_id         int      ,
	amount               decimal(10,0)  NOT NULL    ,
	deleted_at           date      ,
	birthdate            date      ,
	promise_date         date      ,
	training_one         boolean      ,
	training_two         boolean      ,
	training_three       boolean      ,
	training_four        boolean      ,
	training_five        boolean      ,
	CONSTRAINT fk_payment_draft_detail_member FOREIGN KEY ( member_id ) REFERENCES member( id ) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_payment_draft_detail_member_role FOREIGN KEY ( member_role_id ) REFERENCES member_role( id ) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_payment_draft_detail_fee_type FOREIGN KEY ( fee_type_id ) REFERENCES fee_type( id ) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_payment_draft_detail_activity_year FOREIGN KEY ( activity_year_id ) REFERENCES activity_year( id ) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_payment_draft_detail_hierarchy FOREIGN KEY ( hierarchy_id ) REFERENCES hierarchy( id ) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_payment_draft_detail_payment_draft FOREIGN KEY ( payment_draft_id ) REFERENCES payment_draft( id ) ON DELETE NO ACTION ON UPDATE NO ACTION
 ) ;

CREATE INDEX unq_payment_draft_detail_payment_draft_id ON payment_draft_detail ( payment_draft_id );

CREATE INDEX fk_payment_draft_detail_activity_year ON payment_draft_detail ( activity_year_id );

CREATE INDEX fk_payment_draft_detail_fee_type ON payment_draft_detail ( fee_type_id );

CREATE INDEX fk_payment_draft_detail_hierarchy ON payment_draft_detail ( hierarchy_id );

CREATE INDEX fk_payment_draft_detail_member ON payment_draft_detail ( member_id );

CREATE INDEX fk_payment_draft_detail_member_role ON payment_draft_detail ( member_role_id );

CREATE TABLE payment_draft_detail_activity_field ( 
	id                   SERIAL PRIMARY KEY,
	activity_field_id    int  NOT NULL    ,
	payment_draft_detail_id int  NOT NULL    ,
	CONSTRAINT fk_payment_draft_detai_activity_field_activity_fields FOREIGN KEY ( activity_field_id ) REFERENCES activity_field( id ) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_payment_draft_detail_activity_field_payment_draft_details FOREIGN KEY ( payment_draft_detail_id ) REFERENCES payment_draft_detail( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 ) ;

CREATE INDEX fk_payment_draft_detail_activity_field_activity_field ON payment_draft_detail_activity_field ( activity_field_id );

CREATE INDEX fk_payment_draft_detail_activity_field_payment_draft_detail ON payment_draft_detail_activity_field ( payment_draft_detail_id );

CREATE TABLE talent ( 
	id                   SERIAL PRIMARY KEY,
	talent_category_id   int  NOT NULL    ,
	name                 varchar(100)      ,
	image                varchar(255)      ,
	note                 varchar(600)      ,
	deleted_at           date      ,
	CONSTRAINT fk_talent_talent_category FOREIGN KEY ( talent_category_id ) REFERENCES talent_category( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_talent_talent_category ON talent ( talent_category_id );

CREATE TABLE talent_goal ( 
	id                   SERIAL PRIMARY KEY,
	talent_id            int  NOT NULL    ,
	section_id           int  NOT NULL    ,
	talent_goal          varchar(255)      ,
	deleted_at           date      ,
	CONSTRAINT fk_talent_goal_section FOREIGN KEY ( section_id ) REFERENCES section( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_talent_goal_talent FOREIGN KEY ( talent_id ) REFERENCES talent( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_talent_goal_section ON talent_goal ( section_id );

CREATE INDEX fk_talent_goal_talent ON talent_goal ( talent_id );

CREATE TABLE action_plan ( 
	id                   SERIAL PRIMARY KEY,
	detail_activity_plan_id int      ,
	participants         varchar(255)      ,
	topic                text      ,
	place                varchar(200)      ,
	stage                text      ,
	rules                text      ,
	duration             int      ,
	deleted_at           date      ,
	activity_field_id    int      ,
	activity_field_section_id int      ,
	other_goals          text      ,
	CONSTRAINT fk_action_plan_activity_field FOREIGN KEY ( activity_field_id ) REFERENCES activity_field( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_action_plan_activity_field_section FOREIGN KEY ( detail_activity_plan_id ) REFERENCES activity_field_section( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_action_plan_detail_activity_plan FOREIGN KEY ( detail_activity_plan_id ) REFERENCES detail_activity_plan( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_action_plan_activity_field ON action_plan ( activity_field_id );

CREATE INDEX fk_action_plan_detail_activity_plan ON action_plan ( detail_activity_plan_id );

CREATE TABLE action_plan_goal ( 
	id                   SERIAL PRIMARY KEY,
	action_plan_id       int  NOT NULL    ,
	education_goal_id    int  NOT NULL    ,
	deleted_at           date      ,
	CONSTRAINT fk_action_plan_goal_action_plan FOREIGN KEY ( action_plan_id ) REFERENCES action_plan( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_action_plan_goal_education_goal FOREIGN KEY ( education_goal_id ) REFERENCES education_goal( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_action_plan_goal_action_plan ON action_plan_goal ( action_plan_id );

CREATE INDEX fk_action_plan_goal_education_goal ON action_plan_goal ( education_goal_id );

CREATE TABLE action_plan_talent_goal ( 
	id                   SERIAL PRIMARY KEY,
	action_plan_id       int  NOT NULL    ,
	talent_goal_id       int  NOT NULL    ,
	deleted_at           date      ,
	CONSTRAINT fk_action_plan_talent_goal_action_plan FOREIGN KEY ( action_plan_id ) REFERENCES action_plan( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_action_plan_talent_goal_talent_goal FOREIGN KEY ( talent_goal_id ) REFERENCES talent_goal( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_action_plan_talent_goal_action_plan ON action_plan_talent_goal ( action_plan_id );

CREATE INDEX fk_action_plan_talent_goal_talent_goal ON action_plan_talent_goal ( talent_goal_id );

CREATE TABLE activity_attendance ( 
	id                   SERIAL PRIMARY KEY,
	member_id            int  NOT NULL    ,
	action_plan_id       int  NOT NULL    ,
	note                 varchar(600)      ,
	deleted_at           date      ,
	CONSTRAINT fk_activity_attendance_action_plan FOREIGN KEY ( action_plan_id ) REFERENCES action_plan( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_activity_attendance_member FOREIGN KEY ( member_id ) REFERENCES member( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_activity_attendance_action_plan ON activity_attendance ( action_plan_id );

CREATE INDEX fk_activity_attendance_member ON activity_attendance ( member_id );

CREATE TABLE activity_process ( 
	id                   SERIAL PRIMARY KEY,
	process_type_id      int  NOT NULL    ,
	action_plan_id       int  NOT NULL    ,
	duration             int      ,
	deleted_at           date      ,
	note                 varchar(600)      ,
	CONSTRAINT fk_activity_process_action_plan FOREIGN KEY ( action_plan_id ) REFERENCES action_plan( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_activity_process_process_type FOREIGN KEY ( process_type_id ) REFERENCES process_type( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_activity_process_action_plan ON activity_process ( action_plan_id );

CREATE INDEX fk_activity_process_process_type ON activity_process ( process_type_id );

CREATE TABLE activity_process_detail ( 
	id                   SERIAL PRIMARY KEY,
	activity_process_id  int  NOT NULL    ,
	process              text      ,
	deleted_at           date      ,
	CONSTRAINT fk_activity_process_detail_activity_process FOREIGN KEY ( activity_process_id ) REFERENCES activity_process( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_activity_process_detail_activity_process ON activity_process_detail ( activity_process_id );

CREATE TABLE detail_activity_plan_goal ( 
	id                   SERIAL PRIMARY KEY,
	detail_activity_plan_id int  NOT NULL    ,
	education_goal_id    int  NOT NULL    ,
	CONSTRAINT fk_detail_activity_plan_goal_detail_activity_plan FOREIGN KEY ( detail_activity_plan_id ) REFERENCES detail_activity_plan( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_detail_activity_plan_goal_education_goal FOREIGN KEY ( education_goal_id ) REFERENCES education_goal( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_detail_activity_plan_goal_detail_activity_plan ON detail_activity_plan_goal ( detail_activity_plan_id );

CREATE INDEX fk_detail_activity_plan_goal_education_goal ON detail_activity_plan_goal ( education_goal_id );

CREATE TABLE detail_activity_plan_talent_goal ( 
	id                   SERIAL PRIMARY KEY,
	detail_activity_plan_id int  NOT NULL    ,
	talent_goal_id       int  NOT NULL    ,
	CONSTRAINT fk_detail_activity_plan_talent_goal_detail_activity_plan FOREIGN KEY ( detail_activity_plan_id ) REFERENCES detail_activity_plan( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_detail_activity_plan_talent_goal_talent_goal FOREIGN KEY ( talent_goal_id ) REFERENCES talent_goal( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_detail_activity_plan_talent_goal_detail_activity_plan ON detail_activity_plan_talent_goal ( detail_activity_plan_id );

CREATE INDEX fk_detail_activity_plan_talent_goal_talent_goal ON detail_activity_plan_talent_goal ( talent_goal_id );

CREATE TABLE payment ( 
	id                   SERIAL PRIMARY KEY,
	"date"               date      ,
	deleted_at           date      ,
	note                 text      ,
	payment_draft_id     int  NOT NULL    ,
	CONSTRAINT fk_payment_payment_draft FOREIGN KEY ( payment_draft_id ) REFERENCES payment_draft( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX unq_payment_payment_draft_id ON payment ( payment_draft_id );

CREATE TABLE payment_detail ( 
	id                   SERIAL PRIMARY KEY,
	payment_id           int  NOT NULL    ,
	member_id            int  NOT NULL    ,
	deleted_at           date      ,
	payment_draft_detail_id int  NOT NULL    ,
	CONSTRAINT fk_payment_detail_payment FOREIGN KEY ( payment_id ) REFERENCES payment( id ) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_payment_detail_member FOREIGN KEY ( member_id ) REFERENCES member( id ) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_payment_detail_payment_draft_detail FOREIGN KEY ( payment_draft_detail_id ) REFERENCES payment_draft_detail( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_payment_detail_member_activity ON payment_detail ( member_id );

CREATE INDEX fk_payment_detail_payment ON payment_detail ( payment_id );

CREATE INDEX fk_payment_detail_payment_draft_detail ON payment_detail ( payment_draft_detail_id );

CREATE TABLE member_card ( 
	id                   SERIAL PRIMARY KEY,
	payment_detail_id    int  NOT NULL    ,
	note                 varchar(600)      ,
	deleted_at           date      ,
	CONSTRAINT fk_member_card_payment_detail FOREIGN KEY ( payment_detail_id ) REFERENCES payment_detail( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE INDEX fk_member_card_payment_detail ON member_card ( payment_detail_id );

CREATE TABLE project_target ( 
	id                   SERIAL PRIMARY KEY,
	name                 varchar(100)      ,
	other                boolean   DEFAULT false   ,
	deleted_at           date      
 );

CREATE TABLE project ( 
	id                   SERIAL PRIMARY KEY,
	title                varchar(255)      ,
	summary              text      ,
	target_name          varchar(255)      ,
	responsible_name     varchar(255)      ,
	responsible_contact  varchar(100)      ,
	responsible_mail     varchar(255)      ,
	project_target_id    int  NOT NULL    ,
	context              text      ,
	problematics         text      ,
	group_profit         text      ,
	others_profit        text      ,
	direct_benefactor    int      ,
	indirect_benefactor  int      ,
	scout_benefactor     int      ,
	non_scout_benefactor int      ,
	durability_plan      text      ,
	total_finances       decimal(10,0)      ,
	start_date           date      ,
	end_date             date      ,
	responsible_number   int      ,
	participants_number  int      ,
	other_participants_number int      ,
	deleted_at           date      
 );

CREATE INDEX fk_project_project_target ON project ( project_target_id );

ALTER TABLE project ALTER COLUMN summary TYPE text     ;

ALTER TABLE project ALTER COLUMN target_name TYPE varchar(255)     'ny fileovana/fokonolona/fivondronana';

ALTER TABLE project ALTER COLUMN responsible_name TYPE varchar(255)     'andraikitra voalohany';

ALTER TABLE project ALTER COLUMN project_target_id TYPE integer;

-- Make the column NOT NULL
ALTER TABLE project ALTER COLUMN project_target_id SET NOT NULL;

ALTER TABLE project ALTER COLUMN context TYPE text     ;

ALTER TABLE project ALTER COLUMN problematics TYPE text     ;

CREATE TABLE project_activity ( 
	id                   SERIAL PRIMARY KEY,
	project_id           int  NOT NULL    ,
	name                 varchar(255)      ,
	detail               text      ,
	deleted_at           date      
 );

CREATE INDEX fk_project_activity_project ON project_activity ( project_id );

CREATE TABLE project_goal ( 
	id                   SERIAL PRIMARY KEY,
	name                 varchar(255)      ,
	project_id           int  NOT NULL    ,
	deleted_at           date      
 );

CREATE INDEX fk_project_goal_project ON project_goal ( project_id );

CREATE TABLE project_manager ( 
	id                   SERIAL PRIMARY KEY,
	project_id           int  NOT NULL    ,
	name                 varchar(255)      ,
	role                 varchar(255)      ,
	activity             varchar(255)      ,
	member_id            int      ,
	deleted_at           date      
 );

CREATE INDEX fk_project_manager_member ON project_manager ( member_id );

CREATE INDEX fk_project_manager_project ON project_manager ( project_id );

CREATE TABLE project_partner ( 
	id                   SERIAL PRIMARY KEY,
	name                 varchar(255)      ,
	partnership_purpose  text      ,
	project_id           int  NOT NULL    ,
	deleted_at           date      
 );

CREATE INDEX fk_project_partner_project ON project_partner ( project_id );

CREATE TABLE project_result ( 
	id                   SERIAL PRIMARY KEY,
	name                 varchar(255)      ,
	project_id           int  NOT NULL    ,
	deleted_at           date      
 );

CREATE INDEX fk_project_result_project ON project_result ( project_id );

CREATE TABLE project_tool ( 
	id                   SERIAL PRIMARY KEY,
	project_activity_id  int  NOT NULL    ,
	name                 varchar(255)      ,
	amount               decimal(10,0)      ,
	deleted_at           date      
 );

CREATE INDEX fk_project_tool_project_activity ON project_tool ( project_activity_id );

ALTER TABLE project ADD CONSTRAINT fk_project_project_target FOREIGN KEY ( project_target_id ) REFERENCES project_target( id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE project_activity ADD CONSTRAINT fk_project_activity_project FOREIGN KEY ( project_id ) REFERENCES project( id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE project_goal ADD CONSTRAINT fk_project_goal_project FOREIGN KEY ( project_id ) REFERENCES project( id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE project_manager ADD CONSTRAINT fk_project_manager_project FOREIGN KEY ( project_id ) REFERENCES project( id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE project_partner ADD CONSTRAINT fk_project_partner_project FOREIGN KEY ( project_id ) REFERENCES project( id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE project_result ADD CONSTRAINT fk_project_result_project FOREIGN KEY ( project_id ) REFERENCES project( id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE project_tool ADD CONSTRAINT fk_project_tool_project_activity FOREIGN KEY ( project_activity_id ) REFERENCES project_activity( id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE TABLE project_user (
	id 					SERIAL PRIMARY KEY,
	name 				varchar(255)	,
	mail 				varchar(255)	,
	phone_number 		varchar(255)	,
	password 			varchar(255)	,
	member_id 			int	,
	deleted_at 			date
);

 ALTER TABLE membership_fee ADD section_id int ;

 ALTER TABLE membership_fee ADD CONSTRAINT fk_membership_fee_section FOREIGN KEY ( section_id ) REFERENCES section( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

 ALTER TABLE payment_draft_detail ADD section_id int ;

 ALTER TABLE payment_draft_detail ADD CONSTRAINT fk_payment_draft_detail FOREIGN KEY ( section_id ) REFERENCES section( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

 ALTER TABLE payment_draft_detail ADD sacrement text ;

 ALTER TABLE payment_draft_detail ADD number_card varchar(250) ;

 ALTER TABLE payment_draft_detail ADD step varchar(250) ;

 ALTER TABLE payment_draft_detail DROP COLUMN training_two;

 ALTER TABLE payment_draft_detail DROP COLUMN training_three;

 ALTER TABLE payment_draft_detail DROP COLUMN training_four;

 ALTER TABLE payment_draft_detail DROP COLUMN training_five;

-- Step 1: Rename the column
ALTER TABLE payment_draft_detail RENAME COLUMN training_one TO training;

-- Step 2: Change the column type and set it to NULLABLE
ALTER TABLE payment_draft_detail ALTER COLUMN training TYPE text;
ALTER TABLE payment_draft_detail ALTER COLUMN training DROP NOT NULL;


ALTER TABLE payment_draft_detail_activity_field ADD column deleted_at date;


CREATE INDEX fk_project_user_member ON project_user ( member_id );

ALTER TABLE project_user ADD CONSTRAINT fk_project_user_member FOREIGN KEY ( member_id ) REFERENCES member( id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE project ADD COLUMN project_user_id INT;

CREATE INDEX fk_project_project_user ON project ( project_user_id );

ALTER TABLE project ADD CONSTRAINT fk_project_project_user FOREIGN KEY ( project_user_id ) REFERENCES project_user( id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE detail_activity_plan_goal ADD column deleted_at date;

ALTER TABLE detail_activity_plan_talent_goal ADD column deleted_at date;

-- update script 20/09
create table member_transfer_request(
	id SERIAL PRIMARY KEY ,
	member_id int,
	activity_field_id int,
	activity_year_id int,
	member_role_id int,
	section_id int,
	"level" varchar(10),
	status int,
	note text,
	deleted_at date,
	FOREIGN KEY (member_id) REFERENCES member(id),
	FOREIGN KEY (section_id) REFERENCES section (id),
	FOREIGN KEY (member_role_id) REFERENCES member_role(id),
	FOREIGN KEY (activity_year_id) REFERENCES activity_year(id),
	FOREIGN KEY (activity_field_id) REFERENCES activity_field(id)
);

-- 26/09/2022 update
CREATE TABLE project_image (
	id 					SERIAL PRIMARY KEY,
	name 				varchar(255)	,
	deleted_at 			date,
	project_id          int  NOT NULL
);

CREATE INDEX fk_project_image_project ON project_image ( project_id );

ALTER TABLE project_image ADD CONSTRAINT fk_project_image_project FOREIGN KEY ( project_id ) REFERENCES project( id ) ON DELETE RESTRICT ON UPDATE RESTRICT;


CREATE TABLE youth_talent ( 
	id                   SERIAL PRIMARY KEY,
	youth_info_id        int  NOT NULL    ,
	talent_id            int  NOT NULL    ,
	"date"               date      ,
	deleted_at           date      
 ) ;

ALTER TABLE youth_talent ADD CONSTRAINT fk_youth_talent_youth_info FOREIGN KEY ( youth_info_id ) REFERENCES youth_info( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE youth_talent ADD CONSTRAINT fk_youth_talent_talent FOREIGN KEY ( talent_id ) REFERENCES talent( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- end update

-- 04/10/2022 update
alter table project ADD COLUMN "status" int NOT NULL;

alter table payment_draft_detail ADD COLUMN "note" text;

-- update 27/09/2022
ALTER TABLE project ADD COLUMN responsible_facebook varchar(255);

ALTER TABLE action_plan ADD COLUMN title varchar(255);
ALTER TABLE action_plan ADD COLUMN date date;
ALTER TABLE action_plan ADD COLUMN tools text;

ALTER TABLE action_plan ADD COLUMN status int;

-- update 17/04/2023

ALTER TABLE payment_draft_detail ADD COLUMN "address" varchar(255);

ALTER TABLE member_role ADD COLUMN "hierarchy_id" int;

ALTER TABLE member_role ADD CONSTRAINT fk_member_role_hierarchy FOREIGN KEY ( hierarchy_id ) REFERENCES hierarchy( id ) ON DELETE RESTRICT ON UPDATE RESTRICT

-- update 05/05/2023

ALTER TABLE "user" ADD COLUMN errorCount INT DEFAULT 0;

ALTER TABLE "user" ADD COLUMN contact varchar(20);

-- update 08/05/2023

ALTER TABLE "user" ADD COLUMN generatedCode varchar(6);

ALTER TABLE "user" ADD COLUMN generatedLink varchar(255);

-- update 08/06/2023 xxxxx

ALTER TABLE "user" ADD COLUMN accountType INT DEFAULT 0;

ALTER TABLE "user" ADD COLUMN activity_field_id INT;

ALTER TABLE "user" ADD CONSTRAINT fk_user_activity_field FOREIGN KEY ( activity_field_id ) REFERENCES activity_field( id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- update 20/07/2023

ALTER TABLE payment_draft_detail ADD COLUMN activity_field_id INT NOT NULL;

ALTER TABLE payment_draft_detail ADD CONSTRAINT fk_payment_draft_detail_activity_field FOREIGN KEY ( activity_field_id ) REFERENCES activity_field( id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- update 21/07/2023

ALTER TABLE "user" DROP FOREIGN KEY fk_user_member;

ALTER TABLE "user" DROP COLUMN member_id;

--ALTER TABLE "user" DROP COLUMN errorCount;


-- hierarchy_id		int,
-- 	CONSTRAINT fk_member_role_hierarchy FOREIGN KEY ( hierarchy_id ) REFERENCES hierarchy( id ) ON DELETE RESTRICT ON UPDATE RESTRICT

-- insertion
-- activity_year
insert into activity_year (start_year,end_year,note,deleted_at) values( 2021,2022,null,null);
insert into activity_year (start_year,end_year,note,deleted_at) values( 2020,2021,null,null);
insert into activity_year (start_year,end_year,note,deleted_at) values( 2022,2023,null,null);
insert into activity_year (start_year,end_year,note,deleted_at) values( 2019,2020,null,null);
insert into activity_year (start_year,end_year,note,deleted_at) values( 2018,2019,null,null);
insert into activity_year (start_year,end_year,note,deleted_at) values( 2017,2018,null,null);
insert into activity_year (start_year,end_year,note,deleted_at) values( 2016,2017,null,null);

-- hierarchy
insert into hierarchy (name,note,deleted_at,level) values ('Nasionaly',null,null,'1');
insert into hierarchy (name,note,deleted_at,level) values ('Diosezy',null,null,'2');
insert into hierarchy (name,note,deleted_at,level) values ('Faritra',null,null,'3');
insert into hierarchy (name,note,deleted_at,level) values ('Fivondronana',null,null,'4');

-- section
-- Section Lovitao
INSERT INTO section (name, code, color, min_age, max_age, section_name, group_name, motto, activity_name, outfit_color, council, patron_saint, base, engagement, deleted_at) 
VALUES (
  'Lovitao', 
  'LVT', 
  'Mavo', 
  6, 
  10, 
  'Andia', 
  'Enina', 
  'Izay tratry ny aina no atao', 
  'Haza', 
  'Bleu ciel, bleu marine', 
  'Vato fihaonana', 
  'St Francois d''Assise',  -- Apostrophe échappée
  'Base LVT', 
  'Fanomezan-toky', 
  null
);

-- Section Mpianjoria
INSERT INTO section (name, code, color, min_age, max_age, section_name, group_name, motto, activity_name, outfit_color, council, patron_saint, base, engagement, deleted_at) 
VALUES (
  'Mpianjoria', 
  'MPJ', 
  'Manga', 
  11, 
  15, 
  'Antoko', 
  'Sokajy', 
  'Antili MPJ na mora na mafy ny dia vonona fo MPJ', 
  'Anjoria', 
  'Kaki', 
  'Tafasiry', 
  'St Georges Don Bosco', 
  'Base MPJ', 
  'Fanekena', 
  null
);

-- Section Mpamakilay
INSERT INTO section (name, code, color, min_age, max_age, section_name, group_name, motto, activity_name, outfit_color, council, patron_saint, base, engagement, deleted_at) 
VALUES (
  'Mpamakilay', 
  'MPK', 
  'Maitso', 
  16, 
  18, 
  'Rodona', 
  'Tarika', 
  'Dinan''ny MPK vonona mandrakizay',  -- Apostrophe échappée
  'Vakilay', 
  'Kaki, bleu marine', 
  'Donkafo', 
  'St Jean-Baptiste', 
  'Base MPK', 
  'Famehezan-tena', 
  null
);

-- Section Mpiandalana
INSERT INTO section (name, code, color, min_age, max_age, section_name, group_name, motto, activity_name, outfit_color, council, patron_saint, base, engagement, deleted_at) 
VALUES (
  'Mpiandalana', 
  'MPD', 
  'Mena', 
  18, 
  25, 
  'Fileovana', 
  'Fokonolona', 
  'Andry iankinana vonona tsara MPD mifampizara', 
  'Vady bainga', 
  'Kaki, marron', 
  'Dinika', 
  'Mpaminany Moizy', 
  'Base MPD', 
  'Velirano', 
  null
);

-- section step

insert into section_steps ( section_id, level, name, deleted_at) values ( 1, '', 'Miana-mandady', null);
insert into section_steps ( section_id, level, name, deleted_at) values ( 1, '', 'Vaky Maso Tokana', null);
insert into section_steps ( section_id, level, name, deleted_at) values ( 1, '', 'Vaky Maso Roa', null);
insert into section_steps ( section_id, level, name, deleted_at) values ( 2, '', 'Mpiomana', null);
insert into section_steps ( section_id, level, name, deleted_at) values ( 2, '', 'Mpikatroka', null);
insert into section_steps ( section_id, level, name, deleted_at) values ( 2, '', 'Menavazana', null);
insert into section_steps ( section_id, level, name, deleted_at) values ( 3, '', 'Mpamakilay', null);
insert into section_steps ( section_id, level, name, deleted_at) values ( 4, '', 'Mpiana-dalana', null);
insert into section_steps ( section_id, level, name, deleted_at) values ( 4, '', 'Mpiray lalana', null);
insert into section_steps ( section_id, level, name, deleted_at) values ( 4, '', 'Mpiandalana', null);

-- activity_field
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('I','Madagasikara',null,'Madagasikara',null,1,null);

insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('II','Antananarivo',1,'Antananarivo','diosezy',2,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('III','Toamasina',1,'Toamasina','diosezy',2,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('IV','Moramanga', 1,'Moramanga','diosezy',2,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('V','Toliara',1,'Toliara','diosezy',2,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('VI','Miarinarivo',1,'Miarinarivo','diosezy',2,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('VII','Ihosy',1,'Ihosy','diosezy',2,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('VIII','Mahajanga',1,'Mahajanga','diosezy',2,null);

insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('IX','Analamanga',2,'Analamanga','faritra',3,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('X','Atsimon-drano',2,'Atsimon-drano','faritra',3,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('XI','Avaradrano',2,'Avaradrano','faritra',3,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('XII','Toamasina I',3,'Toamasina I','faritra',3,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('XIII','Toamasina II',3,'Toamasina II','faritra',3,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('XIV','Toamasina III',3,'Toamasina III','faritra',3,null);

insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('XV','St Michel',9,'Amparibe','Fianarana',4,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('XVI','St Joseph',9,'Mahamasina','Fiangonana',4,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('XVII','Providence',9,'Amparibe','Fianarana',4,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('XVIII','EKAR Ambohimamory',9,'Ambohimamory','Fiangonana',4,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('XIX','St Michel Itaosy',9,'Itaosy','Fianarana',4,null);

insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('XX','Tanjombato',2,'Tanjombato','faritra',3,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('XXI','Manjakandriana',2,'Manjakandriana','faritra',3,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('XXII','Ambohitrimanjaka',2,'Ambohitrimanjaka','faritra',3,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('XXIII','Imerinafovoany',2,'Imerinafovoany','faritra',3,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('XXIV','Namehana',2,'Namehana','faritra',3,null);
insert into activity_field (number,name,superior_field,place,entity,hierarchy_id,deleted_at) values('XXV','Itaosy',2,'Itaosy','faritra',3,null);
 
-- fee_type
insert into fee_type (name,note,deleted_at,activity_field_id) values('Cotisation',null,null,null);
-- insert into fee_type values('Fitsangatsanganana',null,null,18);

-- payment_type
insert into payment_type (name,note,deleted_at) values('Espèce',null,null);
insert into payment_type (name,note,deleted_at) values('MVola',null,null);
insert into payment_type (name,note,deleted_at) values('Orange Money',null,null);
insert into payment_type (name,note,deleted_at) values('Airtle Money',null,null);

-- project_target
--insert into project_target (name,other,deleted_at) values ( 'Fokontany', 0, null);
--insert into project_target (name,other,deleted_at) values ( 'Commune', 0, null);
--insert into project_target (name,other,deleted_at) values ( 'Distrika', 0, null);
--insert into project_target (name,other,deleted_at) values ( 'Faritra', 0, null);
--insert into project_target (name,other,deleted_at) values ( 'Firenena', 0, null);

-- project_target
INSERT INTO project_target (name, other, deleted_at) VALUES ('Fokontany', false, null);
INSERT INTO project_target (name, other, deleted_at) VALUES ('Commune', false, null);
INSERT INTO project_target (name, other, deleted_at) VALUES ('Distrika', false, null);
INSERT INTO project_target (name, other, deleted_at) VALUES ('Faritra', false, null);
INSERT INTO project_target (name, other, deleted_at) VALUES ('Firenena', false, null);

-- member
-- insert into member values('RANDRIA','Misaina','0346712345','2000-06-09','Hopital Befelatanana','Amparibe LOT 34 VX','Chapelle St Michel','2010-09-09','2010-12-12',null,null,'katolika',null);

insert into member_role (name, hierarchy_id, level, note) values('Beazina', 4, 1, '');
insert into member_role (name, hierarchy_id, level, note) values('Mpiandraikitra', 4, 1, '');
insert into member_role (name, hierarchy_id, level, note) values('Tonia', 4, 1, '');
insert into member_role (name, hierarchy_id, level, note) values('AIMO', 4, 1, '');
insert into member_role (name, hierarchy_id, level, note) values('Filoha (Faritra)', 3, 2, '');
insert into member_role (name, hierarchy_id, level, note) values('ZAP/RAP (Faritra)', 3, 2, '');
insert into member_role (name, hierarchy_id, level, note) values('Filoha (Diosezy)', 2, 3, '');	
insert into member_role (name, hierarchy_id, level, note) values('ZAP/RAP (Diosezy)', 2, 3, '');
insert into member_role (name, hierarchy_id, level, note) values('Antily zokiny', 2, 3, '');
insert into member_role (name, hierarchy_id, level, note) values('SAIM', 2, 3, '');
insert into member_role (name, hierarchy_id, level, note) values('CONAT', 1, 4, '');
insert into member_role (name, hierarchy_id, level, note) values('Foibe (Ekipa Nasionaly, RAPI)', 1, 4, '');



-- process type

insert into process_type ( name, note, deleted_at) values ( 'Mialoha', '', null); 
insert into process_type ( name, note, deleted_at) values ( 'Mandritra', '', null); 
insert into process_type ( name, note, deleted_at) values ( 'Aorina', '', null);


insert into education_field ( name, note, deleted_at) values ( 'Saina', '', null);
insert into education_field ( name, note, deleted_at) values ( 'Toetra', '', null);
insert into education_field ( name, note, deleted_at) values ( 'Fifandraisana amin''ny hafa', '', null);
insert into education_field ( name, note, deleted_at) values ( 'Fo', '', null);
insert into education_field ( name, note, deleted_at) values ( 'Fanahy', '', null);
insert into education_field ( name, note, deleted_at) values ( 'Vatana', '', null);

insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Tsy mihambatra fa mavitrika tsara rehefa manao hiaka rodobe na famoriana', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahay mitondra hafatra', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahay mampiditra kofehy amin''ny fanjaitra sy manao vikavika', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahay mamatotra folara, kiraro, manao vona tsotra sy ganse ary baraingo (tête d''alouette)', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahafantatra ny toerana lehibe ao an-tanana', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahafantatra ny trano fonenany', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahalala ny lafin-tany efatra', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahalala ny fiposahan''ny masoandro sy ny filentehany', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahalala tsongo dia 5', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahay Arahaba lovitao', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahay Baikon''ny lovitao', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahay Fanomezan-toky lovitao', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahay Lalàna sy fitsipiky ny lovitao', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahalala ny anaran''ny ray aman-dreny', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahalala ny adiresin''ny ray aman-dreny sy ny faritra fonenana', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahafantatra ny tantaran''i Mowgli (Fizarana 1 – 2)', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahay ny « Izahay no lovitao » sy ny « Manodidina izahay »', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahay ny hiram-pirenena andininy telo', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahay tarehi-marika romanina (1 ka hatramin''ny 10)', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 1, 'Mahay ny anaran''ny Filoham-pirenena Malagasy', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 2, 'Mahalala fomba', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 2, 'Tonga ara-potoana lalandava', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 2, 'Tsy tapaka amin''ny fihetsiketsehana rehetra', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 2, 'Madio fiteny, firesaka', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 2, 'Miezaka manao asa soa momba ny tenany irery', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 2, 'Manao fanamiana mijijy', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 2, 'Mijoro mifanatrika ary mahay mitonona sy mahafantatra ny anarany, ny taonany', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 2, 'Mahatadidy ny daty nahaterahana', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 3, 'Miezaka manao asa soa isan''andro', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 3, 'Mahalala ny anaran''ny Rektora sy ny RAP (na ZAP) ary ireo mpanabe ao amin''ny kolejy (Directrice, Préfète)', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 4, 'Mahay maneho ny heviny eo amin''ny vato fihaonana', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 5, 'Mahay Vavaky ny lovitao', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 5, 'Mahay ny Rainay, Arahaba ry Maria, Voninahitra, Fanenenana', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 5, 'Mahay ny vavaka fohy fanao aloha sy aorinan''ny sakafo, alohan''ny hatory sy rehefa mifoha', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 5, 'Mahafantatra ny fizaran''ny lamesa', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 5, 'Famantarana ny Hazo fijaliana, ny heviny, fotoana fanaovana azy', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 5, 'Mahay ny tantaran''i Md François d''Assise amin''ny ambangovangony', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 6, 'Midio mandrakariva amin''ny savony', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 6, 'Mitandrina mandrakariva ny fahadiovana amin''ny toerana rehetra aleha ', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 1, 6, 'Mahavita dia tongotra 5 km', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 1, 'Mitsidika trano fanaovana tao-zavatra na toerana manan-tantara iray', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 1, 'Mahavita asa-tanana maro', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 1, 'Mahay manjaitra ny rovitra sy manaraka sary', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 1, 'Mahay ny tsongo dia rehetra ka manara-dalana mitondra ny enina', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 1, 'Mahay semaforo P...Z', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 1, 'Mahay ny fampiasana ireo vona lovitao : tisserand, cabestan.', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 1, 'Mahay mamantatra morsa, indrindra ny tandremo ka mampangina ny enina misy azy', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 1, 'Mahay mampianatra hira sy manentana', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 1, 'Mahalala vola', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 1, 'Mahatadidy ny daty nahaterahany sy ny taonan''ny ray aman-dreny (daty, volana, taona) sy ny laharana an-tarobian''ny ray aman-dreny', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 1, 'Mahay ny hiran''ny velirano', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 1, 'Mahafantatra ny tantaran''i Mowgli hatramin''ny farany ka afaka mitantara amin''ny enina', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 1, 'Mahay ny anarany sy ny toeran''ny marika fampiasan''ny lovitao', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 1, 'Mahay manao ny sarin''i Madagasikara ka mampiseho ireo faritra 6, 22 régions, fiteny, foko, renirano', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 2, 'Mikajy ny asa rehetra ataony', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 2, 'Mitarika asa soa iarahan''ny enina mamolavola mialoha tamin''ny mpiandraikitra', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 2, 'Manara-baovao (actualités)', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 3, 'Mitarika ny namana hanao asa soa', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 3, 'Mitarika ny namana hanao ny tsara hatrany', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 3, 'Manampy ny namany raha tojo fahasahiranana amin''izay atao rehetra', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 3, 'Manampy ny vaovao amin''ny fanomezan-toky', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 4, 'Mampianatra lovetisma amin''ny enina', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 5, 'Mahay manao vavaka tora-po', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 5, 'Mahay ny didin''ny Eglizy', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 5, 'Mahafantatra ny Eveka eo amin''ny faritany misy azy', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 5, 'Mahafantatra ny Apostoly 12, ny isan''ny Avanjely', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 5, 'Mahafantatra ny anaran''ny Papa Ray masina', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 5, 'Mahay ny vavaky ny antily', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 5, 'Mikaofesy matetika ary manazava ny antony', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 5, 'Manampy ny cheftaine mampita ny tantaran''i Md Françios d''Assise amin''ny andia.', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 5, 'Mianatra Sakramentan''ny Eokaristia', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 6, 'Mahalala ny didy folon''ny fahasalamana', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 6, 'Mahay mampilaza ny mpiandraikitra raha misy voina na loza', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 6, 'Mahalala raokandro', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 6, 'Mahay manazava eo imason''ny andia, ny ankizy hafa mitovy taona amin''ny tena, ny asan''ny rivotra, masoandro, torimaso, sakafo, ', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 6, 'Milofo amin''ny fanatanjahan-tena iray (talenta)', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 3, 6, 'Mahay manomana sy mampiasa trousse de secours sy afaka mampiseho ny vonjy aina tsotra', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahafantatra ny kojakoja entina rehefa milasy', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay manara-dalana mitondra ny enina', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay manjaitra bokotra sy manao vikavika ary nœud de couture', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay manao sary', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay ny tsongo dia rehetra ka manara-dalana mitondra ny enina', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mianatra asa-tanana irery hiarahana midinika amin''ny mpiandraikitra', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay semaforo A...O', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay vona : mpanjono (pêcheur), fisaka (plat), omby, en huit, capucin', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay mihira irery', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay mampilalao ny enina', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mikolokolo sy mampirina ny fitaovam-pianarana, fitafiana, fitaovana any an-trano', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay mamantatra morsa, indrindra ny tandremo ka mampangina ny tenany', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay ny atsimo sy ny avaratra eo amin''ny toerana misy azy', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahalala ny sainam-pirenena sy ny tantarany ary afaka manazava Mahalala ny sainam-pirenena sy ny tantarany ary afaka manazava', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahalala daty malaza vitsivitsy momba ny firenena', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay ny fahalalam-pomba malagasy ', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahalala ny fizaran-taona malagasy', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay ny sidiky ny Antily', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay ny anaran''ny olona namorona ny skotisma sy ny lovitisma', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay ny rafitra tsotsotra ao amin''ny fikambanana', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay tantara Atiala (Fizarana 3 – 4)', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay mampiasa famataran''andro', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay ny faritany 6', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahafantatra ny mpitondra nifadimby ', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay ny laharan''ny fivondronana, sy ny anaran''ny Tonia', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahafantatra morsa ', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 1, 'Mahay manangana zoro any an-dasy', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 2, 'Mitsiky lalandava na misy zavatra mahasosotra aza', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 2, 'Manao raharaha ary mahavita ny baiko omena azy mandrakariva', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 2, 'Milaza ny antony tsy nivoriana tamin''ny farany ary miera raha tsy ho afaka amin''ny manaraka', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 2, 'Mihezaka miaina ireo lalana sy fitsipika ary baiko', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 3, 'Mahay mizara', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 3, 'Manara-maso sy manitsy ny fanamian''ny namana', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 3, 'Manampy ny namany mampirina ny entany any an-dasy', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 3, 'Mandray anjara amin''ny raharaha ao an-trano', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 3, 'Mahay mifanerasera amin''ny hafa', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 5, 'Manaraka ny fanabeazam-panahy', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 5, 'Mahay miservy lamesa', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 5, 'Mitarika vavaka any am-pivoriana sy any an-dasy', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 5, 'Mahalala ny fotoanan''ny fankamasinana amin''ny Sorona Masina', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 5, 'Mahalala ny antony hamangiana ny Sakramenta Masina', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 5, 'Mahay ny tantaran''i Md François d''Assise feno', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 6, 'Manao fanatanjahan-tena isa-maraina', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 6, 'Mahay manadio ny faritra itobiana', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 6, 'Mahalala fanafody fanefitry ny tazo, aretin''andoha, sery, kohaka', null);
insert into education_goal ( section_steps_id, education_field_id, education_goal, deleted_at) values ( 2, 6, 'Mahalala raokandro 5 fitsabona', null);

insert into talent_category ( name, color, deleted_at) values ( 'Loko manga', 'Manga', null);
insert into talent_category ( name, color, deleted_at) values ( 'Loko mena', 'Mena', null);
insert into talent_category ( name, color, deleted_at) values ( 'Loko mavo', 'Mavo', null);
insert into talent_category ( name, color, deleted_at) values ( 'Loko maitso', 'Maitso', null);
insert into talent_category ( name, color, deleted_at) values ( 'Loko fotsy', 'Fotsy', null);

insert into talent (talent_category_id, name, image, note, deleted_at) values ( 1, 'Mpitahiry', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 1, 'Mpandinika', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 1, 'Mpampita hafatra', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 1, 'Mpitahiry', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 1, 'Mpanao hatsikana', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 1, 'Tia mozika', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 1, 'Mpitan-tsoratra', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 2, 'Mpitari-dalana', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 2, 'Mpitondra hafatra', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 2, 'Asa an-trano', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 2, 'Mpamonjy voina', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 3, 'Asa tanana', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 3, 'Mpandrafitra', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 3, 'Mpanjaitra', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 3, 'Mpandrary', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 3, 'Manao zaridaina', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 3, 'Sakaizan''ny biby', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 4, 'Mpilomano', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 4, 'Fanatanjahan-tena', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 4, 'Mahay milalao', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 4, 'Mahay milasy', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 4, 'Mpitaingina Bisikileta', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 5, 'Mianatra katesizy', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 5, 'Mahay Evanjely', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 5, 'Mpiservy lamesa', '', '', null);
insert into talent (talent_category_id, name, image, note, deleted_at) values ( 5, 'Mpanao litorjia', '', '', null);

-- insert into activity_field_section (id, activity_field_id, section_id, deleted_at) values ( 15, 1, null);
-- insert into activity_field_section (id, activity_field_id, section_id, deleted_at) values ( 15, 2, null);
-- insert into activity_field_section (id, activity_field_id, section_id, deleted_at) values ( 15, 3, null);
-- insert into activity_field_section (id, activity_field_id, section_id, deleted_at) values ( 15, 4, null);

insert into sacrement (name) values ('Batemy');
insert into sacrement (name) values ('Fampihavanana');
insert into sacrement (name) values ('Komonio voalohany');
insert into sacrement (name) values ('Fankaherezana');
insert into sacrement (name) values ('Mariazy');

create view mem_curr_year as select ma.member_id, max(ay.start_year) "year" from member_activity ma join activity_year ay on ma.activity_year_id = ay.id group by ma.member_id;

create view current_member_activity as select ma.* from member_activity ma join activity_year ay on ma.activity_year_id = ay.id join mem_curr_year mcy on mcy.member_id=ma.member_id and mcy.year=ay.start_year;

-- ny goals efa ni participen'ny membres
create view activity_education_goal_member as select act_at.member_id member, apg.education_goal_id education_goal, eg.education_field_id education_field from activity_attendance act_at join action_plan ap on act_at.action_plan_id=ap.id join action_plan_goal apg on ap.id=apg.action_plan_id join education_goal eg on apg.education_goal_id=eg.id;

-- nombre de goals ni participen'ny membres par section step
create view goals_done_by_section_steps as select v.member, eg.section_steps_id section_steps, count(v.education_goal) goals from activity_education_goal_member v join education_goal eg on v.education_goal=eg.id group by eg.section_steps_id, v.member;

-- ny section step rehetra efa ananan'ny memberes (valide ou non)
create view member_section_step as select yi.member_id member, yss.section_steps_id from youth_info yi join youth_section_step yss on yi.id=yss.youth_info_id; 

-- nombre de goals a achever par section step
create view goals_to_achieve_by_section_steps as select section_steps_id section_steps, count(*) goals from education_goal group by section_steps_id;

-- membres a etre notifie pour update de level
create view members_to_update_level as select gd.member, gd.section_steps from goals_done_by_section_steps gd join goals_to_achieve_by_section_steps gta on gd.section_steps=gta.section_steps left join member_section_step mss on gd.member=mss.member and gd.section_steps=mss.section_steps_id where gd.goals=gta.goals and mss.member is null;

-- nombre de goals a achever par talent
create view goals_to_achieve_by_talent as select talent_id talent, count(*) goals from talent_goal group by talent_id;

create view activity_talent_goaltalent_category_id_member as
select aa.member_id member, aptg.talent_goal_id talent_goal
from activity_attendance aa join action_plan ap on aa.action_plan_id=ap.id join action_plan_talent_goal aptg on ap.id=aptg.action_plan_id;

-- nombre de goals ni participen'ny membres par talent
create view goals_done_by_talent as select aa.member_id member, tg.talent_id talent, count(*) goals from activity_attendance aa join action_plan ap on aa.action_plan_id=ap.id join action_plan_talent_goal aptg on ap.id=aptg.action_plan_id join talent_goal tg on aptg.talent_goal_id=tg.id group by aa.member_id, tg.talent_id;

-- membres dont le talent doit etre validé
create view members_to_update_talent as select gdt.member, gdt.talent from goals_to_achieve_by_talent gtat join goals_done_by_talent gdt on gtat.talent=gdt.talent join youth_info yi on gdt.member=yi.member_id left join youth_talent yt on yi.id=yt.youth_info_id and gdt.talent=yt.talent_id where yt.youth_info_id is null;

-- membres dont le talent doit etre validé (donnees completes)
create view full_members_to_update_talent as select m.id member_id, concat(m.last_name, ' ', m.first_name) name, t.id talent_id, t.name talent, yi.id youth_info_id, cma.activity_field_id from members_to_update_talent v join member m on v.member=m.id join talent t on v.talent=t.id join current_member_activity cma on m.id=cma.member_id join youth_info yi on yi.member_id=m.id;

-- stat presence --
create view global_activity_member_count as
select ap.title activity_name, count(aa.id) participants_count, ap.date activity_date, ss.section_id section, ss.id section_step, afs.activity_field_id activity_field
from activity_attendance aa join action_plan ap on aa.action_plan_id=ap.id join action_plan_goal apg on apg.action_plan_id=ap.id join education_goal eg on eg.id=apg.education_goal_id join section_steps ss on ss.id=eg.section_steps_id left join activity_field_section afs on afs.id=ap.activity_field_section_id
group by ap.title, ap.date, ss.id, ss.section_id, ap.activity_field_id, afs.activity_field_id;

-- stat nombre de membre --
create view member_count_by_year as
select EXTRACT( YEAR FROM entry_date) "year", count(*) members from member group by EXTRACT( YEAR FROM entry_date);

-- stat nombre activite
create view activity_count as
select ap.date, count(*) activities, afs.section_id section, afs.activity_field_id activity_field
from action_plan ap join activity_field_section afs on ap.activity_field_section_id=afs.id
group by ap.date, afs.section_id, afs.activity_field_id;

-- stat nombre evolution --
create view global_member_evolution_count as
select ss.section_id section, yss.section_steps_id section_step, cma.activity_field_id activity_field, count(*) members
from youth_section_step yss join section_steps ss on yss.section_steps_id=ss.id join youth_info yi on yi.id=yss.youth_info_id join current_member_activity cma on yi.member_id=cma.member_id
where yss.status=true
group by ss.section_id, yss.section_steps_id, cma.activity_field_id;

create view full_current_member_activity as
select v.*, hierarchy_id 
from current_member_activity v join activity_field af on v.activity_field_id = af.id;

create view current_section_step as
select m.id member, coalesce(max(yss.section_steps_id), 0) section_step
from member m join youth_info yi on m.id=yi.member_id left join youth_section_step yss on yi.id=yss.youth_info_id
group by m.id;

-- requete finale maka evolution
select count(v.members) members, ss.name
from global_member_evolution_count v join section_steps ss on v.section_step = ss.id
where (v.activity_field = 1 or v.activity_field = 2) 
and v.section = 1
group by ss.name;

-- requetes finale maka nombre par date
select count(participants_count) participants, activity_date 
from global_activity_member_count
where activity_field = 15
group by activity_date;

select count(participants_count) participants, year(activity_date) activity_date
from global_activity_member_count
where activity_field = 15
group by year(activity_date);

select count(participants_count) participants, concat(month(activity_date), '/', year(activity_date)) activity_date
from global_activity_member_count
where activity_field = 15
group by year(activity_date), month(activity_date);

-- requtes finale maka nombre d'activites
select count(activities) activities, date 
from activity_count
where activity_field = 15
group by date;

select count(activities) activities, concat(month(date), '/', year(date)) date
from activity_count
where activity_field = 15
group by year(date), month(date);

select count(activities) activities, year(date) date 
from activity_count
where activity_field = 15
group by year(date);

-- requete maka ny education goal tsy ahafahany mipasse
select * from education_goal where id not in (select education_goal from activity_education_goal_member where member = 10) and section_steps_id = 1; 

-- requete maka ny talent goal tsy ahafahany mipasse
select * from talent_goal where id not in (select talent_goal from activity_talent_goal_member where member = 10) and talent_id = 1; 

-- requete maka ny liste des payements filtrés par activity_year sy ativity_field
select pd.member_id, pdd.last_name, pdd.first_name, pdd.id paymentDetailId, p."date", pdd.activity_year_id, ma.activity_field_id, af.name activityField
from payment_detail pd 
	join payment p on pd.payment_id = p.id 
	join payment_draft_detail pdd on pdd.payment_draft_id = p.payment_draft_id and pdd.member_id = pd.member_id 
	join member_activity ma on ma.member_id = pd.member_id and ma.activity_year_id = pdd.activity_year_id
	join activity_field af on ma.activity_field_id = af.id
where pdd.activity_year_id = 8 and ma.activity_field_id = 15;