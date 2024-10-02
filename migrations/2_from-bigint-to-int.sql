BEGIN;
alter table order_stages alter column user_id type int;
alter table order_stages alter column order_id type int;
alter table order_stages alter column department_id type int;
alter table order_stages alter column break_id type int;

alter table monetary_matrices alter column order_type_id type int;
alter table monetary_matrices alter column department_id type int;

alter table orders alter column storage_id type int;
alter table orders alter column manager_id type int;
alter table orders alter column type_id type int;

alter table prefabs alter column type_id type int;
END ;