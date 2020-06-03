const axios = require("axios");
const recipes_api_url = "https://api.spoonacular.com/recipes";
const api_key ="apikey=25f5d3453750479f9213ccf1db014d32"

function extractQueriesPram (query_params, search_params){
    const params_list = ["diet", "cuisine", "intolerance"];
    params_list.forEach((param) => {
        if (query_params[param]){
            search_params[param] = query_params[param];
        }
    });
}

async function searchForRecipes(searchQuery, num, search_params){
    let search_response = await axios.get(
        '${recipes_api_url}/search?${api_key}',
    {
        params: search_params,
    }
    );

    const recipes_id_list = extractSearchResultsIds(search_response);
    //get recipe info by id
    let info_array = await getRecipesInfo(recipes_id_list);
    return info_array;
}

async function getRecipesInfo(recipes_id_list){
    let promises = [];

    recipes_id_list.map((id) =>
        promises.push(axios.get('${recipes_api_url}/${id}/information?${api_key}'))
    );
    let info_response = await Promise.all(promises);

    relevantRecipesData = extractRelevantRecipeData(info_response);
    return relevantRecipesData;
}


// היא אמרה בהקלטה האחרונה ב13 דקות לא להחזיר את זה ככה אלא להפוך את זה למילון
function extractRelevantRecipeData(recipes_info){
    return recipes_info.map((recipe_info) =>{
        const{
            id, 
            title,
            readyInMinutes,
            aggregateLikes,
            vegetarian,
            vegan,
            glutenFree,
            image,
        } = recipe_info.data;
        return{
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

exports.searchForRecipes = searchForRecipes;
exports.extractQueriesPram = extractQueriesPram;