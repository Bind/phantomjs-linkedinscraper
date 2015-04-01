var http = require("http");
var phantom = require("phantom");

var url = "https://www.linkedin.com/pub/doug-binder/64/8a/942";

var server = http.createServer(function(req, res) {

phantom.create(function (ph) {
ph.createPage(function (page) {
page.open(url, function (status) {

// We use jQuery to parse the document
page.includeJs(
  "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js",
  function() {
    page.evaluate(function() {

      var data = {};

       data['title'] = $("#headline .title").text();

      return data;

    }, function(data) {

      ph.exit();

      // Begin writing our output HTML
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write("<html><head><meta charset='UTF-8' />");
      res.write("</head><body><table>");

      for(var prop in data) {
        res.write("<tr><th>" + prop + "</th><td>");
        res.write(data[prop]);
        res.write("</td></tr>");
      }

      res.end("</table></body></html>");

      process.exit(0);
    });
  }
);

});
});
});

}).listen(8080);