import Fastify from "fastify";
const fastify = Fastify({
    logger: true,
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
    reply.header("content-type", "text/html; charset=UTF-8");
    reply.status(200);
    reply.send(`
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>App ID</th>
                    <th>App Owner</th>
                    <th>Build Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                    <td>#</td>
                    <td>App ID</td>
                    <td>App Owner</td>
                    <td>Build Status</td>
                    <td>
                        <button x-view-button="{&quot;id&quot:1}">Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
    `);
});

// Run the server!
try {
    await fastify.listen({ port: 3500 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
