const DButils = require("./DButils");

async function getUserInfoOnRecipes(user_id, idArray) {
  var dict = new Object();
  var watched = false;
  var saved = false;
  var watchedRecipes = (
    await DButils.execQuery(
      `SELECT recipe_id FROM dbo.lastSeen WHERE author= '${user_id}'`
    )
  );
  var savedRecipes = (
    await DButils.execQuery(
      `SELECT recipe_id FROM dbo.favoriteRecipes WHERE author= '${user_id}'`
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
    if (recipeList[i].recipe_id == recId) {
      return "true";
    }
  }
  return "false";
}

async function getLast3SeenRecipes(user_id) {

  let lastSeenRecipes = (
    await DButils.execQuery(
      `SELECT TOP 3 recipe_id FROM dbo.lastSeen WHERE author= '${user_id}' ORDER BY time DESC`
    )
  );
  let lastSeenRecipesArr = [];
  if (lastSeenRecipes || lastSeenRecipes.length != 0) {
    for (i = 0; i < lastSeenRecipes.length; i++) {
      lastSeenRecipesArr.push(lastSeenRecipes[i].recipe_id);
    }
  }
  return (lastSeenRecipesArr);
}

async function getMyPersonalRecipesPreview(user_id) {

  let myPersRec = (
    await DButils.execQuery(
      `SELECT recipe_id, recipeName, urlPic, prepTime, isVegan, isVegetarian, glutenFree 
          FROM dbo.personalRecipes WHERE author= '${user_id}'`
    )
  );
  return (myPersRec);
}
async function getMyPersonalRecipesID(user_id) {

  let myPersRecID = (
    await DButils.execQuery(
      `SELECT recipe_id FROM dbo.personalRecipes WHERE author= '${user_id}'`
    )
  );
  return (myPersRecID);
}
async function getMyPersonalRecipeFull(user_id, recipe_id) {
  try {
    var myPersRec = (
      await DButils.execQuery(
        `SELECT recipe_id, recipeName, urlPic, prepTime, isVegan, isVegetarian, glutenFree, numOfMeals
            FROM dbo.personalRecipes WHERE author= '${user_id}' AND recipe_id= '${recipe_id}'`
      )
    )[0];
    if (!myPersRec) {
      throw { status: 401, message: "no personal recipes" };
    }
    let personalIngredients = (
      await DButils.execQuery(
        `SELECT ingredient, amount, measuringUnit FROM dbo.personalIngredients WHERE recipe_id= '${recipe_id}'`
      )
    );
    let personalInstructions = (
      await DButils.execQuery(
        `SELECT number, description FROM dbo.personalInstructions WHERE recipe_id= '${recipe_id}' ORDER BY number ASC`
      )
    );
    myPersRec.ingredients = personalIngredients;
    myPersRec.instructions = personalInstructions;
  } catch (error) {
    throw error;
  }
  return (myPersRec);
}
async function getMyFavRecipesID(user_id) {

  let myFavRec = (
    await DButils.execQuery(
      `SELECT recipe_id FROM dbo.favoriteRecipes WHERE author= '${user_id}'`
    )
  );
  let favRecipesIDArr = [];
  if (myFavRec || myFavRec.length != 0) {
    for (i = 0; i < myFavRec.length; i++) {
      favRecipesIDArr.push(myFavRec[i].recipe_id);
    }
  }
  return (favRecipesIDArr);
}

async function getMyFamilyRecipes(user_id) {

  var myFamRec = (
    await DButils.execQuery(
      `SELECT * FROM dbo.familyRecipes WHERE author= '${user_id}'`
    )
  );
  if (!myFamRec) {
    throw { status: 401, message: "no family recipes" };
  }
  var dict = new Object();
  for (var i = 0; i < myFamRec.length; i++){
    recipe_id = myFamRec[i].recipe_id;
    let familyIngredients = (
      await DButils.execQuery(
        `SELECT ingredient, amount, measuringUnit FROM dbo.familyIngredients WHERE recipe_id= '${recipe_id}'`
      )
    );
    let familylInstructions = (
      await DButils.execQuery(
        `SELECT number, description FROM dbo.familyInstructions WHERE recipe_id= '${recipe_id}' ORDER BY number ASC`
      )
    );
    myFamRec[i].ingredients = familyIngredients;
    myFamRec[i].instructions = familylInstructions;
    dict[recipe_id] = myFamRec[i];
  }
  return (dict);
}

exports.getUserInfoOnRecipes = getUserInfoOnRecipes;
exports.getLast3SeenRecipes = getLast3SeenRecipes;
exports.getMyPersonalRecipesPreview = getMyPersonalRecipesPreview;
exports.getMyPersonalRecipesID = getMyPersonalRecipesID;
exports.getMyPersonalRecipeFull = getMyPersonalRecipeFull;
exports.getMyFavRecipesID = getMyFavRecipesID;
exports.getMyFamilyRecipes = getMyFamilyRecipes;




