// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//     app.use(
//         '/register',
//         createProxyMiddleware({
//             target: 'http://65.2.51.31:9001',
//             changeOrigin: true,
//         })
//     );

//     app.use(
//         '/login',
//         createProxyMiddleware({
//             target: 'http://65.2.51.31:9001',
//             changeOrigin: true,
//         })
//     );

//     app.use(
//         '/api/logout',
//         createProxyMiddleware({
//             target: 'http://65.2.51.31:9001',
//             changeOrigin: true,
//         })
//     );

//     app.use(
//         '/retrive_update_user',
//         createProxyMiddleware({
//             target: 'http://65.2.51.31:9001',
//             changeOrigin: true,
//         })
//     );
// };
