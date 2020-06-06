var express = require("express");
var router = express.Router();
const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
const api_key ="apikey=25f5d3453750479f9213ccf1db014d32"


function extractQueriesPram (query_params, search_params){
    const params_list = ["diet", "cuisine", "intolerance"];
    params_list.forEach((param) => {
        if (query_params[param]){
            search_params[param] = query_params[param];
        }
    });
    console.log(search_param);
}

// async function searchForRecipes(searchQuery, num, search_params){
//     let search_response = await axios.get
//         `${api_domain}/search?apiKey=${api_key}`,
//     {
//         params: search_params,
//     }

//     const recipes_id_list = extractSearchResultsIds(search_response);
//     console.log(recipes_id_list);
//     //get recipe info by id
//     let info_array = await getRecipesInfo(recipes_id_list);
//     return info_array;
// }

//עבור כל מזהה שנקבל נרוץ עליו ונכין מערך של פרמיס עבור כל מזהה. נחכה שנסיים עם הכל ונחזיר את התשובות
async function getRecipesInfo(recipes_id_list){
    let promises = [];
    //for each id -> get promise of GET response
    recipes_id_list.map((id) =>
        promises.push(axios.get(`${api_domain}/${id}/information?apiKey=${api_key}&instructionRequire=true`))   
        );
    let info_response = await Promise.all(promises);

    relevantRecipesData = extractRelevantRecipeData(info_response);
    return relevantRecipesData;
}


//עבור כל אחד מהתשובות שקיבלנו נוציא רק את הערכים שרלוונטים אלינו 
function extractRelevantRecipeData(recipes_info){
    const{
        id,
        image,
        title,
        readyInMinutes,
        aggregateLikes,
        vegetarian,
        vegan,
        glutenFree,   
    } = recipe_info.data;
    return{
        id: id,
        image: image,
        title: title,
        readyInMinutes: readyInMinutes,
        aggregateLikes: aggregateLikes,
        vegetarian: vegetarian,
        vegan: vegan,
        glutenFree: glutenFree,
    }; 
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

module.exports ={
    //searchForRecipes: searchForRecipes,
    //extractQueriesPram = extractQueriesPram,
    getRecipesInfo: getRecipesInfo,
}
