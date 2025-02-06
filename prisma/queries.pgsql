-- INSERT INTO "ChatPartecipation" ("userId", "chatId") VALUES (27, 5);

-- INSERT INTO "Chat" (name) VALUES ('friends group');

SELECT * FROM "Chat";
SELECT * FROM "User";
-- SELECT * FROM "Message";
SELECT * FROM "ChatPartecipation";


-- find the chat with the user (userId) 27 in it
-- SELECT c.*
-- FROM "Chat" c
-- JOIN "ChatPartecipation" cp ON c.id = cp."chatId"
-- WHERE cp."userId" = 27;