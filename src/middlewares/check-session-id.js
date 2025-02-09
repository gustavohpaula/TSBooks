"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSessionId = checkSessionId;
async function checkSessionId(request, reply) {
    const { sessionId } = request.cookies;
    if (!sessionId) {
        return reply.status(401).send({
            error: 'Unauthorized',
        });
    }
}
