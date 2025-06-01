import express from "express"
import router from "./search/router.js"

const app = express();

app.use(express.json());
app.use('/search', router);

app.listen(3000, () => console.log("Server running on port 3000"));
