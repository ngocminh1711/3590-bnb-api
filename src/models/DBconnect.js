import mongoose  from "mongoose";



class DBconnect {
    async connect() {
        await mongoose.connect('mongodb+srv://thao:thao1234@casestudy4.hrswjtf.mongodb.net/3590bnb')
    }
}

export default DBconnect;