const express = require('express');
const systemConfig = require("./config/system")
const bodyParser = require('body-parser');
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path');
// app chat
const http = require('http');
const { Server } = require("socket.io");
// app chat
require('dotenv').config();

const app = express();

const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT;

const database = require("./config/database");
database.connect();

const routeAdmin = require("./routes/admin/index.route")
const routeClient = require("./routes/client/index.route");


app.set('views', `${__dirname}/views`) //tìm đến thư mục tên là views
app.set('view engine', 'pug') // xác định view engine có đuôi .pug

app.use(express.static(`${__dirname}/public`)) // thiết lập thư mục chứa file tĩnh như js images css

//Khai báo biến toàn cục cho file pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;//file: system.js - folder: config

//khai báo biến toàn cục cho file js của backend
global._io = io;

//lib bodyparser dưới dạng form
app.use(bodyParser.urlencoded({ extended: false }))

//lib bodyparser
app.use(bodyParser.json())

//lib flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// New Route to the TinyMCE Node module 
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//Khai báo đường dẫn
routeAdmin.index(app);
routeClient.index(app);   



server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})