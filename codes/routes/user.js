var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const userUtils = require("./utils/userUtils.js");
const recipeUtils = require("./utils/search_recipes.js");
const bcrypt = require("bcrypt");

//Authenticate
router.use(async (req, res, next) => {
  if (req.session && req.session.user_id) {
    //const id = req.session.id;
    const user = (
      await DButils.execQuery(
        `SELECT * FROM dbo.users WHERE user_id = '${req.session.user_id}'`
      )
    )[0];
    if (user) {
      req.user = user;
      next();
    }
  }
  else res.sendStatus(401);
});

//checked
router.get("/recipeInfo/:ids", async (req, res) => {
  try {
    const idArray = JSON.parse(req.params.ids);
    const user_id = req.user.user_id;
    const dictRecipeInfo = await userUtils.getUserInfoOnRecipes(user_id, idArray);
    res.send(dictRecipeInfo);
  } catch (error) {
    console.log(error);
    next(error);
  }
})


//need to check
router.get("/last3SeenRecipes", async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    const lastSeenRecipeID = await userUtils.getLast3SeenRecipes(user_id);
    const lastSeenRecipeInfo = await recipeUtils.getRecipesInfo(lastSeenRecipeID);
    res.send(lastSeenRecipeInfo);
  } catch (error) {
    next(error);
  }
})

//checked
router.get("/myPersonalRecipesPreview", async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    const recipeInfo = await userUtils.getMyPersonalRecipesPreview(user_id);
    res.send(recipeInfo);
  } catch (error) {
    console.log(error);
    next(error);
  }
})

//checked
router.get("/myPersonalRecipeFull/:id", async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    const recipe_id =  req.params.id;
    const recipeInfo = await userUtils.getMyPersonalRecipeFull(user_id, recipe_id);
    res.send(recipeInfo);
  } catch (error) {
    console.log(error);
    next(error);
  }
})

//need to check
router.get("/myFavRecipes", async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    const myFavRecipesID = await userUtils.getMyFavRecipesID(user_id);
    const myFavRecipesInfo = await recipeUtils.getRecipesInfo(myFavRecipesID);
    res.send(myFavRecipesInfo);
  } catch (error) {
    console.log(error);
    next(error);
  }
})

//checked
router.get("/myFamilyRecipes", async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    const myFamilyRecipes = await userUtils.getMyFamilyRecipes(user_id);
    res.send(myFamilyRecipes);
  } catch (error) {
    console.log(error);
    next(error);
  }
})


module.exports = router;

