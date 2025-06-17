CREATE TABLE activity_year ( 
	id            SERIAL PRIMARY KEY,
	start_year    INT,
	end_year      INT,
	note          TEXT,
	deleted_at    DATE
);

CREATE TABLE hierarchy ( 
	id            SERIAL PRIMARY KEY,
	name          VARCHAR(100),
	note          VARCHAR(600),
	deleted_at    DATE,
	level         VARCHAR(100)
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

CREATE TABLE member ( 
	id            SERIAL PRIMARY KEY,
	last_name     VARCHAR(100),
	first_name    VARCHAR(100),
	contact       VARCHAR(20),
	birthdate     DATE,
	birth_place   VARCHAR(100),
	address       VARCHAR(100),
	church        VARCHAR(255),
	entry_date    DATE,
	promise_date  DATE,
	picture       VARCHAR(255),
	talent        VARCHAR(255),
	religion      VARCHAR(200),
	deleted_at    DATE
);

CREATE TABLE member_role ( 
	id            SERIAL PRIMARY KEY,
	name          VARCHAR(100),
	note          VARCHAR(600),
	deleted_at    DATE,
	level         VARCHAR(100)
);

ALTER TABLE member_role ADD COLUMN hierarchy_id int;

ALTER TABLE member_role ADD CONSTRAINT fk_member_role_hierarchy FOREIGN KEY ( hierarchy_id ) REFERENCES hierarchy( id ) ON DELETE RESTRICT ON UPDATE RESTRICT

CREATE TABLE member_role_payment (
	id SERIAL PRIMARY KEY,
	member_role_id INT NOT NULL,
	amount NUMERIC(10,0) NOT NULL
	CONSTRAINT fk_member_role_payment FOREIGN KEY (member_role_id)
		REFERENCES member_role(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
);

CREATE TABLE payment_type ( 
	id            SERIAL PRIMARY KEY,
	name          VARCHAR(100),
	note          VARCHAR(600),
	deleted_at    DATE
);

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

CREATE TABLE youth_info ( 
	id                   SERIAL  PRIMARY KEY,
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

CREATE TABLE membership_fee ( 
	id                   int  NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
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
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    contact VARCHAR,
    is_active BOOLEAN DEFAULT false,
    "errorCount" INTEGER DEFAULT 0,
    "generatedLink" VARCHAR,
    "generatedCode" VARCHAR,
    "accountType" INTEGER NOT NULL,
    activity_field_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,

    CONSTRAINT fk_user_activity_field FOREIGN KEY (activity_field_id)
        REFERENCES activity_field(id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- Index for foreign key
CREATE INDEX idx_user_activity_field_id ON "user"(activity_field_id);


CREATE TABLE activity_field ( 
	id              SERIAL PRIMARY KEY,
	number          VARCHAR(20),
	name            VARCHAR(100),
	superior_field  INT,
	place           VARCHAR(200),
	entity          VARCHAR(100),
	hierarchy_id    INT NOT NULL,
	deleted_at      DATE,
	CONSTRAINT fk_activity_field_activity_field FOREIGN KEY (superior_field)
		REFERENCES activity_field(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_activity_field_hierarchy FOREIGN KEY (hierarchy_id)
		REFERENCES hierarchy(id) ON DELETE RESTRICT ON UPDATE RESTRICT
);
CREATE INDEX fk_activity_field_activity_field ON activity_field ( superior_field );

CREATE INDEX fk_activity_field_hierarchy ON activity_field ( hierarchy_id );

CREATE TABLE fee_type ( 
	id                   SERIAL PRIMARY KEY,
	name                 varchar(100)      ,
	note                 varchar(600)      ,
	deleted_at           date      ,
	activity_field_id    int      ,
	CONSTRAINT fk_fee_type_activity_field FOREIGN KEY ( activity_field_id ) REFERENCES activity_field( id ) ON DELETE RESTRICT ON UPDATE RESTRICT
 );

CREATE TABLE member_activity (
    id SERIAL PRIMARY KEY,
    member_id INT NOT NULL,
    activity_field_id INT NOT NULL,
    activity_year_id INT NOT NULL,
    member_role_id INT NOT NULL,
    note_role VARCHAR(600),
    level VARCHAR(10),
    deleted_at DATE,

    CONSTRAINT fk_member_activity_activity_field FOREIGN KEY (activity_field_id)
        REFERENCES activity_field(id)
        ON DELETE RESTRICT ON UPDATE RESTRICT,

    CONSTRAINT fk_member_activity_activity_year FOREIGN KEY (activity_year_id)
        REFERENCES activity_year(id)
        ON DELETE RESTRICT ON UPDATE RESTRICT,

    CONSTRAINT fk_member_activity_member FOREIGN KEY (member_id)
        REFERENCES member(id)
        ON DELETE RESTRICT ON UPDATE RESTRICT,

    CONSTRAINT fk_member_activity_member_role FOREIGN KEY (member_role_id)
        REFERENCES member_role(id)
        ON DELETE RESTRICT ON UPDATE RESTRICT

);
CREATE INDEX idx_member_activity_activity_field ON member_activity (activity_field_id);
CREATE INDEX idx_member_activity_activity_year ON member_activity (activity_year_id);
CREATE INDEX idx_member_activity_member ON member_activity (member_id);
CREATE INDEX idx_member_activity_member_role ON member_activity (member_role_id);

CREATE TABLE payment_draft (
	id SERIAL PRIMARY KEY,
	payer VARCHAR(250) NOT NULL,
	"date" DATE NOT NULL,
	amount NUMERIC(10,0),
	note TEXT,
	deleted_at DATE,
	payment_type_id INT,
	CONSTRAINT fk_payment_draft_payment_type 
		FOREIGN KEY (payment_type_id) REFERENCES payment_type(id) 
		ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE payment (
	id SERIAL PRIMARY KEY,
	"date" DATE,
	deleted_at DATE,
	note TEXT,
	payment_draft_id INT NOT NULL,
	CONSTRAINT fk_payment_payment_draft 
		FOREIGN KEY (payment_draft_id) REFERENCES payment_draft(id) 
		ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE INDEX unq_payment_payment_draft_id 
	ON payment (payment_draft_id);

CREATE TABLE payment_draft_detail ( 
	id                   SERIAL PRIMARY KEY,
	last_name            varchar(100)      ,
	first_name           varchar(250)      ,
	phone_number         varchar(50)      ,
	email                varchar(100)      ,
	activity_year_id     int      ,
	member_role_id       int     ,
	fee_type_id          int,
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
 );

CREATE INDEX unq_payment_draft_detail_payment_draft_id ON payment_draft_detail ( payment_draft_id );

CREATE INDEX fk_payment_draft_detail_activity_year ON payment_draft_detail ( activity_year_id );

CREATE INDEX fk_payment_draft_detail_fee_type ON payment_draft_detail ( fee_type_id );

CREATE INDEX fk_payment_draft_detail_hierarchy ON payment_draft_detail ( hierarchy_id );

CREATE INDEX fk_payment_draft_detail_member ON payment_draft_detail ( member_id );

CREATE INDEX fk_payment_draft_detail_member_role ON payment_draft_detail ( member_role_id );

ALTER TABLE payment_draft_detail ADD section_id int ;

 ALTER TABLE payment_draft_detail ADD CONSTRAINT fk_payment_draft_detail FOREIGN KEY ( section_id ) REFERENCES section( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

 ALTER TABLE payment_draft_detail ADD sacrement text ;

 ALTER TABLE payment_draft_detail ADD number_card varchar(250) ;

 ALTER TABLE payment_draft_detail ADD step varchar(250) ;

 ALTER TABLE payment_draft_detail DROP COLUMN training_two;

 ALTER TABLE payment_draft_detail DROP COLUMN training_three;

 ALTER TABLE payment_draft_detail DROP COLUMN training_four;

 ALTER TABLE payment_draft_detail DROP COLUMN training_five;

-- Rename the column
ALTER TABLE payment_draft_detail RENAME COLUMN training_one TO training;

-- Change the data type to text (NULL is default, so no need to specify)
ALTER TABLE payment_draft_detail ALTER COLUMN training TYPE text;

ALTER TABLE payment_draft_detail_activity_field ADD column deleted_at date;

ALTER TABLE payment_draft_detail ADD COLUMN activity_field_id INT NOT NULL;

ALTER TABLE payment_draft_detail ADD CONSTRAINT fk_payment_draft_detail_activity_field FOREIGN KEY ( activity_field_id ) REFERENCES activity_field( id ) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE payment_draft_detail ADD COLUMN address VARCHAR(255);

ALTER TABLE payment_draft_detail ADD COLUMN note TEXT;


CREATE TABLE payment_draft_detail_activity_field (
	id SERIAL PRIMARY KEY,
	activity_field_id INT NOT NULL,
	payment_draft_detail_id INT NOT NULL,
	CONSTRAINT fk_payment_draft_detai_activity_field_activity_fields 
		FOREIGN KEY (activity_field_id) REFERENCES activity_field(id) 
		ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_payment_draft_detail_activity_field_payment_draft_details 
		FOREIGN KEY (payment_draft_detail_id) REFERENCES payment_draft_detail(id) 
		ON DELETE RESTRICT ON UPDATE RESTRICT
);


CREATE INDEX fk_payment_draft_detail_activity_field_activity_field 
	ON payment_draft_detail_activity_field (activity_field_id);
CREATE INDEX fk_payment_draft_detail_activity_field_payment_draft_detail 
	ON payment_draft_detail_activity_field (payment_draft_detail_id);

CREATE TABLE payment_detail (
	id SERIAL PRIMARY KEY,
	payment_id INT NOT NULL,
	member_id INT NOT NULL,
	deleted_at DATE,
	payment_draft_detail_id INT NOT NULL,
	CONSTRAINT fk_payment_detail_payment 
		FOREIGN KEY (payment_id) REFERENCES payment(id) 
		ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT fk_payment_detail_member 
		FOREIGN KEY (member_id) REFERENCES member(id) 
		ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_payment_detail_payment_draft_detail 
		FOREIGN KEY (payment_draft_detail_id) REFERENCES payment_draft_detail(id) 
		ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE INDEX fk_payment_detail_member_activity 
	ON payment_detail (member_id);
CREATE INDEX fk_payment_detail_payment 
	ON payment_detail (payment_id);
CREATE INDEX fk_payment_detail_payment_draft_detail 
	ON payment_detail (payment_draft_detail_id);

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

ALTER TABLE membership_fee ADD section_id int ;

ALTER TABLE membership_fee ADD CONSTRAINT fk_membership_fee_section FOREIGN KEY ( section_id ) REFERENCES section( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;


CREATE TABLE activity_field_location (
    id SERIAL PRIMARY KEY,
    activity_field_id INT NOT NULL,
    location GEOMETRY(Point, 4326) NOT NULL,
    CONSTRAINT fk_location_activity_field
        FOREIGN KEY (activity_field_id)
        REFERENCES activity_field(id)
        ON DELETE CASCADE
);

-- Optional: spatial index for fast geolocation queries
CREATE INDEX idx_activity_field_location_geom
    ON activity_field_location
    USING GIST (location);

