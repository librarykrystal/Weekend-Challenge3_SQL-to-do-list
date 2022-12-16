CREATE TABLE tasks (
    "id" serial PRIMARY KEY,
    "title" varchar(24) NOT NULL,
    "details" varchar(128),
    "completed" boolean NOT NULL
);

INSERT INTO "tasks" (title, details, completed)
VALUES ('Party', 'like it''s 1999', false);