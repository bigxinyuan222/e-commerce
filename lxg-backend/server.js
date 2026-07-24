// 引入Node.js内置模块
const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('url');

// 配置常量
const FRONTEND_PORT = 8081;    // 前端服务端口
const BACKEND_PORT = 8089;     // 后端API服务端口
const BACKEND_HOST = '192.168.10.7';  // 后端服务地址

// MIME类型映射表（用于静态文件响应）
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

// 读取并返回静态文件
function serveFile(res, filePath) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // 文件不存在时返回index.html（支持SPA路由）
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
                // 服务器错误
                res.writeHead(500);
                res.end('Server Error: ' + err.code);
            }
        } else {
            // 根据文件扩展名设置Content-Type
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

// 后端服务不可用日志标记（避免重复打印）
let backendUnavailableLogged = false;

// 将API请求代理到后端服务
function proxyRequest(req, res) {
    console.log(`[Proxy] ${req.method} ${req.url}`);
    
    // 移除可能导致问题的请求头
    const headers = { ...req.headers };
    delete headers.host;
    delete headers.origin;
    delete headers.referer;
    
    // 构建代理请求选项
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

    // 发起代理请求
    const proxyReq = http.request(options, (proxyRes) => {
        console.log(`[Proxy Response] ${proxyRes.statusCode}`);
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
    });

    // 处理代理请求错误（后端服务不可用）
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

// 创建HTTP服务器
const server = http.createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // 根路径默认返回index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // API请求代理到后端服务，其他请求返回静态文件
    if (pathname.startsWith('/api/')) {
        proxyRequest(req, res);
    } else {
        const filePath = path.join(__dirname, pathname);
        serveFile(res, filePath);
    }
});

// 启动服务器监听
server.listen(FRONTEND_PORT, () => {
    console.log(`Frontend server running on http://localhost:${FRONTEND_PORT}`);
    console.log(`Proxying API requests to http://${BACKEND_HOST}:${BACKEND_PORT}`);
});