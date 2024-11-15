import 'dotenv/config';
import http from 'http';
import { handleStaticFileRequest } from './static-file-handler.js';

/**
 * 
 * @param {http.IncomingMessage} request 
 * @param {http.ServerResponse} response 
 */
async function handleRequest(request, response) {
	let url = new URL(request.url, 'http://' + request.headers.host);
	let path = url.pathname;
	let pathSegments = path.split('/').filter(function(segment) {
		if (segment === '' || segment === '..') {
			return false;
		} else {
			return true;
		}
	});

	if (pathSegments[0] === 'static') {
		await handleStaticFileRequest(pathSegments, request, response);
		return;
	}

	response.writeHead(501, { 'Content-Type': 'text/plain' });
	response.write('501 Not Implemented');
	response.end();
}

let server = http.createServer(handleRequest);

server.listen(process.env.PORT);