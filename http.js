module.exports = function(app) {
  return (function(app) {
    var listeners = [];

    var addListener = function(listener) {
      listeners.push(listener);
    }

    var emitListeners = function(msg) {
      for (var i = 0; i < listeners.length; i++) {
        listeners[i](msg);
      }
    }

    app.use(multer({
      dest: './uploads/',
      rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
      },
      onFileUploadComplete: function(file) {
        emitListeners(file.fieldname);
      }
    }))

    app.get('/', function(req, res) {
      // res.send("Moi!");
      res.sendFile("form.htm");
      emitListeners("derp");
    });

    app.post('/upload', function(req, res) {
      res.end("done");
    });

    var server = app.listen(3000, function() {
      var host = server.address().address;
      var port = server.address().port;

      console.log('Example app listening at http://%s:%s', host, port);
    });

    return {
      addListener: addListener
    };
  })(app);
}
