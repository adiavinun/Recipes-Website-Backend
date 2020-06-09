const express = require("express");
const router = express.Router();
const search_util = require("../routes/utils/search_recipes");

/*******************************TEST***************************************/
 /* router.get("/fullRecipeInfo/test", async(req, res) => {
  let res124 = await search_util.getFullRecipeInfo([492560,559251,630293]);
  res.send(res124);
  });
  router.get("/previewRecipeInfo/test", async(req, res) => {
  let res124 = await search_util.getPreviewRecipeInfo([492560,559251,630293]);
  //let res124 = await search_util.getFullRecipeInfo([492560,559251,630293]);
  res.send(res124) ;
  });*/
  //******************** */
  

router.use((req, res, next) => {
  console.log("Recipes routs");
  next();
});

/*******************************ROUTERS***************************************/

 
 /**
  * This function return search recipe by query and amount
  */
router.get("/search/query/:searchQuery/amount/:num", (req, res) => {
  const {searchQuery, num} = req.params;
  //set the params
  search_params = {};
  search_params.query = searchQuery;
  search_params.number = num;
  search_params.instructionsRequired = true;
  
  //check if queries params exist
  search_util.extractQueriesPram(req.query, search_params);
  search_util
    .searchForRecipes(searchQuery, num, search_params)
    .then((info_array) => res.send(info_array))
    /*if(info_array.length === 0){
      res.status(400).send("There are no suitable recipes.");
    }else{
      res.status(200).send(info_array);
    }
   */
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

/**
 * 1.6 - This function return random recipes
 */
router.get("/3randomRecipes", async (req, res, next) => {
  search_params = {};
  search_params.number = 3;
  search_util
    .searchForRandom(search_params)
    .then((info_array) => res.send(info_array))
    /*
    if(info_array.length === 0){
      res.status(400);
    }else{
      res.status(200).send(info_array);
    }
    */
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

/**
 * 1.7 - This function return all inforamtion of recipe: Preview, ingredient and quantity list, preparation instructions and number of dishes.
 */
router.get("/fullRecipeInfo/id/:ids",async function (req, res) {
  /*const{ recipeID } = req.params;
  search_params = {};
  search_params.id = recipeID;
  recipes_id_list = [];
  recipes_id_list.push(search_params.id);

  
  search_util
    .getFullRecipeInfo(recipes_id_list) 
    .then((info_array) => res.send(info_array))
    /*
    if(info_array.length === 0){
      res.status(400);
    }else{res.send(info_array);}
    */
   /* .catch((error) => {
        res.sendStatus(500);
    });*/
    try {
      const idArray = JSON.parse(req.params.ids);
      const dictRecipeInfo = await search_util.getFullRecipeInfo(idArray);
      res.send(dictRecipeInfo);
    } catch (error) {
      console.log(error);
      next(error);
    }
});


/**
 * 1.1 -This function return preview inforamtion of recipe
 */
router.get("/previewRecipeInfo/id/:ids",async function (req, res){
 /* const{ recipeID } = req.params;
  search_params = {};
  search_params.id = recipeID;
  recipes_id_list = [];
  recipes_id_list.push(search_params.id);

  search_util
    .getPreviewRecipeInfo(recipes_id_list) 
    .then((info_array) => res.send(info_array))
    .catch((error) => {
        res.sendStatus(500);
    });*/
    try {
      const idArray = JSON.parse(req.params.ids);
      const dictRecipeInfo = await search_util.getPreviewRecipeInfo(idArray);
      res.send(dictRecipeInfo);
    } catch (error) {
      console.log(error);
      next(error);
    }
});


module.exports = router;



