//requiring express, its helps to manage server and routes
const express = require('express');
const app = express();
//Setting port
const PORT = 3333;
//requiring fs
const fs = require('fs');

//setting view engine
app.set('view engine', 'pug');
app.set('task', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/static", express.static("public"));

//define routes
app.get("/", (req, res) => {
    res.render("home");
})

app.get("/about", (req, res) => {
    res.render("about", {
        image: './static/home.jpg'
    });
})

app.get("/services", (req, res) => {
    res.render("services", {
        image: './static/service.jpg'
    });
})

app.get("/contact", (req, res) => {
    res.render("contact");
})

app.get("/showdetails", (req, res) => {
    let info = fs.readFileSync('./public/contacts/details.txt').toString().split('\n');
    res.render("showdetails", {
        file : info
    });
})

app.get("/gallery", (req, res) => {
    res.render("gallery", {
        items:
            ['https://i.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA', 'https://i.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc', 'https://i.picsum.photos/id/15/2500/1667.jpg?hmac=Lv03D1Y3AsZ9L2tMMC1KQZekBVaQSDc1waqJ54IHvo4',
                'https://i.picsum.photos/id/30/1280/901.jpg?hmac=A_hpFyEavMBB7Dsmmp53kPXKmatwM05MUDatlWSgATE', 'https://i.picsum.photos/id/33/5000/3333.jpg?hmac=h5NVRcUXmsWm612YQOroHSA5n9R7gxZgoP60LHBPHtw', 'https://i.picsum.photos/id/34/3872/2592.jpg?hmac=4o5QGDd7eVRX8_ISsc5ZzGrHsFYDoanmcsz7kyu8A9A',
                'https://i.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g', 'https://i.picsum.photos/id/43/1280/831.jpg?hmac=glK-rQ0ppFClW-lvjk9FqEWKog07XkOxJf6Xg_cU9LI', 'https://i.picsum.photos/id/45/4592/2576.jpg?hmac=Vc7_kMYufvy96FxocZ1Zx6DR1PNsNQXF4XUw1mZ2dlc',
                'https://i.picsum.photos/id/54/3264/2176.jpg?hmac=blh020fMeJ5Ru0p-fmXUaOAeYnxpOPHnhJojpzPLN3g', 'https://i.picsum.photos/id/58/1280/853.jpg?hmac=YO3QnOm9TpyM5DqsJjoM4CHg8oIq4cMWLpd9ALoP908', 'https://i.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM']
    });
})

app.post("/get_contact", (req, res) => {
    let { name, email, contact, city } = req.body;

    // let file = "./public/contacts/" + email;

    if (fs.existsSync('./public/contacts/details.txt')) {
        // fs.mkdir(file, (err) => {
        //     if (err) throw err;
        //     else {
        // fs.appendFile(file + '/details.txt', data, (err) => {
        if (name === '' || email === '' || contact === '' || city === '') {
            res.render('contact');
        } else {
            let data = (name + ',' + email + ',' + contact + ',' + city);
            fs.appendFile('./public/contacts/details.txt', data + '\n', (err) => {
                res.render("welcome");
                if (err) throw err;
            })
        }
    }
    // else {
    //     fs.writeFileSync('./static/contacts/details.txt', data);
    //     app.send();
    // }

});
// else {
//     res.render("welcome1");
// }
// }

app.listen(PORT, (err) => {
    if (err) throw err;
    else console.log(`PORT ${PORT} working fine`);
})
