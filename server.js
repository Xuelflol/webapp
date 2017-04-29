// initializations
const pg = require("pg");
const express = require("express");
const path = require("path");
const port = process.env.PORT || 10000;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");

var app = express();
var pF = path.resolve(__dirname, "public");

const server = require("http").createServer(app);
const io = require("socket.io")(server);
var dbURL = process.env.DATABASE_URL || "postgres://postgres:58nihcregor@localhost:5432/kitchen";

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(session({
    secret:"this is our kitchen",
    resave:true,
    saveUninitialized:true
}));

// ajax response
app.post("/register", function(req, resp) {
    pg.connect(dbURL, function(err, client, done) {
        client.query("INSERT INTO hoth_customer (fname, lname, password, email) VALUES ($1, $2, $3, $4)", [req.body.fname, req.body.lname, req.body.password, req.body.email], function(err, result) {
            done();
            
            if (err) {
                console.log(err);
            }
            
            resp.redirect("/created");
        });
    });
});

app.post("/login", function(req, resp) {
    pg.connect(dbURL, function(err, client, done) {
        client.query("SELECT * FROM hoth_customer WHERE email = $1 AND password = $2", [req.body.email, req.body.password], function(err, result) {
            done();
            if (err) {
                console.log(err);
            }
            
            if (result.rows.length == 0) {
                client.query("SELECT * FROM hoth_employee WHERE email = $1 AND password = $2", [req.body.email, req.body.password], function(err, res) {
                    done();
                    if (err) {
                        console.log(err);
                    }
        
                    if (res.rows.length > 0) {
                        req.session.loginid = res.rows[0].cust_id;
                        req.session.email = res.rows[0].email;
                        req.session.pass = res.rows[0].password;
                    }
                    
                    if (res.rows[0].auth_level == "A") {
                        resp.redirect("/admin");
                    } else {
                        resp.redirect("/kitchen");
                    }
                });
            } else if (result.rows.length > 0) {
                req.session.loginid = result.rows[0].cust_id;
                req.session.email = result.rows[0].email;
                req.session.pass = result.rows[0].password;
                
                resp.redirect("/");
            }
        });
    });
});

app.post("/appetizer", function(req, resp) {
    pg.connect(dbURL, function(err, client, done) {
        client.query("SELECT * FROM hoth_items WHERE category = 'a'", function(err, result) {
            done();
            
            resp.send(result.rows);
        });
    });
});

app.post("/drinks", function(req, resp) {
    pg.connect(dbURL, function(err, client, done) {
        client.query("SELECT * FROM hoth_items WHERE category = 'b'", function(err, result) {
            done();
            
            resp.send(result.rows);
        });
    });
});

app.post("/desserts", function(req, resp) {
    pg.connect(dbURL, function(err, client, done) {
        client.query("SELECT * FROM hoth_items WHERE category = 'd'", function(err, result) {
            done();
            
            resp.send(result.rows);
        });
    });
});

app.post("/meals", function(req, resp) {
    pg.connect(dbURL, function(err, client, done) {
        client.query("SELECT * FROM hoth_items WHERE category = 'm'", function(err, result) {
            done();
            
            resp.send(result.rows);
        });
    });
});

// redirects
app.use("/scripts", express.static("build"));

app.use("/images", express.static("images"));

app.use("/css", express.static("css"));

app.get("/", function(req, resp) {
    resp.sendFile(pF + "/main.html");
});

app.get("/created", function(req, resp) {
    resp.sendFile(pF + "/created.html");
});

app.get("/signin", function(req, resp) {
    resp.sendFile(pF + "/login.html");
});

// server
server.listen(port, function(err) {
    if (err) {
        console.log("Error: " + err);
        return false;
    }
    
    console.log("Server is running on " + port);
});