/**
 * Structured Logger — AGNES Phase 1
 *
 * Usage:
 *   import logger from '@/lib/logger';
 *   logger.info('User signup', { userId: '123', email: 'user@example.com' });
 *   logger.error('Payment failed', { reason: 'expired card' }, new Error(...));
 *
 * All logs include:
 *   - timestamp (ISO 8601)
 *   - requestId (correlation ID for tracing)
 *   - level (info, warn, error, debug)
 *   - message
 *   - context (optional metadata)
 */

export interface LogContext {
  [key: string]: any;
}

export interface LogEntry {
  timestamp: string;
  requestId: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  context?: LogContext;
  error?: string;
}

class Logger {
  private requestId: string;

  constructor(requestId?: string) {
    this.requestId = requestId || this.generateRequestId();
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private formatEntry(
    level: string,
    message: string,
    context?: LogContext,
    error?: Error
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      requestId: this.requestId,
      level: level as "info" | "warn" | "error" | "debug",
      message,
      context,
      error: error ? error.message : undefined,
    };
  }

  private log(entry: LogEntry): void {
    const isDev = process.env.NODE_ENV === "development";
    const output = isDev
      ? JSON.stringify(entry, null, 2)
      : JSON.stringify(entry);

    if (entry.level === "error") {
      console.error(output);
    } else if (entry.level === "warn") {
      console.warn(output);
    } else {
      console.log(output);
    }
  }

  info(message: string, context?: LogContext): void {
    this.log(this.formatEntry("info", message, context));
  }

  warn(message: string, context?: LogContext): void {
    this.log(this.formatEntry("warn", message, context));
  }

  error(message: string, context?: LogContext, error?: Error): void {
    this.log(this.formatEntry("error", message, context, error));
  }

  debug(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV === "development") {
      this.log(this.formatEntry("debug", message, context));
    }
  }

  getRequestId(): string {
    return this.requestId;
  }
}

export default Logger;
