CREATE TABLE [dbo].[personalRecipes](
	[recipe_id] [varchar](300),
	[author] [UNIQUEIDENTIFIER] NOT NULL,
	[recipeName] [varchar](300) NOT NULL,
	[urlPic] [varchar](300) NOT NULL,
	[prepTime] [int] NOT NULL,
	[isVegan] [BIT] NOT NULL,
	[isVegetarian] [BIT] NOT NULL,
	[glutenFree] [BIT] NOT NULL,
	--[instructions] [varchar](300) NOT NULL,
	[numOfMeals] [int] NOT NULL,
	--[ingredients] [varchar](MAX) NOT NULL,
	--[numOfLikes] [int](300),
	PRIMARY KEY (recipe_id),
	FOREIGN KEY (author) REFERENCES users(user_id)
)

CREATE TABLE [dbo].[personalIngredients](
	[recipe_id] [varchar](300) NOT NULL,
	[number] [int] NOT NULL,
	[ingredient] [varchar](300) NOT NULL,
	[amount] [varchar](300) NOT NULL,
	[measuringUnit] [varchar](300) NOT NULL,
	PRIMARY KEY (recipe_id, ingredient),
	FOREIGN KEY (recipe_id) REFERENCES personalRecipes(recipe_id)
)

CREATE TABLE [dbo].[personalInstructions](
	[recipe_id] [varchar](300) NOT NULL,
	[number] [int] NOT NULL,
	[description] [varchar](300) NOT NULL,
	PRIMARY KEY (recipe_id, description),
	FOREIGN KEY (recipe_id) REFERENCES personalRecipes(recipe_id)
)

CREATE TABLE [dbo].[familyRecipes](
	[recipe_id] [varchar] (300) NOT NULL,
	[author] [UNIQUEIDENTIFIER] NOT NULL,
	[recipeName] [varchar](300) NOT NULL,
	[recipeOwner] [varchar] (300) NOT NULL,
	[whenUsuallyMakeRecipe] [varchar] (300) NOT NULL,
	--[instructions] [varchar](300) NOT NULL,
	[urlPic] [varchar](300) NOT NULL,
	PRIMARY KEY (recipe_id),
	FOREIGN KEY (author) REFERENCES users(user_id)
)

CREATE TABLE [dbo].[familyIngredients](
	[recipe_id] [varchar](300) NOT NULL,
	[number] [int] NOT NULL,
	[ingredient] [varchar](300) NOT NULL,
	[amount] [varchar](300) NOT NULL,
	[measuringUnit] [varchar](300) NOT NULL,
	PRIMARY KEY (recipe_id, ingredient),
	FOREIGN KEY (recipe_id) REFERENCES familyRecipes(recipe_id)
)


CREATE TABLE [dbo].[familyInstructions](
	[recipe_id] [varchar](300) NOT NULL,
	[number] [int] NOT NULL,
	[description] [varchar](300) NOT NULL,
	PRIMARY KEY (recipe_id, description),
	FOREIGN KEY (recipe_id) REFERENCES familyRecipes(recipe_id)
)


CREATE TABLE [dbo].[lastSeen](
	[recipe_id] [varchar] (300) NOT NULL,
	[author] [UNIQUEIDENTIFIER] NOT NULL,
	[time] datetime NOT NULL default getdate(),
	PRIMARY KEY (recipe_id, author),
	FOREIGN KEY (author) REFERENCES users(user_id)
)

SELECT * FROM lastSeen
Insert into lastSeen (recipe_id, author) values (630293, '9b6c41d7-009e-4994-801e-18a8bf440951');
Insert into lastSeen (recipe_id, author) values (630293, 'e54d4785-6620-4d28-aa73-dc8c58625cb8');
Insert into lastSeen (recipe_id, author) values (559251, 'e54d4785-6620-4d28-aa73-dc8c58625cb8');
Insert into lastSeen (recipe_id, author) values (492560, 'e54d4785-6620-4d28-aa73-dc8c58625cb8');

CREATE TABLE [dbo].[favoriteRecipes](
	[recipe_id] [varchar] (300) NOT NULL,
	[author] [UNIQUEIDENTIFIER] NOT NULL,
	PRIMARY KEY (recipe_id, author),
	FOREIGN KEY (author) REFERENCES users(user_id)
)
Insert into favoriteRecipes (recipe_id, author) values (492560, '9b6c41d7-009e-4994-801e-18a8bf440951');
Insert into favoriteRecipes (recipe_id, author) values (559251, 'e54d4785-6620-4d28-aa73-dc8c58625cb8');
Insert into favoriteRecipes (recipe_id, author) values (630293, 'e54d4785-6620-4d28-aa73-dc8c58625cb8');
