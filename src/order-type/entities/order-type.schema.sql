create table order_types
(
    id serial primary key,
    name varchar(255) not null,
    createdAt   timestamp with time zone not null,
    updatedAt   timestamp with time zone not null
);
