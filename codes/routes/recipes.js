//var express = require("express");
//var router = express.Router();

/**********************SHIR*****************************/  
const express = require("express");
const router = express.Router();

const search_util = require("./utils/search_recipes.js");

router.use((req, res, nwxt) => {
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
  search_util.extractQueriesParams(req.query, search_params);

  search_util
    .searchForRecipes(searchQuery, num, search_params)
    .then((info_array) => res.send(info_array))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;

/********************************************************/

/*********************ERAN******************************/
const axios = require("axios");

router.get("/Information", async (req, res, next) => {
  try {
    const recipe = await getRecipeInfo(req.query.recipe_id);
    res.send({ data: recipe.data });
  } catch (error) {
    next(error);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const { query, cuisine, diet, intolerances, number } = req.query;
    const search_response = await axios.get(`${api_domain}/search`, {
      params: {
        query: query,
        cuisine: cuisine,
        diet: diet,
        intolerances: intolerances,
        number: number,
        instructionsRequired: true,
        apiKey: "25f5d3453750479f9213ccf1db014d32"
      }
    });
    let recipes = await Promise.all(
      search_response.data.results.map((recipe_raw) =>
        getRecipeInfo(recipe_raw.id)
      )
    );
    recipes = recipes.map((recipe) => recipe.data);
    res.send({ data: recipes });
  } catch (error) {
    next(error);
  }
});

function getRecipeInfo(id) {
  return axios.get(`${api_domain}/${id}/information`, {
    params: {
      includeNutrition: false,
      apiKey: "25f5d3453750479f9213ccf1db014d32"
    }
  });
}

module.exports = router;

/***********************************************************/
