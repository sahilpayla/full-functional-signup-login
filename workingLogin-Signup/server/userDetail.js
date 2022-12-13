const mongoose = require('mongoose');

const UserDetailSchema = new mongoose.Schema(
    {
        fname:String,
        lname:String,
        email:String,
        password:String
    },
    {
        collection:'UserInfo',
    }
);

mongoose.model('UserInfo', UserDetailSchema)