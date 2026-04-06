import Logger from "@/lib/logger";
import { supabase } from "@/lib/supabase";

const logger = new Logger();

export async function GET(request: Request) {
  logger.info("Health check request", {
    path: "/api/health",
    method: "GET",
  });

  try {
    let supabaseConnected = false;
    let supabaseError: string | null = null;

    const { data, error, count } = await supabase
      .from("_health")
      .select("id, checked_at", { count: "exact" })
      .limit(1);

    // Log the raw response for debugging
    logger.info("Supabase query response", {
      hasError: !!error,
      errorMessage: error?.message,
      rowsReturned: data?.length || 0,
      totalCount: count,
    });

    if (error) {
      supabaseError = error.message;
    } else {
      supabaseConnected = true;
    }

    const overallStatus = supabaseConnected ? "ok" : "degraded";
    const statusCode = supabaseConnected ? 200 : 503;

    const healthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      requestId: logger.getRequestId(),
      uptime: process.uptime(),
      environment: process.env.NEXT_PUBLIC_APP_ENV || "unknown",
      services: {
        supabase: {
          connected: supabaseConnected,
          error: supabaseError,
        },
      },
    };

    logger.info("Health check response", healthStatus);

    return new Response(JSON.stringify(healthStatus), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    logger.error("Health check failed", { error: errorMessage });

    const healthStatus = {
      status: "degraded",
      timestamp: new Date().toISOString(),
      requestId: logger.getRequestId(),
      error: errorMessage,
    };

    return new Response(JSON.stringify(healthStatus), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
}
