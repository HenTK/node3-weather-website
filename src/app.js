const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const port = process.env.PORT || 5000;

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Khen",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Khen",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Khen",
  });
});

// app.get("/help", (request, response) => {
//   response.send([
//     {
//       name: "Khen",
//       age: 23,
//     },
//     {
//       name: "Nick",
//       age: 27,
//     },
//   ]);
// });

// app.get("/about", (request, response) => {
//   response.send("<h1>About</h1>");
// });

app.get("/weather", (request, response) => {
  if (!request.query.address) {
    return response.send({
      error: "You must provide a address term query",
    });
  }

  forecast(request.query.address, (err, data) => {
    if (err) {
      return response.send({ err });
    }
    response.send({ data });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  // /products?search=example&rating=example
  if (!req.query.search) {
    //must return because only res a req
    return res.send({
      error: "You must provide a search term query",
    });
  }
  //id.params = search=example&rating=example
  res.send({
    products: [],
  });
});

//404 error
app.get("*", (req, res) => {
  res.render("404", {
    title: "Error Page Not Found",
    name: "Khen",
  });
});

//app.com
//app.com/help
//app.com/about
//http://localhost:5000/

app.listen(port, () => {
  console.log("Server is up on port 5000.");
});
