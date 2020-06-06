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
--ALTER TABLE personalRecipes DROP COLUMN instructions;
Select * From personalInstructions
Insert into personalRecipes values (1, '9b6c41d7-009e-4994-801e-18a8bf440951', 'Pizza', 'url', '45', '0', '1', '0', '4');
Insert into personalRecipes values (2, '9b6c41d7-009e-4994-801e-18a8bf440951', 'Burger', 'url', '60', '0', '0', '0', '2');
Insert into personalRecipes values (3, 'e54d4785-6620-4d28-aa73-dc8c58625cb8', 'Pasta', 'url', '60', '0', '0', '0', '2');
Insert into personalRecipes values (4, 'e54d4785-6620-4d28-aa73-dc8c58625cb8', 'Steak', 'url', '60', '0', '0', '0', '2');

CREATE TABLE [dbo].[personalIngredients](
	[recipe_id] [varchar](300) NOT NULL,
	[ingredient] [varchar](300) NOT NULL,
	[amount] [int] NOT NULL,
	[measuringUnit] [varchar](300) NOT NULL,
	PRIMARY KEY (recipe_id, ingredient),
	FOREIGN KEY (recipe_id) REFERENCES personalRecipes(recipe_id)
)
Insert into personalIngredients values (1, 'flour', 2, 'cups');
Insert into personalIngredients values (1, 'water', 3, 'cups');
Insert into personalIngredients values (2, 'flour', 2, 'cups');
Insert into personalIngredients values (2, 'water', 3, 'cups');
Insert into personalIngredients values (2, 'yeast', 1, 'tablespoon');
Insert into personalIngredients values (3, 'flour', 2, 'cups');
Insert into personalIngredients values (3, 'water', 3, 'cups');
Insert into personalIngredients values (3, 'yeast', 1, 'tablespoon');
Insert into personalIngredients values (4, 'flour', 2, 'cups');
Insert into personalIngredients values (4, 'water', 3, 'cups');

CREATE TABLE [dbo].[personalInstructions](
	[recipe_id] [varchar](300) NOT NULL,
	[number] [int] NOT NULL,
	[description] [varchar](300) NOT NULL,
	PRIMARY KEY (recipe_id, description),
	FOREIGN KEY (recipe_id) REFERENCES personalRecipes(recipe_id)
)
Insert into personalInstructions values (1, 1, 'mix flour');
Insert into personalInstructions values (1, 2, 'add water');
Insert into personalInstructions values (1, 3, 'stir');
Insert into personalInstructions values (2, 1, 'mix flour');
Insert into personalInstructions values (2, 2, 'add water');
Insert into personalInstructions values (2, 3, 'stir');
Insert into personalInstructions values (3, 1, 'mix flour');
Insert into personalInstructions values (3, 2, 'add water');
Insert into personalInstructions values (3, 3, 'stir');
Insert into personalInstructions values (4, 1, 'mix flour');
Insert into personalInstructions values (4, 2, 'add water');
Insert into personalInstructions values (4, 3, 'stir');


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
select * from familyRecipes
Insert into familyRecipes values (13, 'e54d4785-6620-4d28-aa73-dc8c58625cb8', 'cheesecake', 'Savta Sara', 'shavuot', 'url');
Insert into familyRecipes values (12, 'e54d4785-6620-4d28-aa73-dc8c58625cb8', 'Honey Mustard Salad Dressing', 'Dafna Avinun', 'dinner', 'url');

CREATE TABLE [dbo].[familyIngredients](
	[recipe_id] [varchar](300) NOT NULL,
	[ingredient] [varchar](300) NOT NULL,
	[amount] [int] NOT NULL,
	[measuringUnit] [varchar](300) NOT NULL,
	PRIMARY KEY (recipe_id, ingredient),
	FOREIGN KEY (recipe_id) REFERENCES familyRecipes(recipe_id)
)
Insert into familyIngredients values (13, 'white cheese', '5', 'cups');
Insert into familyIngredients values (13, 'flour', '3', 'cups');
Insert into familyIngredients values (12, 'honey', '2', 'tablespoons');
Insert into familyIngredients values (12, 'mustard', '1', 'tablespoon');


CREATE TABLE [dbo].[familyInstructions](
	[recipe_id] [varchar](300) NOT NULL,
	[number] [int] NOT NULL,
	[description] [varchar](300) NOT NULL,
	PRIMARY KEY (recipe_id, description),
	FOREIGN KEY (recipe_id) REFERENCES familyRecipes(recipe_id)
)
Insert into familyInstructions values (13, 1, 'mix cheese and flour');
Insert into familyInstructions values (13, 2, 'add water');
Insert into familyInstructions values (12, 1, 'mix all the ingredients');
Insert into familyInstructions values (12, 2, 'stir well');


CREATE TABLE [dbo].[lastSeen](
	[recipe_id] [varchar] (300) NOT NULL,
	[author] [UNIQUEIDENTIFIER] NOT NULL,
	[time] datetime NOT NULL default getdate(),
	PRIMARY KEY (recipe_id, author),
	FOREIGN KEY (author) REFERENCES users(user_id)
)
Insert into lastSeen (recipe_id, author) values (98321, '9b6c41d7-009e-4994-801e-18a8bf440951');
Insert into lastSeen (recipe_id, author) values (5426, 'e54d4785-6620-4d28-aa73-dc8c58625cb8');
Insert into lastSeen (recipe_id, author) values (3453, 'e54d4785-6620-4d28-aa73-dc8c58625cb8');

CREATE TABLE [dbo].[favoriteRecipes](
	[recipe_id] [varchar] (300) NOT NULL,
	[author] [UNIQUEIDENTIFIER] NOT NULL,
	PRIMARY KEY (recipe_id, author),
	FOREIGN KEY (author) REFERENCES users(user_id)
)
Insert into favoriteRecipes (recipe_id, author) values (987646, '9b6c41d7-009e-4994-801e-18a8bf440951');
Insert into favoriteRecipes (recipe_id, author) values (12324354, 'e54d4785-6620-4d28-aa73-dc8c58625cb8');
Insert into favoriteRecipes (recipe_id, author) values (5423, 'e54d4785-6620-4d28-aa73-dc8c58625cb8');
