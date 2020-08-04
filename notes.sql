-- Get comments with comment, vote, and award counts
select (
        select u.email
        from users u
        where u.id = c.user_id
    ),
    *,
    --     The below sub-queries are defensive in anticipation of comment votes and awards
    --     (select count(id) as comment_votes from votes v where v.comment_id = comments.id),
    (
        select count(id) as comments
        from comments c
        where c.parent_comment_id = c.id
    ) --     (select count(id) as comment_awards from comment_awards a where a.comment_id = comments.id)
from comments c
where c.post_id = '451e5a6f-c611-4113-a2c9-9e932999aba3'