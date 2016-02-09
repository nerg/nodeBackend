var appRouter = function(app) {  

  // règle le problème dans chrome d'auth.
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get("/", function(req, res) {
    res.send("Server ready");
  });
  
  // exemple de service REST GET
  app.get("/account", function(req, res) {
      var accountMock = {
          "username": "ren",
          "password": "1234",
          "twitter": "@ren"
      }
      if(!req.query.username) {
          return res.send({"status": "error", "message": "missing username"});
      } else if(req.query.username != accountMock.username) {
          return res.send({"status": "error", "message": "wrong username"});
      } else {
          return res.send(accountMock);
      }
  });
  
  // appel pour effectuer un calcul
  app.post("/calcul", function(req, res) {
      if(!req.body.data || !req.body.ci) {
          return res.send({"status": "error", "message": "missing a parameter"});
      } else {
          var result = Number(req.body.ci[0]) + Number(req.body.ci[1]);
          return res.send("result: "+result);
      }
  });
}

module.exports = appRouter;