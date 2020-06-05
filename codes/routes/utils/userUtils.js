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
      dict[i] = dictId;
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

exports.getUserInfoOnRecipes = getUserInfoOnRecipes;
