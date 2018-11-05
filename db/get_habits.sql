select h.id, h.user_id, h.title, h.start_date, h.goal, u.auth0_id, u.name, u.email, u.picture
from habits h
join users u
on h.user_id = u.id
where auth0_id = ${auth0_id};