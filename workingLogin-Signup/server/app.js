const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
app.use(express.json());
app.use(cors())
const bcrypt = require('bcrypt');
mongoose.set('strictQuery', true);
const port = 5000;
const jwt = require('jsonwebtoken')
const JWT_SECRET = "knkwhqfhnjeiu___h83hrubfuibbui4fbh4ujb47uhgvub57uvh7"

const mongoUrl = "mongodb+srv://functionup-radon-cohort:radon123@cluster0.zbsotuc.mongodb.net/group17Database?retryWrites=true&w=majority"

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log('connected to the database')
    })
    .catch((e) => console.log(e));




require('./userDetail.js')
const User = mongoose.model("UserInfo")


app.post('/register', async (req, res) => {
    const { fname, lname, email, password } = req.body;
    const ecryptedPassword = await bcrypt.hash(password, 10)
    try {
        const oldUser = await User.findOne({ email })

        if (oldUser) {
            return res.send({ error: 'user already existed' })
        }
        await User.create({
            fname,
            lname,
            email,
            password: ecryptedPassword,
        })
        res.send({ status: 'ok' })
    } catch (error) {
        res.send({ status: 'error' })
    }
})


app.post('/login-user', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.send({ error: 'user not found' })
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({}, JWT_SECRET);

        if (res.status(201)) {
            return res.send({ status: 'ok', data: token });
        } else {
            return res.send({ error: 'error' })
        }
    }
    res.send({ status: 'error', error: 'invaid password' })
})

app.listen(port, () => {
    console.log('server started')
})