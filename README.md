# cloudflare-workers-prisma

## Getting Started

- initialize prisma

npm install
npm run dev:docker
npm run prisma

- start server

npm run dev

## scripts

```json
{
	"scripts": {
		"dev": "npm-run-all -p dev:*",
		"deploy": "wrangler deploy",
		"dev:worker": "cloudflared-output-domain --url http://127.0.0.1:55555 -- echo DATABASE_URL=prisma://{host}/?api_key=dummy > .dev.vars && wrangler dev",
		"dev:docker": "docker compose -f docker/docker-compose.yml up -d",
		"dev:proxy": "prisma-accelerate-local postgresql://postgres:password@localhost:15432/postgres -p 8000 -t",
		"dev:cloudflared": "cloudflared --metrics 127.0.0.1:55555 --url http://127.0.0.1:8000",
		"prisma": "npm-run-all -p prisma:*",
		"prisma:migrate": "prisma format && next-exec prisma migrate dev",
		"prisma:generate": "prisma generate --no-engine"
	}
}
```

## Connection Flow

The cloudflared domain name is output to `.dev.vars` by cloudflared-output-domain

```txt
   [postgres://localhost:15432]    [http://localhost:8000]    [https://xxxx.trycloudflare.com/]
PostgreSQL <-> prisma-accelerate-local     <->     cloudflared             <->         prisma/edge
```
