var express = require("express");
var router = express.Router();
const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
const api_key ="apiKey=25f5d3453750479f9213ccf1db014d32";


function extractQueriesPram (query_params, search_params){
    const params_list = ["diet", "cuisine", "intolerance"];
    params_list.forEach((param) => {
        if (query_params[param]){
            search_params[param] = query_params[param];
        }
    });
    console.log(search_params);
}

async function searchForRecipes(searchQuery, num, search_params) {
    let search_response = await axios.get(`${api_domain}/search?${api_key}`,
        {
            params: search_params,
        }
    );
    const recipes_id_list = extractSearchResultsIds(search_response);
    console.log(recipes_id_list);
    //get recipe info by id
    let info_array = await getRecipesInfo(recipes_id_list);
    return info_array;
}

async function searchForRandom(search_params){
    let search_response = await axios.get(`${api_url}/random?${api_key}`,
        {
            params: search_params,
        }
    );
    const recipes_id_list = extractRandomSearchResultsIds(search_response); 
    let info_array = await getRecipesInfo(recipes_id_list);
    return info_array;
}
//עבור כל מזהה שנקבל נרוץ עליו ונכין מערך של פרמיס עבור כל מזהה. נחכה שנסיים עם הכל ונחזיר את התשובות
async function getRecipesInfo(recipes_id_list){
    let promises = [];
    //for each id -> get promise of GET response
    //מבצעים מיפוי במערך 
    recipes_id_list.map((id) =>
        promises.push(axios.get(`${api_domain}/${id}/information?${api_key}`))   
        );
        
    let info_response = await Promise.all(promises);

    //נרצה לחלץ את השדות הרלוונטים עבור כל אחד מהמתכונים שיש לנו
    relevantRecipesData = extractRelevantRecipeData(info_response);
   return relevantRecipesData;
   
}


//עבור כל אחד מהתשובות שקיבלנו נוציא רק את הערכים שרלוונטים אלינו 
function extractRelevantRecipeData(recipes_info){
   return recipes_info.map((record)  => {
    //יחלץ את הערכים הרלוונטים האלה
    const{
        id,
        image,
        title,
        readyInMinutes,
        aggregateLikes,
        vegetarian,
        vegan,
        glutenFree,   
    } = record.data;

    //מחזירה אותם בתור אובייקט
    return{
        id: id,
        image: image,
        title: title,
        readyInMinutes: readyInMinutes,
        aggregateLikes: aggregateLikes,
        vegetarian: vegetarian,
        vegan: vegan,
        glutenFree: glutenFree,
    } 
});
}

async function promiseAll(func, param_list){
    let promises = [];
    param_list.map((param) => promises.push(func(param)));
    let info_response = await Promise.all(promises);

    return info_response;
}

function extractSearchResultsIds(search_response){
    let recipes = search_response.data.results;
    recipes_id_list = [];
    recipes.map((recipe) => {
        recipes_id_list.push(recipe.id);
    });
    return recipes_id_list;
}

function extractRandomSearchResultsIds(search_response){
    let recipes = search_response.data.recipes;
    recipes_id_list = [];
    recipes.map((recipe) => {
        recipes_id_list.push(recipe.id);
    });
    return recipes_id_list;
}


router.get("/search", async (req, res, next) => {
    try {
      const { query, cuisine, diet, intolerances, num } = req.query;
      const search_response = await axios.get(`${api_domain}/search`, {
        params: {
          query: query,
          cuisine: cuisine,
          diet: diet,
          intolerances: intolerances,
          num: num,
          apiKey: api_key,
        }
      });
      let recipes = await Promise.all(
        search_response.data.results.map((recipe_raw) =>
         utils.getRecipeInfo(recipe_raw.id)
        ) 
      );
      recipes = recipes.map((recipe) => recipe.data);
      //#endregion
      const u_recipes = recipes.map((recipe) => {
        return {
            id: id,
            image: image,
            title: title,
            readyInMinutes: readyInMinutes,
            aggregateLikes: aggregateLikes,
            vegetarian: vegetarian,
            vegan: vegan,
            glutenFree: glutenFree,   
        }
      })
      res.send({ u_recipes });
    } catch (error) {
      next(error);
    }
  });

  //getRecipesInfo([492560,559251,630293]).then(console.log);

  exports.searchForRecipes = searchForRecipes;
  exports.searchForRandom = searchForRandom;
  exports.extractQueriesPram = extractQueriesPram;
  exports.getRecipesInfo = getRecipesInfo;