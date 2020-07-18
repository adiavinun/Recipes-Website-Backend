CREATE TABLE [dbo].[personalRecipes](
	[id] [varchar](300),
	[author] [UNIQUEIDENTIFIER] NOT NULL,
	[title] [varchar](300) NOT NULL,
	[image] [varchar](300) NOT NULL,
	[readyInMinutes] [int] NOT NULL,
	[vegan] [BIT] NOT NULL,
	[vegetarian] [BIT] NOT NULL,
	[glutenFree] [BIT] NOT NULL,
	--[instructions] [varchar](300) NOT NULL,
	[servings] [int] NOT NULL,
	--[ingredients] [varchar](MAX) NOT NULL,
	--[numOfLikes] [int](300),
	PRIMARY KEY (id),
	FOREIGN KEY (author) REFERENCES users(user_id)
)
EXEC sp_RENAME 'personalRecipes.numOfMeals', 'servings', 'COLUMN'
select * from personalIngredients

CREATE TABLE [dbo].[personalIngredients](
	[id] [varchar](300) NOT NULL,
	[number] [int] NOT NULL,
	[nameAndAmount] [varchar](300) NOT NULL,
	PRIMARY KEY (id, nameAndAmount),
	FOREIGN KEY (id) REFERENCES personalRecipes(id)
)
drop table personalIngredients

CREATE TABLE [dbo].[personalInstructions](
	[id] [varchar](300) NOT NULL,
	[number] [int] NOT NULL,
	[description] [varchar](300) NOT NULL,
	PRIMARY KEY (id, description),
	FOREIGN KEY (id) REFERENCES personalRecipes(id)
)

CREATE TABLE [dbo].[familyRecipes](
	[id] [varchar] (300) NOT NULL,
	[author] [UNIQUEIDENTIFIER] NOT NULL,
	[title] [varchar](300) NOT NULL,
	[recipeOwner] [varchar] (300) NOT NULL,
	[whenUsuallyMakeRecipe] [varchar] (300) NOT NULL,
	--[instructions] [varchar](300) NOT NULL,
	[image] [varchar](300) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (author) REFERENCES users(user_id)
)
EXEC sp_RENAME 'favoriteRecipes.recipe_id', 'id', 'COLUMN'


CREATE TABLE [dbo].[familyIngredients](
	[id] [varchar](300) NOT NULL,
	[number] [int] NOT NULL,
	[nameAndAmount] [varchar](300) NOT NULL,
	PRIMARY KEY (id, nameAndAmount),
	FOREIGN KEY (id) REFERENCES familyRecipes(id)
)
select * from familyInstructions

CREATE TABLE [dbo].[familyInstructions](
	id] [varchar](300) NOT NULL,
	[number] [int] NOT NULL,
	[description] [varchar](300) NOT NULL,
	PRIMARY KEY (id, description),
	FOREIGN KEY (id) REFERENCES familyRecipes(id)
)


CREATE TABLE [dbo].[lastSeen](
	[id] [varchar] (300) NOT NULL,
	[author] [UNIQUEIDENTIFIER] NOT NULL,
	[time] datetime NOT NULL default getdate(),
	PRIMARY KEY (id, author),
	FOREIGN KEY (author) REFERENCES users(user_id)
)

SELECT * FROM lastSeen
Insert into lastSeen (recipe_id, author) values (630293, '9b6c41d7-009e-4994-801e-18a8bf440951');
Insert into lastSeen (recipe_id, author) values (630293, 'e54d4785-6620-4d28-aa73-dc8c58625cb8');
Insert into lastSeen (recipe_id, author) values (559251, 'e54d4785-6620-4d28-aa73-dc8c58625cb8');
Insert into lastSeen (recipe_id, author) values (492560, 'e54d4785-6620-4d28-aa73-dc8c58625cb8');

CREATE TABLE [dbo].[favoriteRecipes](
	[id] [varchar] (300) NOT NULL,
	[author] [UNIQUEIDENTIFIER] NOT NULL,
	PRIMARY KEY (id, author),
	FOREIGN KEY (author) REFERENCES users(user_id)
)
Insert into favoriteRecipes (id, author) values (492560, '9b6c41d7-009e-4994-801e-18a8bf440951');
Insert into favoriteRecipes (id, author) values (559251, 'e54d4785-6620-4d28-aa73-dc8c58625cb8');
Insert into favoriteRecipes (id, author) values (630293, 'e54d4785-6620-4d28-aa73-dc8c58625cb8');
select * from favoriteRecipes

drop table lastSeen