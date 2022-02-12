const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const path = require('path');
const cors = require('cors');

dotenv.config();
app.use('/images', express.static('images'));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello');
});

mongoose
    .connect('mongodb+srv://a5925457:a5925457@cluster0.abxjn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log('Connected'))
    .catch((ex) => console.log(ex));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), async (req, res) => {
    res.status(200).json('File has been uploaded.');
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

app.listen(process.env.PORT, () => {
    console.log('running');
});
