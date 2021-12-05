drop table if exists todos;
drop table if exists users;


create table users(
    user_id int generated always as identity primary key,
    username varchar(255) not null unique,
    password varchar(255) not null unique
);


create table todos(
    task_id int generated always as identity primary key,
    user_id int not null references users(user_id),
    text varchar(255) not null,
    date varchar(15) not null,
    completed boolean not null,
    overdue boolean not null,
    isEditing boolean not null
);

