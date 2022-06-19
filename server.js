////importer application    BE  from app.js
const app = require("./backend/app");
////identifier le port ili yesma3 3lih request
app.listen(3000, () => {
    console.log("BE server nodemon successfully");
});