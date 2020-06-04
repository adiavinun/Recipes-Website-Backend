const axios = require("axios");

const api_domain = "https://api.spoonacular.com/recipes/search";
const api_key = "apikey=9dfadfa642a74094836f8a3d38d80db2";

//עבור כל מזהה שנקבל נרוץ עליו ונכין מערך של פרמיס עבור כל מזהה. נחכה שנסיים עם הכל ונחזיר את התשובות
async function getRecipesInfo(recipes_id_list){
    let primiess = [];

    //for each id -> get promise of GET response
    recipes_id_list.map((id) =>
    promises.push(axios.get('${api_domaim}/${id}/information?${api_key}'))
    );
    let info_response1 = await Promise.all(promises);

    //
    /*let url_list = [];
    recipes_id_list.map((id) =>
    url_list.push('${api_domaim}/${id}/information?${api_key}')
    );

    let info_response2 = await promiesAll(axios.get, url_list);

    console.log(info_response1.toString() == info_response2.toString());
    *///
    return extractRelevantRecipeData(info_response1);
} 

//עבור כל אחד מהתשובות שקיבלנו נוציא רק את הערכים שרלוונטים אלינו 
function extractRelevantRecipeData(recipes_info){
    return recipes_info.map((recipe_info) => {
        const{
            id,
            title,
            readyInMinutes,
            aggregateLikes,
            vegeetarian,
            vegan,
            glutenFree,
            image,
        } = recipes_info.data;

        return {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            aggregateLikes: aggregateLikes,
            vegeetarian: vegeetarian,
            vegan: vegan,
            glutenFree: glutenFree,
            image: image,
        };
    });
    }

 /*   let promiseAll = async function(func, param_list){
        let promises = [];
        param_list.map ((param) => promises.push(func(param)));
        let info_response = await Promise.all(promises);

        return info_response;
    };*/

    getRecipesInfo([492560,559251,630293]).then(console.log);
