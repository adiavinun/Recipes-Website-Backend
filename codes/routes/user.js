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

router.get("/recipeInfo/id/:ids", async (req, res) => {
  try {
    if(!req || !req.params || !req.params.ids){
      throw { status: 402, message: "parameters missing" };
    }
    const idArray = JSON.parse(req.params.ids);
    const user_id = req.user.user_id;
    const dictRecipeInfo = await userUtils.getUserInfoOnRecipes(user_id, idArray);
    res.send(dictRecipeInfo);
  } catch (error) {
    console.log(error);
    next(error);
  }
})

/********************PERSONAL RECIPES**********************************************/

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

router.get("/myPersonalRecipeFull/id/:id", async (req, res, next) => {
  try {
    if(!req || !req.params || !req.params.id){
      throw { status: 402, message: "parameters missing" };
    }
    const user_id = req.user.user_id;
    const recipe_id =  req.params.id;
    const recipeInfo = await userUtils.getMyPersonalRecipeFull(user_id, recipe_id);
    res.send(recipeInfo);
  } catch (error) {
    console.log(error);
    next(error);
  }
})

/*************************FAMILY RECIPES******************************************/

router.get("/myFamilyRecipesPreview", async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    const myFamilyRecipes = await userUtils.getMyFamilyRecipesPreview(user_id);
    res.send(myFamilyRecipes);
  } catch (error) {
    console.log(error);
    next(error);
  }
})

router.get("/myFamilyRecipeFull/id/:id", async (req, res, next) => {
  try {
    if(!req || !req.params || !req.params.id){
      throw { status: 402, message: "parameters missing" };
    }
    const user_id = req.user.user_id;
    const recipe_id =  req.params.id;
    const recipeInfo = await userUtils.getMyFamilyRecipesFull(user_id, recipe_id);
    res.send(recipeInfo);
  } catch (error) {
    console.log(error);
    next(error);
  }
})

/***************************MY FAVORITE RECIPES*************************************/

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


router.post('/addFavRecipe', async(req, res, next) => {
  try {
      if(!req.body || !req.body.recipe_id){
          throw { status: 401, message: "parameters missing" };
      }
      const user_id = req.user.user_id;
      const recipe_id = req.body.recipe_id;
      await userUtils.addFavRecipe(user_id ,recipe_id);
      res.status(200).send({ message: "favorite recipe added", success: true });
  } catch (error) {
      next(error);
  }
});


/***************************LAST SEEN RECIPES*************************************/

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


router.post('/addSeenRecipe', async(req, res, next) => {
  try {
      if(!req.body || !req.body.recipe_id){
          throw { status: 401, message: "parameters missing" };
      }
      const user_id = req.user.user_id;
      const recipe_id = req.body.recipe_id;
      await userUtils.addSeenRecipe(user_id ,recipe_id);
      res.status(200).send({ message: "seen recipe added", success: true });
  } catch (error) {
      next(error);
  }
});



module.exports = router;

