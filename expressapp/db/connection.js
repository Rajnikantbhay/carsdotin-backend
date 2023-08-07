const mongoose = require("mongoose");
const url = "mongodb+srv://rizznikant:X44Xp2BR2902gQet@cluster0.xzxkxeo.mongodb.net/carsweb"

const con = async () => {
    try {
        await mongoose.connect(url, {
           useNewUrlParser: true,
           useUnifiedTopology:true
       })
       console.log("connected");

       const fetchedItems = await mongoose.connection.db.collection("car_details").find({}).toArray();
       global.carData = fetchedItems;

   } catch (error) {
       console.log(error.message)
   }
}


module.exports = con;