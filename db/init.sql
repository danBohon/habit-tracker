drop table if exists habits;
drop table if exists users;

create table users (
    id serial primary key,
    username varchar(20),
    password varchar(20),
    profile_pic text
);

create table habits (
    id serial primary key,
    user_id int references users (id),
    title varchar (45),
    start_date date not null default current_date,
    goal int
);

insert into users (username, password, profile_pic)
values ( 'First User', 'pass123', 'https://robohash.org/86.125.239.86.png');

insert into habits (user_id, title, goal)
values (1, 'Gym', 20);

select * from habits;
select * from users;