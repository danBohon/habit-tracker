select * 
from habits h
join users u
on h.user_id = u.id
where auth0_id = ${auth0_id};