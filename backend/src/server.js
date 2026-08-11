const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const auth = require("./routes/authRoutes")

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Rental SaaS API is running"
    });
});


app.use("/api", auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});