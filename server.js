// const express = require('express');
// const path = require('path');
// const mime = require('mime-types');

// const app = express();

// const port = process.env.PORT || 4000;

// app.use(express.static(path.join(__dirname, 'Freestyler/dist/freestyler/browser/'), {
//     setHeaders: (res, filePath) => {
//         if (filePath.endsWith('.js')) {
//             res.setHeader('Content-Type', mime.lookup(filePath));
//         }
//     }
// }));

// app.get('/*', function(req, res) {
//     console.log("Serving index.html");
//     res.sendFile(path.join(__dirname, 'Freestyler/dist/freestyler/browser/', 'index.html'));
// });

// app.listen(port, () => {
//     console.log(`App running on: http://localhost:${port}`);
// });

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

// Log __dirname to understand the directory structure
console.log(`__dirname: ${__dirname}`);

// Serve static files from the Angular app directory
const staticDir = path.join(__dirname, 'Freestyler/dist/freestyler/browser');
console.log(`Static files served from: ${staticDir}`);
app.use(express.static(staticDir));

app.get('/*', function(req, res) {
    const indexPath = path.join(staticDir, 'index.html');
    console.log(`Serving index.html from: ${indexPath}`);
    res.sendFile(indexPath);
});

// Start the app by listening on the default port
app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}`);
});