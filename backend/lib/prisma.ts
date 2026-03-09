import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "production"
        ? ["error"]
        : ["error", "warn"],
    // Connection pool optimization for scale
    datasourceUrl: process.env.DATABASE_URL,
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

import Redis from "ioredis";

// ─── Scalable Caching (Redis with In-Memory Fallback) ───
class QueryCache {
  private redis: Redis | null = null;
  private memoryCache = new Map<string, { data: any; expiresAt: number }>();
  private useRedis = false;
  private readonly maxSize = 500;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    if (process.env.REDIS_URL) {
      try {
        this.redis = new Redis(process.env.REDIS_URL, {
          maxRetriesPerRequest: 3,
          retryStrategy(times) {
            if (times > 3) return null; // Stop retrying, fallback to memory
            return Math.min(times * 100, 3000);
          },
        });

        this.redis.on("error", (err) => {
          console.warn("Redis caching error, falling back to in-memory:", err.message);
          this.useRedis = false;
        });

        this.redis.on("ready", () => {
          console.log("Redis cache connected successfully.");
          this.useRedis = true;
        });

        this.useRedis = true;
      } catch (err) {
        console.warn("Failed to initialize Redis, using in-memory cache fallback.");
        this.useRedis = false;
      }
    } else {
      console.log("REDIS_URL not provided, using in-memory cache.");
    }

    // Periodic cleanup for memory cache
    this.cleanupInterval = setInterval(() => this.cleanupMemory(), 60_000);
  }

  async get<T>(key: string): Promise<T | null> {
    if (this.useRedis && this.redis) {
      try {
        const cached = await this.redis.get(key);
        if (cached) return JSON.parse(cached) as T;
        return null;
      } catch (err) {
        // Fallback silently
      }
    }

    // Memory Fallback
    const entry = this.memoryCache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.memoryCache.delete(key);
      return null;
    }
    return entry.data as T;
  }

  async set<T>(key: string, data: T, ttlMs: number): Promise<void> {
    if (this.useRedis && this.redis) {
      try {
        await this.redis.set(key, JSON.stringify(data), "PX", ttlMs);
        return;
      } catch (err) {
        // Fallback silently
      }
    }

    // Memory Fallback
    if (this.memoryCache.size >= this.maxSize) {
      const firstKey = this.memoryCache.keys().next().value;
      if (firstKey) this.memoryCache.delete(firstKey);
    }
    this.memoryCache.set(key, { data, expiresAt: Date.now() + ttlMs });
  }

  async invalidate(pattern?: string): Promise<void> {
    if (this.useRedis && this.redis) {
      try {
        if (!pattern) {
          await this.redis.flushdb();
        } else {
          // Use SCAN instead of KEYS for production safety (non-blocking)
          let cursor = "0";
          do {
            const [nextCursor, keys] = await this.redis.scan(
              cursor, "MATCH", `*${pattern}*`, "COUNT", 100
            );
            cursor = nextCursor;
            if (keys.length > 0) {
              await this.redis.del(...keys);
            }
          } while (cursor !== "0");
        }
      } catch (err) {
        // Fallback to memory invalidation if Redis fails
      }
    }

    // Always invalidate memory
    if (!pattern) {
      this.memoryCache.clear();
      return;
    }
    for (const key of this.memoryCache.keys()) {
      if (key.includes(pattern)) {
        this.memoryCache.delete(key);
      }
    }
  }

  private cleanupMemory(): void {
    const now = Date.now();
    for (const [key, entry] of this.memoryCache.entries()) {
      if (now > entry.expiresAt) {
        this.memoryCache.delete(key);
      }
    }
  }

  destroy(): void {
    if (this.cleanupInterval) clearInterval(this.cleanupInterval);
    if (this.redis) this.redis.quit();
    this.memoryCache.clear();
  }
}

export const queryCache = new QueryCache();
