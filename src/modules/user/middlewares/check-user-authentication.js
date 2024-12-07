"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserAuthentication = checkUserAuthentication;
async function checkUserAuthentication(request, reply) {
    const { access_token } = request.cookies;
    if (!access_token) {
        return reply.status(401).send({
            error: 'Authentication required',
        });
    }
    try {
        const decoded = request.jwt.verify(access_token);
        request.user = decoded;
    }
    catch {
        return reply.status(401).send({
            error: 'Invalid or expired token',
        });
    }
}
