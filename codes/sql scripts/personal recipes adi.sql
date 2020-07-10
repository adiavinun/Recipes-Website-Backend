--------------------------OATMEAL RAISIN COOKES-------------------

Insert into personalRecipes values (31, 'e54d4785-6620-4d28-aa73-dc8c58625cb8', 'Oatmeal Raisin Cookies', 'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2014/07/easy-oatmeal-raisin-cookies-6.jpg', '45', '0', '1', '0', '48');

Insert into personalIngredients values (31, 1, '1 cup canola oil');
Insert into personalIngredients values (31, 2, '1 cup packed brown sugar');
Insert into personalIngredients values (31, 3, '2 eggs');
Insert into personalIngredients values (31, 4, '1 teaspoon vanilla extract');
Insert into personalIngredients values (31, 5, 't cup flour');
Insert into personalIngredients values (31, 6, '1/2 teaspoon baking soda');
Insert into personalIngredients values (31, 7, '1/2 teaspoon salt');
Insert into personalIngredients values (31, 8, '1 teaspoon ground cinnamon');
Insert into personalIngredients values (31, 9, '1/2 teaspoon ground nutmeg');
Insert into personalIngredients values (31, 10, '4 cups rolled oats');
Insert into personalIngredients values (31, 11, '1 cup raisins');

Insert into personalInstructions values (31, 1, 'Preheat oven to 175 degrees Celsius. Grease cookie sheets.');
Insert into personalInstructions values (31, 2, 'In a large bowl, mix canola oil, brown sugar, eggs and vanilla until well blended. Combine the flour, baking soda, salt, cinnamon and nutmeg; stir into the sugar mixture. Mix in the oats and raisins last. Drop by rounded spoonfuls onto the prepared cookie sheet.');
Insert into personalInstructions values (31, 3, 'Bake for 10 to 12 minutes in the preheated oven. Allow cookies to cool on baking sheet for 5 minutes before removing to a wire rack to cool completely.');

--------------------------THE BEST CHOCOLATE CAKE-------------------

Insert into personalRecipes values (32, 'e54d4785-6620-4d28-aa73-dc8c58625cb8', 'The Best Chocolate Cake', 'https://lilluna.com/wp-content/uploads/2019/01/Chocolate-Cake103.jpg', '45', '0', '1', '0', '24');

Insert into personalIngredients values (32, 1, '2 cups flour');
Insert into personalIngredients values (32, 2, '2 cups sugar');
Insert into personalIngredients values (32, 3, '2 cups unsweetened cocoa powder');
Insert into personalIngredients values (32, 4, '2 teaspoons baking powder');
Insert into personalIngredients values (32, 5, '1 1/2 teaspoons baking soda');
Insert into personalIngredients values (32, 6, '1 teaspoon salt');
Insert into personalIngredients values (32, 7, '1 cup milk');
Insert into personalIngredients values (32, 8, '1/2 cup canola oil');
Insert into personalIngredients values (32, 9, '2 eggs');
Insert into personalIngredients values (32, 10, '2 teaspoons vanilla extract');
Insert into personalIngredients values (32, 11, '1 cup boiling water');

Insert into personalInstructions values (32, 1, 'Preheat oven to 180 degrees Celsius.');
Insert into personalInstructions values (32, 2, 'Add flour, sugar, cocoa, baking powder, baking soda and salt to a large bowl. Whisk through until combined well.');
Insert into personalInstructions values (32, 3, 'Add milk, vegetable oil, eggs, and vanilla to flour mixture and mix together on medium speed until well combined. Reduce speed and carefully add boiling water to the cake batter until well combined.');
Insert into personalInstructions values (32, 4, 'Distribute cake batter evenly to a cake pan. Bake for 30-35 minutes, until a toothpick inserted in the center of the chocolate cake comes out clean.');
Insert into personalInstructions values (32, 5, 'Remove from the oven and allow to cool for about 10 minutes, remove from the pan and cool completely.');

---------------------------Alfajores Balls-----------------------------------

Insert into personalRecipes values (33, 'e54d4785-6620-4d28-aa73-dc8c58625cb8', 'Alfajores Balls', 'https://w6h4g7y3.stackpathcdn.com/wp-content/uploads/2019/09/%D7%9B%D7%93%D7%95%D7%A8%D7%99-%D7%90%D7%9C%D7%A4%D7%97%D7%95%D7%A8%D7%A1-1-518x470.jpg', '20', '0', '1', '0', '40');

Insert into personalIngredients values (33, 1, '500 grams petit beurre biscuits');
Insert into personalIngredients values (33, 2, '250 ml sweet cream');
Insert into personalIngredients values (33, 3, '100 grams butter');
Insert into personalIngredients values (33, 4, '4 tablespoons dulce de leche');
Insert into personalIngredients values (33, 5, '1/2 cup shredded coconut');

Insert into personalInstructions values (33, 1, 'Crumble the biscuits in a food processor or manually grind until finely ground.');
Insert into personalInstructions values (33, 3, 'Add sweet cream to the biscuits.');
Insert into personalInstructions values (33, 2, 'Melt the dulce de leche and butter in the microwave, let cool for a bit and combine with the mixture.');
Insert into personalInstructions values (33, 4, 'Roll the mixture into balls, roll in coconut and put in the fridge for several hours.');




drop table personalRecipes CASCADE CONSTRAINTS;
ALTER TABLE personalRecipes NOCHECK CONSTRAINT all
DROP TABLE personalIngredients
select * from familyIngredients

DELETE FROM personalIngredients WHERE recipe_id= 31;
