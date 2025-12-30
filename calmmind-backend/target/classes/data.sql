-- ANXIOUS Affirmations
INSERT INTO affirmations (message, attachment_style, category) VALUES
('Their silence isn''t rejection—it''s their way of processing. Give them space.', 'ANXIOUS', 'DAILY'),
('You don''t need constant reassurance to know you''re worthy of love.', 'ANXIOUS', 'DAILY'),
('Breathe. Not every gap in conversation means they''re pulling away.', 'ANXIOUS', 'CALM'),
('Your worth isn''t determined by how quickly they respond to your texts.', 'ANXIOUS', 'DAILY'),
('It''s okay to feel anxious. Acknowledge it, then let it pass like a wave.', 'ANXIOUS', 'CALM'),
('Needing reassurance is human, but you are already enough as you are.', 'ANXIOUS', 'DAILY'),
('Their need for alone time isn''t about you—it''s about them recharging.', 'ANXIOUS', 'RELATIONSHIP'),
('You can trust someone and still feel scared. Both feelings can coexist.', 'ANXIOUS', 'DAILY'),
('Chasing won''t make them stay. Trust that if it''s right, they''ll choose you.', 'ANXIOUS', 'RELATIONSHIP'),
('One moment of distance doesn''t erase all the moments of closeness you''ve shared.', 'ANXIOUS', 'RELATIONSHIP');

-- AVOIDANT Affirmations
INSERT INTO affirmations (message, attachment_style, category) VALUES
('It''s okay to let people in gradually. Vulnerability is strength, not weakness.', 'AVOIDANT', 'DAILY'),
('Needing space doesn''t mean you don''t care—it''s how you process and recharge.', 'AVOIDANT', 'DAILY'),
('You can maintain your independence while being emotionally close to someone.', 'AVOIDANT', 'RELATIONSHIP'),
('Sharing your feelings won''t trap you. It will actually set you free.', 'AVOIDANT', 'DAILY'),
('It''s safe to depend on someone. Interdependence isn''t the same as losing yourself.', 'AVOIDANT', 'RELATIONSHIP'),
('Your need for autonomy is valid, and so is your partner''s need for connection.', 'AVOIDANT', 'RELATIONSHIP'),
('Running away won''t protect you from hurt. Staying might bring you joy.', 'AVOIDANT', 'DAILY'),
('You deserve to be seen and known, not just admired from a distance.', 'AVOIDANT', 'RELATIONSHIP'),
('Asking for space is healthy. Disappearing without explanation creates wounds.', 'AVOIDANT', 'RELATIONSHIP'),
('Love doesn''t mean losing yourself. It means finding yourself with someone else.', 'AVOIDANT', 'DAILY');

-- SECURE Affirmations
INSERT INTO affirmations (message, attachment_style, category) VALUES
('Trust your instincts—your healthy relationship patterns serve you well.', 'SECURE', 'DAILY'),
('You communicate your needs clearly, and that''s a powerful gift.', 'SECURE', 'DAILY'),
('Conflict doesn''t threaten your relationship. It''s an opportunity to grow closer.', 'SECURE', 'RELATIONSHIP'),
('You can be independent and connected at the same time. You''ve mastered the balance.', 'SECURE', 'DAILY'),
('Your ability to self-soothe is a strength. Share it with your partner.', 'SECURE', 'DAILY'),
('Healthy relationships have both closeness and space. You navigate this beautifully.', 'SECURE', 'RELATIONSHIP'),
('You trust without needing control, and love without losing yourself.', 'SECURE', 'RELATIONSHIP'),
('Your consistency and reliability are pillars of a strong relationship.', 'SECURE', 'RELATIONSHIP'),
('You repair after conflict, and that''s what truly matters.', 'SECURE', 'RELATIONSHIP'),
('You give love freely because you know you are already whole.', 'SECURE', 'DAILY');

-- FEARFUL_AVOIDANT Affirmations
INSERT INTO affirmations (message, attachment_style, category) VALUES
('You deserve love without constant fear of loss. Safety is possible.', 'FEARFUL_AVOIDANT', 'DAILY'),
('It''s okay to want both closeness and space. You''re not broken—you''re human.', 'FEARFUL_AVOIDANT', 'DAILY'),
('Taking emotional risks is how we grow. You''re brave for trying.', 'FEARFUL_AVOIDANT', 'DAILY'),
('Your push-pull pattern is a protection, not a flaw. You can learn new ways.', 'FEARFUL_AVOIDANT', 'DAILY'),
('You can be scared and still move toward connection. Both feelings can exist.', 'FEARFUL_AVOIDANT', 'RELATIONSHIP'),
('Not everyone will hurt you the way you''ve been hurt before.', 'FEARFUL_AVOIDANT', 'RELATIONSHIP'),
('It''s safe to trust again, slowly. Healing doesn''t have to be rushed.', 'FEARFUL_AVOIDANT', 'DAILY'),
('Your fear of intimacy and fear of abandonment can both soften over time.', 'FEARFUL_AVOIDANT', 'DAILY'),
('You''re allowed to change your mind about what you need. That''s growth, not failure.', 'FEARFUL_AVOIDANT', 'DAILY'),
('Vulnerability feels terrifying, but it''s the bridge to the love you crave.', 'FEARFUL_AVOIDANT', 'RELATIONSHIP');

-- GENERAL Affirmations
INSERT INTO affirmations (message, attachment_style, category) VALUES
('You are worthy of love and belonging, exactly as you are.', 'GENERAL', 'DAILY'),
('Breathe. You are exactly where you need to be right now.', 'GENERAL', 'CALM'),
('Every relationship teaches you something valuable about yourself.', 'GENERAL', 'RELATIONSHIP'),
('Your feelings are valid, even the complicated, contradictory ones.', 'GENERAL', 'DAILY'),
('Healthy love feels calm, not chaotic. You deserve peace.', 'GENERAL', 'RELATIONSHIP'),
('It''s okay to still be learning how to love and be loved.', 'GENERAL', 'DAILY'),
('Your past doesn''t define your capacity for future happiness.', 'GENERAL', 'DAILY'),
('You''re allowed to set boundaries and still be a loving person.', 'GENERAL', 'RELATIONSHIP'),
('Self-compassion is the foundation of all healthy relationships.', 'GENERAL', 'DAILY'),
('You don''t have to be perfect to be loved. You just have to be you.', 'GENERAL', 'DAILY');


-- QUIZ QUESTIONS (12 questions for attachment style assessment)

-- ANXIETY Questions (Questions 1-6)
INSERT INTO quiz_questions (question_text, dimension, question_number) VALUES
('I''m afraid that I will lose my partner''s love.', 'ANXIETY', 1),
('I often worry that my partner doesn''t really love me.', 'ANXIETY', 2),
('I worry a lot about my relationships.', 'ANXIETY', 3),
('I''m afraid that once a romantic partner gets to know me, he or she won''t like who I really am.', 'ANXIETY', 4),
('I often worry that my partner will not want to stay with me.', 'ANXIETY', 5),
('When I show my feelings for romantic partners, I''m afraid they will not feel the same about me.', 'ANXIETY', 6);

-- AVOIDANCE Questions (Questions 7-12)
INSERT INTO quiz_questions (question_text, dimension, question_number) VALUES
('I prefer not to show a partner how I feel deep down.', 'AVOIDANCE', 7),
('I find it difficult to allow myself to depend on romantic partners.', 'AVOIDANCE', 8),
('I get uncomfortable when a romantic partner wants to be very close.', 'AVOIDANCE', 9),
('I don''t feel comfortable opening up to romantic partners.', 'AVOIDANCE', 10),
('I prefer not to be too close to romantic partners.', 'AVOIDANCE', 11),
('I am nervous when partners get too close to me.', 'AVOIDANCE', 12);


/* PARTNER STYLE QUESTION GROUPS */
INSERT INTO partner_style_question_groups(id, group_name, min_score, max_score) VALUES 
(100, 'AVOIDANT', 11 , 33),
(200, 'SECURE', 11, 33),
(300, 'ANXIOUS', 11, 33);

/*PARTNER STYLE QUIZ QUESTIONS */

/*AVOIDANT */
INSERT INTO partner_style_quiz_questions(id, question_text, question_group_id, question_num, created_at)VALUES 
(1001, 'Sends mixed signals.', 100, 1, NOW()),
(1002, 'Values independence greatly.', 100, 2, NOW()),
(1003, 'Devalues partners.', 100, 3, NOW()),
(1004, 'Uses distancing strategies.', 100, 4, NOW()),
(1005, 'Emphasizes boundaries.', 100, 5, NOW()),
(1006, 'Has unrealistically romantic views.', 100, 6, NOW()),
(1007, 'Mistrustful of partners.', 100, 7, NOW()),
(1008, 'Rigid relationship rules.', 100, 8, NOW()),
(1009, 'Withdraws or explodes during conflict.', 100, 9, NOW()),
(1010, 'Does not clarify intentions.', 100, 10, NOW()),
(1011, 'Avoids relationship discussions.', 100, 11, NOW());


-- SECURE
INSERT INTO partner_style_quiz_questions(id, question_text, question_group_id, question_num, created_at) VALUES
(2001, 'Reliable and consistent.', 200, 1, NOW()),
(2002, 'Makes decisions together.', 200, 2, NOW()),
(2003, 'Flexible relationship views.', 200, 3, NOW()),
(2004, 'Communicates well.', 200, 4, NOW()),
(2005, 'Resolves conflicts constructively.', 200, 5, NOW()),
(2006, 'Comfortable with commitment.', 200, 6, NOW()),
(2007, 'Views relationships as balanced.', 200, 7, NOW()),
(2008, 'Closeness builds closeness.', 200, 8, NOW()),
(2009, 'Includes you socially.', 200, 9, NOW()),
(2010, 'Expresses love openly.', 200, 10, NOW()),
(2011, 'Does not play games.', 200, 11, NOW());

-- ANXIOUS
INSERT INTO partner_style_quiz_questions(id, question_text, question_group_id, question_num, created_at) VALUES
(3001, 'Seeks high closeness.', 300, 1, NOW()),
(3002, 'Expresses insecurities.', 300, 2, NOW()),
(3003, 'Unhappy when single.', 300, 3, NOW()),
(3004, 'Plays attention-seeking games.', 300, 4, NOW()),
(3005, 'Expects mind-reading.', 300, 5, NOW()),
(3006, 'Acts out emotionally.', 300, 6, NOW()),
(3007, 'Personalizes behavior.', 300, 7, NOW()),
(3008, 'Avoids emotional risk.', 300, 8, NOW()),
(3009, 'Preoccupied with relationship.', 300, 9, NOW()),
(3010, 'Overanalyzes interactions.', 300, 10, NOW()),
(3011, 'Fears infidelity.', 300, 11, NOW());


/*QUESTION DESCRIPTIONS*/

-- =========================
-- QUESTION DESCRIPTIONS
-- =========================
INSERT INTO question_descriptions (question_id, description) VALUES

-- ===== GROUP A — AVOIDANT =====
(1001, 'Seems distant and aloof yet vulnerable at the same time.'),
(1001, 'Sometimes calls a lot and other times not at all.'),
(1001, 'Says something intimate but later acts as though there is no future.'),

(1002, 'Needs a lot of space.'),
(1002, 'Work leaves no room for a serious relationship.'),
(1002, 'Rejects emotional dependency or neediness.'),

(1003, 'Jokes about your flaws, even if playfully.'),
(1003, 'Fixates on physical flaws in past partners.'),
(1003, 'Cheated on a past partner.'),

(1004, 'Maintains emotional or physical distance.'),
(1004, 'Avoids shared living or sleeping arrangements.'),
(1004, 'Prefers taking vacations alone.'),
(1004, 'Leaves future plans unclear.'),
(1004, 'Physically distances themselves when together.'),

(1005, 'Keeps friends or family separate from the relationship.'),
(1005, 'Avoids inviting you into their personal space.'),

(1006, 'Longs for a perfect future partner.'),
(1006, 'Idealizes past relationships without clarity.'),

(1007, 'Fears being financially or emotionally exploited.'),
(1007, 'Suspects partners have hidden motives.'),

(1008, 'Has rigid rules about relationships.'),
(1008, 'Strongly prefers a specific partner type.'),
(1008, 'Believes marriage or shared living is a bad idea.'),
(1008, 'Makes sweeping negative statements about partners.'),
(1008, 'Avoids phone communication even when important.'),

(1009, 'Withdraws during disagreements.'),
(1009, 'Explodes emotionally and walks away.'),

(1010, 'Avoids saying “I love you” despite long-term involvement.'),
(1010, 'Makes long-term plans without including you.'),

(1011, 'Avoids conversations about the relationship.'),
(1011, 'Responds vaguely without clarification.'),
(1011, 'Certain relationship topics are off-limits.'),

-- ===== GROUP B — SECURE =====
(2001, 'Calls when they say they will.'),
(2001, 'Follows through on plans.'),
(2001, 'Explains or apologizes when plans change.'),

(2002, 'Discusses plans openly.'),
(2002, 'Considers your preferences.'),

(2003, 'Open to different relationship arrangements.'),
(2003, 'Does not look for a rigid partner type.'),
(2003, 'Avoids sweeping negative relationship statements.'),

(2004, 'Encourages open relationship conversations.'),
(2004, 'Addresses concerns directly instead of acting out.'),

(2005, 'Tries to understand your perspective.'),
(2005, 'Focuses on solving problems rather than winning.'),

(2006, 'Comfortable with emotional closeness.'),
(2006, 'Does not fear dependency or commitment.'),

(2007, 'Does not emphasize struggle or sacrifice.'),
(2007, 'Open to relationships even when life is imperfect.'),

(2008, 'Reassures after emotional conversations.'),
(2008, 'Expresses closeness after intimacy.'),

(2009, 'Introduces you to friends and family.'),
(2009, 'Includes you in their social world.'),

(2010, 'Expresses feelings early.'),
(2010, 'Uses “I love you” naturally.'),

(2011, 'Avoids manipulation or jealousy tactics.'),
(2011, 'Does not keep score in communication.'),

-- ===== GROUP C — ANXIOUS =====
(3001, 'Seeks frequent closeness early in relationships.'),
(3001, 'Enjoys a high level of physical affection.'),

(3002, 'Worries about rejection.'),
(3002, 'Compares themselves to past partners.'),
(3002, 'Tries hard to please their partner.'),

(3003, 'Feels unhappy or incomplete when single.'),
(3003, 'Approaches dating with desperation.'),

(3004, 'Acts distant to provoke reassurance.'),
(3004, 'Pretends to be unavailable.'),
(3004, 'Manipulates situations to gain attention.'),

(3005, 'Uses subtle emotional cues.'),
(3005, 'Expects partner to guess what is wrong.'),

(3006, 'Threatens to leave during conflicts.'),
(3006, 'Stores resentment instead of communicating.'),

(3007, 'Interprets neutral behavior as rejection.'),
(3007, 'Personalizes situations excessively.'),

(3008, 'Mirrors partner’s emotional investment.'),
(3008, 'Avoids emotional risk to prevent hurt.'),

(3009, 'Obsessively analyzes relationship details.'),
(3009, 'Communicates excessively or withdraws completely.'),

(3010, 'Overthinks small actions or comments.'),
(3010, 'Fears partner will lose interest.'),

(3011, 'Checks messages or passwords.'),
(3011, 'Monitors partner’s whereabouts.'),
(3011, 'Searches belongings for signs of infidelity.');



