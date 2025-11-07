CREATE TABLE "messages" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"tg_id" integer NOT NULL,
	"text" varchar(1000),
	"user_id" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"tg_id" integer NOT NULL,
	CONSTRAINT "users_tg_id_unique" UNIQUE("tg_id")
);
