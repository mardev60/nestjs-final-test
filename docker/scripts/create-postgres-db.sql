CREATE DATABASE "nestjs-final-test-db";
CREATE DATABASE "test_nestjs-final-test-db_TASKS";
CREATE DATABASE "test_nestjs-final-test-db_USERS";

\c "nestjs-final-test-db"
CREATE TABLE public."User" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE public."Task" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    priority INT NOT NULL,
    userId INT NOT NULL,
    CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES public."User"(id)
);

\c "test_nestjs-final-test-db_TASKS"
CREATE TABLE public."User" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE public."Task" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    priority INT NOT NULL,
    userId INT NOT NULL,
    CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES public."User"(id)
);

\c "test_nestjs-final-test-db_USERS"
CREATE TABLE public."User" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE public."Task" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    priority INT NOT NULL,
    userId INT NOT NULL,
    CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES public."User"(id)
);