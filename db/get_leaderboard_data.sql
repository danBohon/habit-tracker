select
    u.name, count (checked)
from
    dates d
join
    users u
on
    d.user_id = u.id
where
    checked != false and u.public != false
group by
    u.name, d.user_id;