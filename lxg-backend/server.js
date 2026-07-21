const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('url');

const FRONTEND_PORT = 8081;
const BACKEND_PORT = 8089;
const BACKEND_HOST = '192.168.10.7';

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

function serveFile(res, filePath) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
                    res.writeHead(200, { 
                        'Content-Type': 'text/html',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + err.code);
            }
        } else {
            const ext = path.extname(filePath);
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            res.end(content, 'utf-8');
        }
    });
}

let backendUnavailableLogged = false;

function proxyRequest(req, res) {
    console.log(`[Proxy] ${req.method} ${req.url}`);
    
    const headers = { ...req.headers };
    delete headers.host;
    delete headers.origin;
    delete headers.referer;
    
    const options = {
        hostname: BACKEND_HOST,
        port: BACKEND_PORT,
        path: req.url,
        method: req.method,
        headers: {
            ...headers,
            Host: `${BACKEND_HOST}:${BACKEND_PORT}`
        }
    };

    const proxyReq = http.request(options, (proxyRes) => {
        console.log(`[Proxy Response] ${proxyRes.statusCode}`);
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
    if (!backendUnavailableLogged) {
        console.log('Backend service unavailable, will retry automatically when service is ready');
        backendUnavailableLogged = true;
    }
    res.writeHead(503, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Backend service is not available' }));
});

    req.pipe(proxyReq, { end: true });
}

const server = http.createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    let pathname = parsedUrl.pathname;

    if (pathname === '/') {
        pathname = '/index.html';
    }

    if (pathname.startsWith('/api/')) {
        proxyRequest(req, res);
    } else {
        const filePath = path.join(__dirname, pathname);
        serveFile(res, filePath);
    }
});

server.listen(FRONTEND_PORT, () => {
    console.log(`Frontend server running on http://localhost:${FRONTEND_PORT}`);
    console.log(`Proxying API requests to http://${BACKEND_HOST}:${BACKEND_PORT}`);
});