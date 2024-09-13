const express = require('express');
const path = require('path');
const mime = require('mime-types');

const app = express();

const port = process.env.PORT || 4000;

// Serve only the static files from the dist directory
app.use(express.static(path.join(__dirname, 'Freestyler/dist/freestyler/browser/'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', mime.lookup(filePath));
        }
    }
}));

app.get('/*', function(req, res) {
    console.log("Serving index.html");
    res.sendFile(path.join(__dirname, 'Freestyler/dist/freestyler/browser/', 'index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}`);
});