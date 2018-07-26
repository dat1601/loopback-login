module.exports = function(app){
  app.get('/failure', function(req,res){
    res.sendStatus(401);
  });
};
