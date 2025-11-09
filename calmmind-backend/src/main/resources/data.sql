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