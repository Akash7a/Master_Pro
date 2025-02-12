import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 4000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on PORT::${port}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed", error);
    });