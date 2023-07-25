const mongoose=require('mongoose')
const mongoURI='mongodb+srv://Dhairya:Dhairya1234@cluster0.ozhfirv.mongodb.net/FoodHubMern?retryWrites=true&w=majority'
const mongoDB=async()=>{
    await mongoose.connect(mongoURI, { useNewUrlParser: true ,useUnifiedTopology: true},async(err,res)=>{
        if(err)console.log('---',err)
        else{
            console.log('connected');
            const fetched_Data = await mongoose.connection.db.collection("food_items")
            fetched_Data.find({}).toArray(async function(err,data){
                const foodCategory=await mongoose.connection.db.collection("foodCategory")
                foodCategory.find({}).toArray(function(err,catData){
                    if(err) console.log(err)
                    else{
                        global.food_items=data;
                        global.foodCategory=catData;  
                    }
                })
                // if(err) console.log(err)
                // else {
                //     global.food_items=data;
                // }
            })
        }
    })
        }


module.exports=mongoDB;
