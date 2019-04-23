const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "njk");

/**
 * Crio um fluxo de requisição para validar a entrada de dados
 */
const logMiddleware = (req, res, next) => {
  if (req.query.age && Number.isInteger(parseInt(req.query.age), 10)) {
    return next();
  }
  return res.redirect("/");
};

//app.use(logMiddleware); //Informo que todas as rotas vão usar midle

/**
 * Rota Inicial
 */
app.get("/", (req, res) => {
  return res.render("home");
});

/**
 * Rota Idade Maior
 */
app.get("/major", logMiddleware, (req, res) => {
  return res.render("major", { age: req.query.age });
});

/**
 * Rota Idade Menor
 */
app.get("/minor", logMiddleware, (req, res) => {
  return res.render("minor", { age: req.query.age });
});

/**
 * Rota de Verificação da idade
 */
app.post("/check", (req, res) => {
  if (req.body.age > 18) {
    return res.redirect(`/major?age=${req.body.age}`);
  } else {
    return res.redirect(`/minor?age=${req.body.age}`);
  }
});

app.listen(3000);
