var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
const bcrypt = require("bcrypt");

//*****************SHIR********************/
router.use((req, res, next) => {
  if (req.session && req.session.id) {
    const id = req.session.id;
    const user = checkInOnDb(id);

    if(user){
      req.user = user;
      next();
    }
  }
  res.sendStatus(401);
});

router.get("/recipeInfo/:ids  ", (req, res) => {
  const ids = JSON.parse(req.params.ids);
  const user_name = req.user;
  const userRecipesData = getUserInfoOnRecipes(user_name, ids);
  res.send(userRecipesData);
});

module.exports = router;

function checkInOnDb (id){
  //get from DB
}

function getUserInfoOnRecipes (user_name, id){
  //get from DB
}

/************************************************************/

/**********************ERAN********************************/



//#region global simple
// router.use((req, res, next) => {
//   const { cookie } = req.body;

//   if (cookie && cookie.valid) {
//     DButils.execQuery("SELECT username FROM dbo.users")
//       .then((users) => {
//         if (users.find((e) => e.username === cookie.username))
//           req.username = cookie.username;
//         next();
//       })
//       .catch((err) => next(err));
//   } else {
//     next();
//   }
// });
//#endregion

router.get("/favorites", function (req, res) {
  res.send(req.originalUrl);
});

router.get("/personalRecipes", function (req, res) {
  res.send(req.originalUrl);
});

//#region example2 - make add Recipe endpoint

//#region complex
// router.use("/addPersonalRecipe", function (req, res, next) {
//   if (req.session && req.session.user_id) {
//     // or findOne Stored Procedure
//     DButils.execQuery("SELECT user_id FROM dbo.users").then((users) => {
//       if (users.find((x) => x.user_id === req.session.user_id)) {
//         req.user_id = user_id;
//         // req.session.user_id = user_id; //refresh the session value
//         // res.locals.user_id = user_id;
//         next();
//       } else throw { status: 401, message: "unauthorized" };
//     });
//   } else {
//     throw { status: 401, message: "unauthorized" };
//   }
// });
//#endregion

//#region simple
// router.use("/addPersonalRecipe", (req, res, next) => {
//   const { cookie } = req.body; // but the request was GET so how come we have req.body???
//   if (cookie && cookie.valid) {
//     req.username = cookie.username;
//     next();
//   } else throw { status: 401, message: "unauthorized" };
// });
//#endregion

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
//#endregion

module.exports = router;


/******************************************************/



