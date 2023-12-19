CREATE TABLE prefabs
(
    id        serial primary key,
    name      varchar(255)                                         not null,
    comment   varchar(255),
    price     real                                                 not null,
    type_id   bigint references order_types (id) on delete cascade not null,
    createdAt timestamp with time zone,
    updatedAt timestamp with time zone
);
