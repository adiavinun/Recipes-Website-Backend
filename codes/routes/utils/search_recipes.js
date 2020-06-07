const express = require("express");
const router = express.Router();
const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
const api_key ="apiKey=48929028c64b427fa9389ef953df7223";

// 1.8
/**
 * This function responsible for extracting the data associated with the search filters
 */
function extractQueriesPram (query_params, search_params){
    const params_list = ["diet", "cuisine", "intolerance"];
    params_list.forEach((param) => {
        if (query_params[param]){
            search_params[param] = query_params[param];
        }
    });
   // console.log(search_params);
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
    let counter = 0;
    let search_response;
    while(counter < 3){
        search_response = await axios.get(`${api_domain}/random?${api_key}`,
        {
            params: search_params,
        }
        );
        counter = 0;
        for(let i=0; i<search_response.data.recipes.length; i++){
            if(search_response.data.recipes[i].analyzedInstructions.length > 0) //לבדוק גם על המרכיבים כרגע עשיתי רק על ההוראות
                counter ++; 
        }
    }
    const recipes_id_list = extractRandomSearchResultsIds(search_response); 
    let info_array = await getRecipesInfo(recipes_id_list);
    return info_array;
}

//עבור כל מזהה שנקבל נרוץ עליו ונכין מערך של פרמיס עבור כל מזהה. נחכה שנסיים עם הכל ונחזיר את התשובות
// 1.7
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


async function promiseAll(func, param_list){
    let promises = [];
    param_list.map((param) => promises.push(func(param)));
    let info_response = await Promise.all(promises);

    return info_response;
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

async function getFullRecipeInfo(recipes_ids){
    let promises = [];
    //full = false;
    recipes_ids.map((id) => promises.push(axios.get(`${api_domain}/${id}/information?${api_key}`)));
    let info_response1 = await Promise.all(promises);
    /*while( !full ){
        recipes_ids.map((id) => promises.push(axios.get(`${api_domain}/${id}/information?${api_key}`)));
        let info_response1 = await Promise.all(promises);
        if(promises.length >0) //לבדוק את זה שוב
            full = true;    
    }*/
    relevantRecipes = extractSearchResultsData_fullRecipe(info_response1);
    return relevantRecipes;
}


function getIngrediants(extendedIngredients){
    return extendedIngredients.map((ingredients) => {
        const {
            name,
            amount,
            unit,
        } = ingredients;
        return {
            name: name,
            amount: amount,
            unit: unit,           
        };
    });
}


async function getPreviewRecipeInfo(recipes_ids){
    let promises = [];
    recipes_ids.map((id) => promises.push(axios.get(`${api_domain}/${id}/information?${api_key}`)));
    let info_response1 = await Promise.all(promises);
    relevantRecipes = extractSearchResultsData_PreviewRecipe(info_response1);
    return relevantRecipes;
}



//-----------------------------------------Extract Data function -----------------------------------//
//עבור כל אחד מהתשובות שקיבלנו נוציא רק את הערכים שרלוונטים אלינו

function extractRelevantRecipeData(recipes_info){
    return recipes_info.map((record)  => {
     // for each cell in map (recipe) extract relevant information with keys
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
 
     // return for each the rekecant information
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

 //  1.8
 //  return the id of recipe
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

//1.7 - all the information.
//function extract the relavnt data from the response external epi
function extractSearchResultsData_fullRecipe(recipes_Info){
    return recipes_Info.map((record) => {
         // for each cell in map (recipe) extract relevant information with keys
        const {
            id,
            title,
            readyInMinutes,
            aggregateLikes,
            vegetarian,
            vegan,
            glutenFree,
            image,
            extendedIngredients,
            instructions,
            servings,
        } = record.data;
        // return for each the rekecant information
        return {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            aggregateLikes: aggregateLikes,
            vegetarian: vegetarian,
            vegan: vegan,
            glutenFree: glutenFree,
            image: image,
            Ingredients: getIngrediants(extendedIngredients),//לא מציג טוב לבדוק איך למשוך את הדברים הרלוונטים שצריך
            instructions: instructions,
            servings: servings,
        };
    });
}

//1.8 - preview.
// function extract the relavnt data from the response external epi
function extractSearchResultsData_PreviewRecipe(recipes_Info){
    return recipes_Info.map((record) => {
        // for each cell in map (recipe) extract relevant information with keys
        const {
            id,
            title,
            readyInMinutes,
            aggregateLikes,
            vegetarian,
            vegan,
            glutenFree,
            image,      
        } = record.data;
        // return for each the rekecant information
        return {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            aggregateLikes: aggregateLikes,
            vegetarian: vegetarian,
            vegan: vegan,
            glutenFree: glutenFree,
            image: image,
            
        };
    });
}

  //getRecipesInfo([492560,559251,630293]).then(console.log);

  exports.searchForRecipes = searchForRecipes;
  exports.searchForRandom = searchForRandom;
  exports.extractQueriesPram = extractQueriesPram;
  exports.getRecipesInfo = getRecipesInfo;
  exports.getFullRecipeInfo = getFullRecipeInfo;
  exports.getPreviewRecipeInfo = getPreviewRecipeInfo;
