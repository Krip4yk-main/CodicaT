    drop table if exists bank;
    create table if not exists bank
    (
        id SERIAL not null primary key,
        name varchar(256) not null default 'Default Bank',
        "createdAt" timestamp not null,
        "updatedAt" timestamp not null
    );