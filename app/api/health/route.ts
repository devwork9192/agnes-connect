import Logger from "@/lib/logger";

const logger = new Logger();

export async function GET(request: Request) {
  logger.info("Health check request", {
    path: "/api/health",
    method: "GET",
  });

  const healthStatus = {
    status: "ok",
    timestamp: new Date().toISOString(),
    requestId: logger.getRequestId(),
    uptime: process.uptime(),
    environment: process.env.NEXT_PUBLIC_APP_ENV || "unknown",
  };

  logger.info("Health check response", {
    ...healthStatus,
  });

  return new Response(JSON.stringify(healthStatus), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
