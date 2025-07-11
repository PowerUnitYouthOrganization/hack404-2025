-- SQL script to migrate name and email from users table to application table
-- This updates existing applications with user data based on userId

UPDATE "user"
SET
  "firstName" = COALESCE(profile."preferredFirstName", profile."firstName"),
  "lastName" = profile."lastName",
  "name" = COALESCE(profile."preferredFirstName", profile."firstName") || ' ' || profile."lastName"
FROM profile
WHERE "user".id = profile."userId"
  AND profile."firstName" IS NOT NULL
  AND profile."lastName" IS NOT NULL;

UPDATE application
SET
    "name" = "user"."name",
    "email" = "user"."email"
FROM "user"
WHERE application."userId" = "user".id
  AND "user"."name" IS NOT NULL
  AND "user"."email" IS NOT NULL;

-- SQL script to migrate stream data from application table to user table
-- This updates existing users with stream data based on userId

UPDATE "user"
SET
    "stream" = application."stream"
FROM application
WHERE "user".id = application."userId"
  AND application."stream" IS NOT NULL;
