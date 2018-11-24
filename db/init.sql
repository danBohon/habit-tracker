drop table if exists dates;
drop table if exists habits;
drop table if exists users;

create table users (
    id serial primary key,
    auth0_id text,
    name varchar(20),
    password varchar(20),
    email varchar(30),
    picture text,
    public boolean
);

create table habits (
    id serial primary key,
    user_id int references users (id),
    title varchar (45),
    start_date date not null,
    goal int
);

create table dates (
    id serial primary key,
    user_id int references users (id),
    habit_id int references habits (id),
    date date,
    checked boolean
);

-- insert into users (name, password, email, picture)
-- values ( 'Second User', 'pass123', 'myemail@gmail.com', 'https://robohash.org/86.125.239.86.png');

-- insert into habits (user_id, title, start_date, goal)
-- values (1, 'Gym','2018-10-22', 20);

-- insert into habits (user_id, title, start_date, goal)
-- values (1, 'Meditate', '2018-10-25', 66) returning id;

select * from habits;
select * from users;
select * from dates;

select h.id, h.user_id, h.title, h.start_date, h.goal, u.auth0_id, u.name, u.email, u.picture
from habits h
join users u
on h.user_id = u.id
where auth0_id = 'github|40422993';

