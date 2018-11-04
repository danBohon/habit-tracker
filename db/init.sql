drop table if exists users;
drop table if exists habits;

create table users (
    id serial primary key,
    auth0_id text,
    name varchar(20),
    password varchar(20),
    email varchar(30),
    picture text
);

create table habits (
    id serial primary key,
    user_id int references users (id),
    title varchar (45),
    start_date date not null default current_date,
    goal int
);

insert into users (name, password, email, picture)
values ( 'First User', 'pass123', 'email@gmail.com', 'https://robohash.org/86.125.239.86.png');

insert into users (name, password, email, picture)
values ( 'Second User', 'pass123', 'myemail@gmail.com', 'https://robohash.org/86.125.239.86.png');

insert into habits (user_id, title, start_date, goal)
values (1, 'Gym','2018-10-22', 20);

insert into habits (user_id, title, start_date, goal)
values (2, 'Meditate', '2018-10-25', 66);

select * from habits;
select * from users;