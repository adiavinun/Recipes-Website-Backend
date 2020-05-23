CREATE TABLE [dbo].[recipes](
	[recipe_id] [UNIQUEIDENTIFIER] NOT NULL default NEWID(),
	[author] [UNIQUEIDENTIFIER] NOT NULL,
	[recipeName] [varchar](300) NOT NULL,
	[urlOfProfilePic] [varchar](300) NOT NULL,
	[prepTime] [varchar](300) NOT NULL,
	[isVegan] [BIT](1) NOT NULL,
	[isVegetarian] [BIT](1) NOT NULL,
	[isGluten] [BIT](1) NOT NULL,
	[instructions] [varchar](300) NOT NULL,
	[ingredients] [varchar](MAX) NOT NULL,
	[numOfLikes] [int](300),
	PRIMARY KEY (author, recipeName),
	FOREIGN KEY (author) REFERENCES users(user_id)
)

