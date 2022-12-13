CREATE TABLE tasks (
    "id" serial PRIMARY KEY,
    "title" varchar(24) NOT NULL,
    "details" varchar(128),
    "completed" boolean NOT NULL
);

