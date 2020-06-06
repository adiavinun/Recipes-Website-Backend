var express = require("express");
var router = express.Router();
const search_util = require("../routes/utils/search_recipes");

//פונקציית בדיקות שאני עובדת איתה למחוק בסוף
/*router.get("/fullRecipeInfo/test", async(req, res) => {
  let res124 = await search_util.getFullRecipeInfo([492560,559251,630293]);
  res.send(res124);
  });*/


router.use((req, res, next) => {
  console.log("Recipes routs");
  next();
});

router.get("/search/query/:searchQuery/amount/:num", (req, res) => {
  const {searchQuery, num} = req.params;
  search_params = {};
  search_params.query = searchQuery;
  search_params.number = num;
  search_params.instructionsRequired = true;
  
  //check if queries params exist
  search_util.extractQueriesPram(req.query, search_params);

  search_util
    .searchForRecipes(searchQuery, num, search_params)
    .then((info_array) => res.send(info_array))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});



router.get("/3randomRecipes", async (req, res, next) => {
  search_params = {};
  search_params.number = 3;
  search_util
    .searchForRandom(search_params)
    .then((info_array) => res.send(info_array))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/fullRecipeInfo/:id", (req, res) => {
  const{ recipeID } = req.params;
  search_params = {};
  search_params.id = recipeID;
  recipes_id_list = [];
  recipes_id_list.push(search_params.id);

  search_util
    .getFullRecipeInfo(recipes_id_list) 
    .then((info_array) => res.send(info_array))
    .catch((error) => {
        res.sendStatus(500);
    });


    const {searchQuery, num} = req.params;
  search_params = {};
  search_params.query = searchQuery;
  search_params.number = num;
  search_params.instructionsRequired = true;
  
  //check if queries params exist
  search_util.extractQueriesPram(req.query, search_params);

  search_util
    .searchForRecipes(searchQuery, num, search_params)
    .then((info_array) => res.send(info_array))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

/* // להמשיך את הפונקציה
router.get("//previewRecipeInfo/:ids", (req, res) => {
  const{ recipeID } = req.params;
  search_params = {};
  search_params.id = recipeID;
  recipes_id_list = [];
  recipes_id_list.push(search_params.id);

  search_util
    .getFullRecipeInfo(recipes_id_list) //לרשום פונקציה
    .then((info_array) => res.send(info_array))
    .catch((error) => {
        res.sendStatus(500);
    });
});
*/
module.exports = router;

/********************************************************/

