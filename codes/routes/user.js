var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
const bcrypt = require("bcrypt");

//Authenticate
router.use((req, res, next) => {
  if (req.session && req.session.id) {
    const id = req.session.id;
    const user = (
      await DButils.execQuery(
        `SELECT * FROM dbo.users WHERE username = '${req.body.username}'`
      )
    )[0];

    if(user){
      req.user = user;
      next();
    }
  else res.sendStatus(401);
  }
});

router.get("/recipeInfo/:ids  ", (req, res) => {
  const ids = JSON.parse(req.params.ids);
  const user_name = req.user;
  const userRecipesData = getUserInfoOnRecipes(user_name, ids);
  res.send(userRecipesData);
});

module.exports = router;

function getUserInfoOnRecipes (user_name, id){
  //get from DB
}

router.post("/addPersonalRecipe", async (req, res, next) => {
  try {
    await DButils.execQuery(
      `INSERT INTO dbo.recipes VALUES (default, '${req.user_id}', '${req.body.recipe_name}')`
    );
    res.send({ sucess: true, cookie_valid: req.username && 1 });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

