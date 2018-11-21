update users
set public = not public
where id = ${user_id}
returning *;