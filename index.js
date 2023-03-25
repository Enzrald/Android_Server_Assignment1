var express = require('express');
var app = express();
var hbs = require('express-handlebars');
app.listen(8080);
var bodyParser = require("body-parser");
var session = require('express-session')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'Big Cock',
    resave: false,
    saveUninitialized: true
}));

app.engine(
    '.hbs',
    hbs.engine({
        extname: ".hbs",
        defaultLayout: false,
        layoutsDir: "views/layouts/"
    })
);

app.use(express.static('manager.js'))

let myData = [{ idSP: 1, nameSP: 'Iphone Tau', priceSP: 250, colorSP: 'Den' },
{ idSP: 2, nameSP: 'XS Max', priceSP: 3000, colorSP: 'Do' },
{ idSP: 3, nameSP: 'Samsung', priceSP: 500, colorSP: 'Xanh' }
];

let users = [{
    idUsers: 1,
    nameUsers: 'khoanxph27009', mailUsers: 'khoanxph27009@gmail.com', pass: 'khoa2003'
}];

app.get("/products", function (req, res) {
    res.render("products", { data: myData });
});
app.get("/users", function (req, res) {
    res.render("users", { dataOfUser: users });
});
app.set('view engine', '.hbs');

app.get('/signup', function (req, res) {
    res.render('signup')
})

app.get('/login', function (req, res) {
    res.render('login')
})

app.get('/manager', function (req, res) {
    res.render('manager')
})

app.post('/signup', function (req, res) {
    var names = req.body.names;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    var img = req.body.Avatar;

    req.session.user = { email, names, password, img };

    if (password != confirmPassword) {
        res.render('signup', {
            passError: 'Nhập lại mật khẩu sai',
        });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        res.render('signup', {
            emailError: 'Nhập sai định dạng Email'
        });
    }
    else {
        res.redirect('/login');
    }
})

app.post('/manager', function (req, res) {
    res.redirect('/products')
})

app.get('/add', function (req, res) {
    res.render('add')
})

app.post('/login', function (req, res) {
    var EmailLogin = req.body.EmailLogin;
    var PassLogin = req.body.PassLogin;
    const user = req.session.user;
    if (!user || user.email !== EmailLogin || user.password !== PassLogin) {
        return res.render('login', {
            LoginError: 'Sai tài khoản hoặc mật khẩu'
        });
    } else {
        res.redirect('/manager')
    }
})

app.post("/add", function (req, res) {
    
    let newData = {
        idSP: myData.length + 1,
        nameSP: req.body.nameSP,
        priceSP: parseInt(req.body.priceSP),
        colorSP: req.body.colorSP
    };
    myData.push(newData);
    res.redirect('/products');
});