INSERT INTO member_activity (
  member_id,
  activity_field_id,
  activity_year_id,
  member_role_id,
  section_id,
  note_role,
  level
) VALUES
  (1, 16, 3, 1, null, null, 'Beazina'),
  (2, 2, 3, 7, null, null,  'FilohaD'),
  (3, 1, 3, 12, null, null, 'Nasionaly');


delete from payment_draft_detail_activity_field;
delete from payment_draft_detail;
delete from payment;
delete from payment_draft;
