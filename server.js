// server.js
const express = require('express');
const http = require('http');
const path = require('path');
const serveStatic = require('serve-static');
const app = express();
app.use(serveStatic(__dirname + '/build'));
app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'build/index.html'), function(err) {
		if (err) {
			res.status(500).send(err)
		}
	})
});
const server = http.createServer(app);
const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`App ready on ${port}`));
