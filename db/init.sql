drop table if exists transactions;
drop table if exists status;
drop table if exists category;
drop table if exists bank;
create table if not exists bank
(
    id          serial       not null primary key,
    name        varchar(256) not null default 'Default Bank',
    balance     int          not null default 0,
    "createdAt" timestamp    not null default now(),
    "updatedAt" timestamp    not null default now()
);

insert into bank (name, balance)
values ('Default Bank', 999999);

drop table if exists category;
create table if not exists category
(
    id   serial       not null primary key,
    name varchar(128) not null unique
);

insert into category (name)
values ('Default category');

drop table if exists status;
create table if not exists status
(
    id   serial       not null primary key,
    name varchar(128) not null unique
);

insert into status (name)
values ('Default status');

drop table if exists transactions;
create table if not exists transactions
(
    id          serial        not null primary key,
    "bankId"    int           not null references bank (id),
    amount      int           not null,
    categories  varchar(64)[] not null                          default array ['Default category'],
    --idk how to reference like (each element of categories) referenced by category (id)
    status      varchar(64)   not null references status (name) default 'Default status',
    "createdAt" timestamp     not null                          default now(),
    "updatedAt" timestamp     not null                          default now()
);

insert into transactions ("bankId", amount)
values (1, 999999);