// routes
module.exports = function(app) {    
    // load index
    app.get('/', function(req, res){
        console.log('Get : /');
        res.sendfile( './public/views/index.html' );
    });
    
    // any other route
    app.get('*', function(req, res){
        console.log("*" + req.method+ " " + req.url);
        res.redirect('/');
    });
};