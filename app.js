const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

dotenv.config({path: './config.env'});

// Create Connection
const DB = process.env.DATABASE;

mongoose.connect(process.env.MONGODB_URI || DB, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => {
    console.log('Connection Successful');
}).catch((error) => {
    console.log(error);
});

//Adding Cors
app.use(cors())

//Body Parser
app.use(bodyParser.urlencoded({extended: true}))

//Conver Objects to Json Format
app.use(express.json());

//User Schema
const User = require('./models/userSchema');

app.post('/addUser', async (req, res) => {
    const {userName, age, id, loan, interest, duration, monthly, userData} = req.body;

    const user = new User({
        userName: userName,
        uid: id,
        age: age,
        loan: loan,
        interest: interest,
        duration: duration,
        monthly: monthly,
        userData: userData
    });
    await user.save();
    res.json({user});
})

app.get('/get', async(req, res) => {
    const data = await User.find()
    res.json({data})
})

app.delete('/delete/:id', async (req, res) => {
    const data = await User.findByIdAndDelete(req.params.id);
    res.json({data})
})

app.put('/update/:id', async (req, res) => {
    const {date, credit, paid} = req.body;
    const data = await User.findByIdAndUpdate(req.params.id, {
        $push: {
            userData: {
                date: date,
                credit: credit,
                paid: paid
            }
        }
    })
    await data.save();
    res.json({data})
})

//Port
const PORT = process.env.PORT || 5500;

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})