var SMTPServer = require('smtp-server').SMTPServer;


var server = new SMTPServer({
  onData: function(stream, session, callback){
   console.log(stream) 
   
  },
  onConnect: function(session, callback){
    console.log("connected!")
    console.log(session)
    console.log(callback)
  }
});

server.listen(25, "138.197.79.63", function() {
  console.log("server started")
});

server.on('error', function(err){
    console.log('Error %s', err.message);
});