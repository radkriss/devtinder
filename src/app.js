const express = require("express");
const connectDB = require("./db")
const app = express();
const cors = require("cors");
app.use(cors({
    origin: "http:localhost:5174",
    credentials: true
}));
// const { OpenAI, OpenAIApi} = require("openai");

// const openai = new OpenAI({
//     apiKey: "key_from_open_api_toBe-Pasted_here"
// })

// const GPTFunction = async () => {
//     let fullName = "Radhakrishnann";
//     let currentPosition = "Front end developer";
//     let currentLength = 10;
//     let currentTechnologies = "React JS, Node Js"
//     const prompt1 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write a 100 words description for the top of the resume(first person writing)?`;

//     const response = await openai.completions.create({
//         model: "gpt-3.5-turbo",
//         prompt: prompt1,
//         temperature: 0.6,
//         max_tokens: 250,
//         top_p: 1,
//         frequency_penalty: 1,
//         presence_penalty: 1
//     })
//     console.log(response.data.choices[0].text);
// }

// GPTFunction();

const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionRequestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use(express.json())
app.use(cookieParser())
app.use("/", userRouter)
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);



connectDB()
    .then(() => {
        console.log("DB connected !!");
        app.listen(3000, () => {
            console.log("Server started at 3000")
        });
    })
    .catch(() => {
        console.log("DB not connected !!")
    })

