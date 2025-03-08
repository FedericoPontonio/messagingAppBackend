INSERT INTO "ChatPartecipation" ("userId", "chatId") VALUES (365, 5);

-- INSERT INTO "Chat" (name) VALUES ('friends group');

SELECT * FROM "Chat";
SELECT * FROM "User";
SELECT * FROM "Message";
SELECT * FROM "ChatPartecipation";

-- these 2 are equivalent with the only difference being the order of the join
    -- find the chat with the user (userId) 27 in it
    -- SELECT c.*
    -- FROM "Chat" c
    -- JOIN "ChatPartecipation" cp ON c.id = cp."chatId"
    -- WHERE cp."userId" = 21;

    -- find the chats unser 27 is partecipating in
    -- SELECT c.*
    -- FROM "User" u
    -- JOIN "ChatPartecipation" cp ON u.id = cp."userId"
    -- JOIN "Chat" c ON cp."chatId" = c.id
    -- WHERE u.id = 21;

-- 