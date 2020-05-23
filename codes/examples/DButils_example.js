const DButils = require("../DButils");

// const query = `INSERT INTO dbo.users (username, password) VALUES ('demossed', 'demossed')`;
const query = `SELECT * FROM dbo.users`;
// const query = `DROP TABLE dbo.users`;

//#region promise Version
DButils.execQuery(query)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => console.log(error.message));
//#endregion

//#region async await Version
// (async () => {
//   try {
//     res = await DButils.execQuery(query);
//     console.log(res);
//   } catch (error) {
//     console.log(error.message);
//   }
// })();
//#endregion
