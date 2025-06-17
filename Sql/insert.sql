
INSERT INTO hierarchy (name,note,deleted_at, level) VALUES
('Nasionaly',null,null,'1'),
('Diosezy',null,null,'2'),
('Faritra',null,null,'3'),
('Fivondronana',null,null,'4');

INSERT INTO activity_year (start_year, end_year, note, deleted_at) 
VALUES (2025, 2026, 'just a note', NULL);

insert into fee_type (name,note,deleted_at,activity_field_id)
values('Cotisation',null,null,null);

INSERT INTO activity_field (number , name, superior_field, place, entity,hierarchy_id, deleted_at) VALUES
('I', 'Madagasikara', NULL, 'Madagasikara', NULL, 1, NULL),

('II', 'Antananarivo', 1, 'Antananarivo', 'diosezy', 2, NULL),
('III', 'Toamasina', 1, 'Toamasina', 'diosezy', 2, NULL),
('IV', 'Moramanga', 1, 'Moramanga', 'diosezy', 2, NULL),
('V', 'Toliara', 1, 'Toliara', 'diosezy', 2, NULL),
('VI', 'Miarinarivo', 1, 'Miarinarivo', 'diosezy', 2, NULL),
('VII', 'Ihosy', 1, 'Ihosy', 'diosezy', 2, NULL),
('VIII', 'Mahajanga', 1, 'Mahajanga', 'diosezy', 2, NULL),

('IX', 'Analamanga', 2, 'Analamanga', 'faritra', 3, NULL),
('X', 'Atsimon-drano', 2, 'Atsimon-drano', 'faritra', 3, NULL),
('XI', 'Avaradrano', 2, 'Avaradrano', 'faritra', 3, NULL),
('XII', 'Toamasina I', 3, 'Toamasina I', 'faritra', 3, NULL),
('XIII', 'Toamasina II', 3, 'Toamasina II', 'faritra', 3, NULL),
('XIV', 'Toamasina III', 3, 'Toamasina III', 'faritra', 3, NULL),

('XV', 'St Michel', 9, 'Amparibe', 'Fianarana', 4, NULL),
('XVI', 'St Joseph', 9, 'Mahamasina', 'Fiangonana', 4, NULL),
('XVII', 'Providence', 9, 'Amparibe', 'Fianarana', 4, NULL),
('XVIII', 'EKAR Ambohimamory', 9, 'Ambohimamory', 'Fiangonana', 4, NULL),
('XIX', 'St Michel Itaosy', 9, 'Itaosy', 'Fianarana', 4, NULL),

('XX', 'Tanjombato', 2, 'Tanjombato', 'faritra', 3, NULL),
('XXI', 'Manjakandriana', 2, 'Manjakandriana', 'faritra', 3, NULL),
('XXII', 'Ambohitrimanjaka', 2, 'Ambohitrimanjaka', 'faritra', 3, NULL),
('XXIII', 'Imerinafovoany', 2, 'Imerinafovoany', 'faritra', 3, NULL),
('XXIV', 'Namehana', 2, 'Namehana', 'faritra', 3, NULL),
('XXV', 'Itaosy', 2, 'Itaosy', 'faritra', 3, NULL);

INSERT INTO section (
    name, code, color, min_age, max_age, section_name, group_name, motto,
    activity_name, outfit_color, council, patron_saint, base, engagement, deleted_at
) VALUES
('Lovitao', 'LVT', 'Mavo', 6, 10, 'Andia', 'Enina', 'Izay tratry ny aina no atao',
 'Haza', 'Bleu ciel, bleu marine', 'Vato fihaonana', 'St Francois d''Assise', 'Base LVT', 'Fanomezan-toky', NULL),

('Mpianjoria', 'MPJ', 'Manga', 11, 15, 'Antoko', 'Sokajy', 'Antili MPJ na mora na mafy ny dia vonona fo MPJ',
 'Anjoria', 'Kaki', 'Tafasiry', 'St Georges Don Bosco', 'Base MPJ', 'Fanekena', NULL),

('Mpamakilay', 'MPK', 'Maitso', 16, 18, 'Rodona', 'Tarika', 'Dinan''ny MPK vonona mandrakizay',
 'Vakilay', 'Kaki, bleu marine', 'Donkafo', 'St Jean-Baptiste', 'Base MPK', 'Famehezan-tena', NULL),

('Mpiandalana', 'MPD', 'Mena', 18, 25, 'Fileovana', 'Fokonolona', 'Andry iankinana vonona tsara MPD mifampizara',
 'Vady bainga', 'Kaki, marron', 'Dinika', 'Mpaminany Moizy', 'Base MPD', 'Velirano', NULL);

/*INSERT INTO member_role (name, hierarchy_id, level, note)
VALUES
  ('Beazina', 4, 1, ''),
  ('Mpiandraikitra', 4, 1, ''),
  ('Tonia', 4, 1, ''),
  ('AIMO', 4, 1, ''),
  ('Filoha (Faritra)', 3, 2, ''),
  ('ZAP/RAP (Faritra)', 3, 2, ''),
  ('Filoha (Diosezy)', 2, 3, ''),
  ('ZAP/RAP (Diosezy)', 2, 3, ''),
  ('Antily zokiny', 2, 3, ''),
  ('SAIM', 2, 3, ''),
  ('CONAT', 1, 4, ''),
  ('Foibe (Ekipa Nasionaly, RAPI)', 1, 4, '');*/
  
INSERT INTO member_role (name, hierarchy_id, level, note)
VALUES
  ('Beazina', 4, 1, ''),
  ('Mpiandraikitra', 4, 1, ''),
  ('Tonia', 4, 1, ''),
  ('FilohaF', 3, 2, ''),
  ('FilohaD', 2, 3, ''),
  ('Ekipa Nasionaly', 1, 4, '');
  
  
INSERT INTO member (
    last_name,
    first_name,
    contact,
    birthdate,
    birth_place,
    address,
    church,
    entry_date,
    promise_date,
    picture,
    talent,
    religion,
    deleted_at
) VALUES (
    'Rasolofomanana',
    'Andry',
    '+261341234567',
    '1995-06-12',
    'Antananarivo',
    'Lot II F 15 Ankadifotsy',
    'Ankadifotsy Adventist Church',
    '2020-01-10',
    '2021-01-10',
    'andry.jpg',
    'Singing, Guitar',
    'Adventist',
    NULL
);

INSERT INTO "user" (
    username,
    password,
    email,
    contact,
    is_active,
    "errorCount",
    "generatedLink",
    "generatedCode",
    "accountType",
    activity_field_id,
    created_at,
    updated_at,
    deleted_at
) VALUES (
    'popo',
    'popo',
    'popo@example.com',
    '0341234567',
    true,
    0,
    'someGeneratedLink',
    'someGeneratedCode',
    1,
    5,
    NOW(),
    NOW(),
    NULL
); 

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

INSERT INTO membership_fee (hierarchy_id, member_role_id, activity_year_id, fee_type_id, amount) VALUES
(1,6,1,1,20000),
(2,5,1,1,10000),
(3,4,1,1,10000),
(4,3,1,1,5000),
(4,2,1,1,2000),
(4,1,1,1,1000);

INSERT INTO payment_type (name, note, deleted_at)
VALUES 
  ('Espece', null, null),
  ('MVola', null, null),
  ('Orange Money', null, null),
  ('Airtle Money', null, null);