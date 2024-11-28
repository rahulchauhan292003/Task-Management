const mongoose = require("mongoose")


const connectDB = ()=>{ 
    mongoose.connect('mongodb+srv://rahulchauhan1420:CtQ1uJmEoHJlsy4m@cluster0.c3pw0.mongodb.net/todo-app-auth?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log("Mongodb connected")
})
}

module.exports = connectDB