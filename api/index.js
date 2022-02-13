const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const multerS3 = require('multer-s3');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const cors = require('cors');
const aws = require('aws-sdk');

const s3 = new aws.S3({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'ap-northeast-1',
});

dotenv.config();
app.use('/images', express.static('images'));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello');
});

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log('Connected'))
    .catch((ex) => console.log(ex));

const extMap = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
};

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        key: function (req, file, cb) {
            cb(null, `${Date.now()}${extMap[file.mimetype]}`);
        },
    }),
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        res.status(200).json({ url: req.file.location });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

app.listen(process.env.PORT, () => {
    console.log('running');
});
