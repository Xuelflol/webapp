// initializations
const pg = require("pg");
const express = require("express");
const path = require("path");
const port = process.env.PORT || 10000;
const bodyParser = require("body-parser");
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
        client.query("INSERT INTO hoth_users (first_name, last_name, password, email, username) VALUES ($1, $2, $3, $4, $5)", [req.body.fname, req.body.lname, req.body.password, req.body.email, req.body.uname], function(err, result) {
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
        client.query("SELECT * FROM hoth_users WHERE email = $1 AND password = $2", [req.body.email, req.body.password], function(err, result) {
            done();
            if (err) {
                console.log(err);
            }
            
            if (result.rows.length > 0) {
                req.session.username = result.rows[0].username;
                req.session.email = result.rows[0].email;
                req.session.loginid = result.rows[0].user_id;
                req.session.pass = result.rows[0].password;
                req.session.auth = result.rows[0].auth_level;
                
                resp.redirect("/");
            } else {
                resp.send("Wrong login information");
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

app.post("/user-cp", function(req, resp) {
    pg.connect(dbURL, function(err, client, done) {
        if (req.session.auth == "C") {
            client.query("SELECT * FROM hoth_users WHERE auth_level = 'C'", function(err, result) {
                done();

                var obj = {
                    status:"customer",
                    result:result.rows
                }

                resp.send(obj);
            });
        } 
    });
});

// redirects
app.use("/scripts", express.static("build"));

app.use("/images", express.static("images"));

app.use("/css", express.static("css"));

app.use("/public", express.static("public"));

app.get("/", function(req, resp) {
    
    if (req.session.auth == "A") {
        resp.sendFile(pF + "/admin.html");
    } else if (req.session.auth == "E") {
        resp.sendFile(pF + "/kitchen.html");
    } else {
        resp.sendFile(pF + "/main.html");
    }
});

app.get("/created", function(req, resp) {
    resp.sendFile(pF + "/created.html");
});

app.get("/signin", function(req, resp) {
    resp.sendFile(pF + "/login.html");
});

app.get("/logout", function(req, resp) {
    req.session.destroy();
    resp.redirect("/");
});

app.get("/user_profile", function(req, resp) {
    if (req.session.auth == "C") {
        resp.sendFile(pF + "/profile.html");
    } else {
        resp.sendFile("/");
    }
});

// server
server.listen(port, function(err) {
    if (err) {
        console.log("Error: " + err);
        return false;
    }
    
    console.log("Server is running on " + port);
});