create table users(
    id int generated always as identity,
    username varchar(255),
    password varchar(255),
    PRIMARY KEY (id)
);


create table posts(
    id int generated always as identity,
    user_id int not null unique,
    content varchar(2500),
    rating int default 0,
    PRIMARY KEY (id),
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
            REFERENCES users(id)
);


create table comments(
    id int generated always as identity,
    user_id int not null unique,
    post_id int not null unique,
    content varchar(2500),
    rating int default 0,
    PRIMARY KEY (id),
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
            REFERENCES users(id),
    CONSTRAINT fk_post
        FOREIGN KEY (post_id) 
            REFERENCES posts(id)
);