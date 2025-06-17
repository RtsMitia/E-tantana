SELECT *
FROM payment AS Payment
LEFT JOIN payment_draft AS paymentDraft ON Payment.payment_draft_id = paymentDraft.id
LEFT JOIN payment_draft_detail AS paymentDraftDetails ON paymentDraft.id = paymentDraftDetails.payment_draft_id
LEFT JOIN member ON paymentDraftDetails.member_id = member.id
LEFT JOIN current_member_activity AS cma ON member.id = cma.member_id
LEFT JOIN payment_type AS paymentType ON paymentDraft.payment_type_id = paymentType.id
WHERE Payment.id IS NOT NULL