SELECT *
FROM payment AS Payment
LEFT JOIN payment_draft AS paymentDraft ON Payment.payment_draft_id = paymentDraft.id
LEFT JOIN payment_draft_detail AS paymentDraftDetails ON paymentDraft.id = paymentDraftDetails.payment_draft_id
LEFT JOIN member ON paymentDraftDetails.member_id = member.id
LEFT JOIN current_member_activity AS cma ON member.id = cma.member_id
LEFT JOIN payment_type AS paymentType ON paymentDraft.payment_type_id = paymentType.id
WHERE Payment.id IS NOT NULL


SELECT
  af3.id AS district_id,
  af3.name AS district_name,
  ST_AsGeoJSON(ST_ConvexHull(ST_Collect(af4l.location))) AS geojson
FROM activity_field af4
JOIN activity_field_location af4l ON af4.id = af4l.activity_field_id
JOIN activity_field af3 ON af4.superior_field = af3.id -- get the district
WHERE af4.hierarchy_id = 4 -- only leaf nodes with geometry
  AND af3.hierarchy_id = 3
GROUP BY af3.id, af3.name;
