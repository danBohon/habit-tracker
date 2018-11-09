select
    count (checked)
from
    dates
where
    checked != false and user_id = ${user_id}

