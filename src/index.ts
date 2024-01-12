import { PrismaClient } from '@prisma/client/edge';

export interface Env {
	DATABASE_URL: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		if (url.pathname !== '/') return new Response('Not found', { status: 404 });

		const prisma = new PrismaClient({ datasourceUrl: env.DATABASE_URL });
		await prisma.post.create({ data: {} });
		const result = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
		return new Response(JSON.stringify(result, undefined, '  '), {
			headers: { 'content-type': 'application/json' },
		});
	},
};
