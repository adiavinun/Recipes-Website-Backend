const DButils = require("./DButils");

async function getUserInfoOnRecipes(user_id, idArray) {
  var dict = new Object();
  var watched = false;
  var saved = false;
  var watchedRecipes = (
    await DButils.execQuery(
      `SELECT id FROM dbo.lastSeen WHERE author= '${user_id}'`
    )
  );
  var savedRecipes = (
    await DButils.execQuery(
      `SELECT id FROM dbo.favoriteRecipes WHERE author= '${user_id}'`
    )
  );
  var i;
  for (i = 0; i < idArray.length; i++) {
    var checkWatched = checkIfRecipeInside(watchedRecipes, idArray[i]);
    if (watchedRecipes && checkWatched == 'true') {
      watched = true;
    }
    var checkSaved = checkIfRecipeInside(savedRecipes, idArray[i]);
    if (savedRecipes && checkSaved == 'true') {
      saved = true;
    }
    var dictId = new Object();
    dictId.watched = watched;
    dictId.saved = saved;
    dict[idArray[i]] = dictId;
    watched = false;
    saved = false;
  }
  return (dict);
}
function checkIfRecipeInside(recipeList, recId) {
  var i;
  for (i = 0; i < recipeList.length; i++) {
    if (recipeList[i].id == recId) {
      return "true";
    }
  }
  return "false";
}

/********************PERSONAL RECIPES**********************************************/

async function getMyPersonalRecipesPreview(user_id) {

  let myPersRec = (
    await DButils.execQuery(
      `SELECT id, title, image, readyInMinutes, vegan, vegetarian, glutenFree 
          FROM dbo.personalRecipes WHERE author= '${user_id}'`
    )
  );
  if (!myPersRec) {
    throw { status: 401, message: "no personal recipes" };
  }
  let myPersRecArr = [];
  for (i = 0; i < myPersRec.length; i++) {
    myPersRecArr.push(myPersRec[i]);
  }
  
  return (myPersRecArr);
}


async function getMyPersonalRecipeFull(user_id, recipe_id) {
  try {
    var myPersRec = (
      await DButils.execQuery(
        `SELECT id, title, image, readyInMinutes, vegan, vegetarian, glutenFree, servings
            FROM dbo.personalRecipes WHERE author= '${user_id}' AND id= '${recipe_id}'`
      )
    )[0];
    if (!myPersRec) {
      throw { status: 401, message: "user doesnt have this recipe id" };
    }
    let personalIngredients = (
      await DButils.execQuery(
        `SELECT nameAndAmount FROM dbo.personalIngredients WHERE id= '${recipe_id}' ORDER BY number ASC`
      )
    );
    let personalInstructions = (
      await DButils.execQuery(
        `SELECT number, description FROM dbo.personalInstructions WHERE id= '${recipe_id}' ORDER BY number ASC`
      )
    );
    myPersRec.ingredients = personalIngredients;
    myPersRec.instructions = personalInstructions;
    
  } catch (error) {
    throw error;
  }
  return (myPersRec);
}

/*************************FAMILY RECIPES******************************************/
async function getMyFamilyRecipesPreview(user_id) {

  let myFamRec = (
    await DButils.execQuery(
      `SELECT * FROM dbo.familyRecipes WHERE author= '${user_id}'`
    )
  );
  if (!myFamRec) {
    throw { status: 401, message: "no family recipes" };
  }
  let myFamRecArr = [];
  for (i = 0; i < myFamRec.length; i++) {
    myFamRecArr.push(myFamRec[i]);
  }
  return (myFamRecArr);
}

async function getMyFamilyRecipesFull(user_id, recipe_id) {
  try {
    var myFamRec = (
      await DButils.execQuery(
        `SELECT * FROM dbo.familyRecipes WHERE author= '${user_id}' AND id= '${recipe_id}'`
      )
    )[0];
    if (!myFamRec) {
      throw { status: 401, message: "user doesnt have this recipe id" };
    }
    let familyIngredients = (
      await DButils.execQuery(
        `SELECT ingredient, amount, measuringUnit FROM dbo.familyIngredients WHERE id= '${recipe_id}' ORDER BY number ASC`
      )
    );
    let familyInstructions = (
      await DButils.execQuery(
        `SELECT number, description FROM dbo.familyInstructions WHERE id= '${recipe_id}' ORDER BY number ASC`
      )
    );
    myFamRec.ingredients = familyIngredients;
    myFamRec.instructions = familyInstructions;
  } catch (error) {
    throw error;
  }
  return (myFamRec);
}

/***************************MY FAVORITE RECIPES*************************************/

async function getMyFavRecipesID(user_id) {

  let myFavRec = (
    await DButils.execQuery(
      `SELECT id FROM dbo.favoriteRecipes WHERE author= '${user_id}'`
    )
  );
  if (!myFavRec) {
    throw { status: 401, message: "no favorite recipes" };
  }
  let favRecipesIDArr = [];
  for (i = 0; i < myFavRec.length; i++) {
    favRecipesIDArr.push(myFavRec[i].id);
  }
  return (favRecipesIDArr);
}

async function addFavRecipe(user_id, recipe_id) {
  let favRecipe = (
    await DButils.execQuery(
      `SELECT id FROM dbo.favoriteRecipes WHERE id= '${recipe_id}' AND author= '${user_id}'`
    )
  );
  if (!favRecipe || favRecipe.length == 0) {
    await DButils.execQuery(
      `INSERT INTO dbo.favoriteRecipes (id, author) VALUES ('${recipe_id}','${user_id}');`
    );
  }
}

/***************************LAST SEEN RECIPES*************************************/


async function getLast3SeenRecipes(user_id) {

  let lastSeenRecipes = (
    await DButils.execQuery(
      `SELECT TOP 3 id FROM dbo.lastSeen WHERE author= '${user_id}' ORDER BY time DESC`
    )
  );
  if (!lastSeenRecipes) {
    throw { status: 401, message: "no last seen recipes" };
  }
  let lastSeenRecipesArr = [];
  for (var i = 0; i < lastSeenRecipes.length; i++) {
    lastSeenRecipesArr.push(lastSeenRecipes[i].id);
  }
  return (lastSeenRecipesArr);
}

async function addSeenRecipe(user_id, recipe_id) {
  let lastSeenRecipes = (
    await DButils.execQuery(
      `SELECT id FROM dbo.lastSeen WHERE id= '${recipe_id}' AND author= '${user_id}'`
    )
  );
  if (lastSeenRecipes && lastSeenRecipes.length > 0) {
    await DButils.execQuery(
      `DELETE FROM dbo.lastSeen WHERE id= '${recipe_id}' AND author= '${user_id}'`
    );
  }
  await DButils.execQuery(
    `INSERT INTO dbo.lastSeen (id, author) VALUES ('${recipe_id}','${user_id}');`
  );
}


exports.getUserInfoOnRecipes = getUserInfoOnRecipes;
exports.getLast3SeenRecipes = getLast3SeenRecipes;
exports.getMyPersonalRecipesPreview = getMyPersonalRecipesPreview;
exports.getMyPersonalRecipeFull = getMyPersonalRecipeFull;
exports.getMyFavRecipesID = getMyFavRecipesID;
exports.getMyFamilyRecipesPreview = getMyFamilyRecipesPreview;
exports.getMyFamilyRecipesFull = getMyFamilyRecipesFull;
exports.addSeenRecipe = addSeenRecipe;
exports.addFavRecipe = addFavRecipe;




