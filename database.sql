CREATE TABLE tasks (
    "id" serial PRIMARY KEY,
    "title" varchar(24) NOT NULL,
    "details" varchar(128),
    "completed" boolean NOT NULL
);

INSERT INTO "tasks" (title, details, completed)
VALUES ('Go Bowling', 'not on Shabbos', false),
('Get a Toe', 'by 3 o''clock, with nail polish', false),
('Join the Nihilists', 'at least it''s an ethos', false),
('Laundry', 'doesn''t matter', true);