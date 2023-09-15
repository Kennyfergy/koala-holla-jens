CREATE TABLE "profile" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" varChar (100),
	"age" int,
	"gender" varChar (1),
	"ready_for_transfer" BOOLEAN DEFAULT FALSE,
	"notes" varChar (250)
	);
INSERT INTO "profile" 
	("name", "age", "gender", "ready_for_transfer", "notes")
VALUES
    ('Scotty', '4', 'M', 'true', 'Born in Guatemala'),
    ('Jean', '5', 'F', 'true', 'Allergic to lots of lava'),
    ('Ororo', '7', 'F', 'false', 'Loves listening to Paula (Abdul)'),
    ('Logan', '15', 'M', 'false', 'Loves the sauna'),
    ('Charlie', '9', 'M', 'true', 'Favorite band is Nirvana'),
    ('Betsy', '4', 'F', 'true', 'Has a pet iguana');
    
SELECT * FROM "profile";
   
    
	
