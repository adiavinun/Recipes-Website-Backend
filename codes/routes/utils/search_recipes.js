const express = require("express");
const router = express.Router();
const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
//const api_key ="apiKey=25f5d3453750479f9213ccf1db014d32"; //user of adi and this is what we used
//const api_key ="apiKey=48929028c64b427fa9389ef953df7223"; //user of nicole
//const api_key = "apiKey=77c6f285cd4c4c71b6b147ce93af5588"; 
const api_key = "apiKey=90acb7a8bdb34eb7b44135cce26150cc"; 




/**
 * 1.8 - This function responsible for extracting the data associated with the search filters
 */
function extractQueriesPram (query_params, search_params){
    const params_list = ["diet", "cuisine", "intolerance"];
    params_list.forEach((param) => {
        if (query_params[param]){
            search_params[param] = query_params[param];
        }
    });
}


/**
 * 1.7
 * @param {*} recipes_id_list 
 */
async function getRecipesInfo(recipes_id_list){
    let promises = [];
    //for each id -> get promise of GET response
    recipes_id_list.map((id) =>
    promises.push(axios.get(`${api_domain}/${id}/information?${api_key}`))   
    );
    
    let info_response = await Promise.all(promises);
    relevantRecipesData = extractSearchResultsData_PreviewRecipe(info_response);
    return relevantRecipesData; 
}

/**
 * 1.8
 * @param {*} searchQuery 
 * @param {*} num 
 * @param {*} search_params 
 */
async function searchForRecipes(searchQuery, num, search_params) {
    //full = false;
    let search_response = await axios.get(`${api_domain}/search?${api_key}`,
    {
        params: search_params,
    }
    );
    /*while(!full){
        search_response = await axios.get(`${api_domain}/search?${api_key}`,
        {
            params: search_params,
        }
        );
        full = false;
        for(let i=0; i<search_response.data.results.length; i++){
            if(search_response.data.results[i].analyzedInstructions.length > 0 && search_response.data.results[i].instructions.length > 0 ) 
            full = true; 
        }
    } */
    const recipes_id_list = extractSearchResultsIds(search_response);
    console.log(recipes_id_list);
    //get recipe info by id
    let info_array = await getRecipesInfo(recipes_id_list);
    return info_array;
}

/**
 * 1.6
 * @param {*} search_params 
 */
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
            if(search_response.data.recipes[i].analyzedInstructions.length > 0 && search_response.data.recipes[i].instructions.length > 0 ) 
                counter ++; 
        }
    }
    const recipes_id_list = extractRandomSearchResultsIds(search_response); 
    let info_array = await getRecipesInfo(recipes_id_list);
    return info_array;
}

/**
 * 1.8
 * @param {*} recipes_id_list 
 */
async function getFullRecipeInfo(recipes_id_list){
    let promises = [];
    recipes_id_list.map((id) => promises.push(axios.get(`${api_domain}/${id}/information?${api_key}`)));
    let info_response1 = await Promise.all(promises);
    relevantRecipes = extractSearchResultsData_fullRecipe(info_response1);
    return relevantRecipes;
}

/**
 * 1.1
 */
async function getPreviewRecipeInfo(idArray){
    let promises = [];
    idArray.map((id) => promises.push(axios.get(`${api_domain}/${id}/information?${api_key}`)));
    let info_response1 = await Promise.all(promises);
    relevantRecipes = extractSearchResultsData_PreviewRecipe(info_response1);
    return relevantRecipes; 
}




/*******************************Extract Data function***************************************/
 /**
  * 1.8 - This function return the id of recipes relevent.
  * @param {*} search_response 
  */
function extractSearchResultsIds(search_response){
    let recipes = search_response.data.results;
    recipes_id_list = [];
    recipes.map((recipe) => {
        recipes_id_list.push(recipe.id);
    });
    return recipes_id_list;
}

/**
 * 1.6
 * @param {*} search_response 
 */
function extractRandomSearchResultsIds(search_response){
    let recipes = search_response.data.recipes;
    recipes_id_list = [];
    recipes.map((recipe) => {
        recipes_id_list.push(recipe.id);
    });
    return recipes_id_list;
}

/**
 * 1.8- This function extract the preview relavnt data from the response external api.
 * @param {*} recipes_Info 
 */
function extractSearchResultsData_PreviewRecipe(recipes_Info){
    //let dic = {};
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
        //var inside = {
        return {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            aggregateLikes: aggregateLikes,
            vegetarian: vegetarian,
            vegan: vegan,
            glutenFree: glutenFree,
            image: image,
            
        }
        //var recipeID = record.data.id;
        //dic [recipeID] = new Object();
        //dic [recipeID] = inside;

    });
    //return dic;
}


/**
 * 1.7 - This function extract the all full relavnt data from the response external api
 * @param {*} recipes_Info 
 */
function extractSearchResultsData_fullRecipe(recipes_Info){
    //let dic = {};
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
          analyzedInstructions,
          servings,
        } = record.data;
        // return for each the rekecant information
        //var inside = {
        return {
          id: id,
          title: title,
          readyInMinutes: readyInMinutes,
          aggregateLikes: aggregateLikes,
          vegetarian: vegetarian,
          vegan: vegan,
          glutenFree: glutenFree,
          image: image,
          ingredients: getIngredients(extendedIngredients),
          instructions: getInstructions(analyzedInstructions),
          servings: servings,
        };
        //var recipeID = record.data.id;
        ////dic [recipeID] = new Object();
        //dic [recipeID] = inside;
    });
    //return dic;
}

function getInstructions(fullInstructions) {
    let steps = fullInstructions[0].steps;
    let stepsArray = [];
    steps.map((step) => stepsArray.push(step.step));
    return stepsArray;
}

/**
 * 
 * @param {*} extendedIngredients 
 */
function getIngredients(extendedIngredients){
    //let dic = {};
    //return extendedIngredients.map((ingredients) => {
    return extendedIngredients.map((ingredients) => {
      const { original } = ingredients;

      return {
        nameAndAmount: original,
      };
    });
        // const {
        //     name,
        //     amount,
        //     unit,
        // } = ingredients;
        // //var inside = {
        // return {
        //     name: name,
        //     amount: amount,
        //     unit: unit,           
        // }
        //var ingredientsName = ingredients.name;
        //dic [ingredientsName] = new Object();
        //dic [ingredientsName] = inside;
    //});
    //return dic;
}


/*******************************EXPORTS***************************************/
  exports.searchForRecipes = searchForRecipes;
  exports.searchForRandom = searchForRandom;
  exports.extractQueriesPram = extractQueriesPram;
  exports.getRecipesInfo = getRecipesInfo;
  exports.getFullRecipeInfo = getFullRecipeInfo;
  exports.getPreviewRecipeInfo = getPreviewRecipeInfo;


  
  //getRecipesInfo([492560,559251,630293]).then(console.log);