var express = require("express");
const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";

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

function extractQueriesPram(query_params, search_params) {
    const params_list = ["diet", "cuisine", "intolerance"];
    params_list.forEach((param) => {
        if (query_params[param]) {
            search_params[param] = query_params[param];
        }
    });
    console.log(search_param);
}



exports.searchForRecipes = searchForRecipes;
exports.extractQueriesPram = extractQueriesPram