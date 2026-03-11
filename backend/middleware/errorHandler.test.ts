import { describe, it, expect, vi } from "vitest";
import { sanitizeInput } from "./errorHandler";
import { Request, Response, NextFunction } from "express";

describe("sanitizeInput middleware", () => {
  it("should strip out dangerous HTML tags in object properties", () => {
    const req = {
      body: {
        text: "<script>alert(1)</script>Hello",
        nested: {
          iframe: '<iframe src="evil.com"></iframe>World',
          safe: "Just text",
        },
      },
    } as unknown as Request;

    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    sanitizeInput(req, res, next);

    expect(req.body.text).toBe("Hello");
    expect(req.body.nested.iframe).toBe("World");
    expect(req.body.nested.safe).toBe("Just text");
    expect(next).toHaveBeenCalled();
  });

  it("should handle ReDoS payloads efficiently without catastrophic backtracking", () => {
    // A payload that previously caused exponential backtracking on the old regex:
    // /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
    const size = 50000;
    const maliciousPayload = "<script " + "<a".repeat(size);

    const req = {
      body: {
        dangerous: maliciousPayload,
      },
    } as unknown as Request;

    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    const start = process.hrtime.bigint();
    sanitizeInput(req, res, next);
    const end = process.hrtime.bigint();

    const timeTakenMs = Number(end - start) / 1e6;

    // The fixed regex should process this almost instantaneously (under 10ms typically)
    // We set a conservative bound of 1000ms just to ensure it doesn't hang indefinitely
    expect(timeTakenMs).toBeLessThan(1000);
    expect(next).toHaveBeenCalled();
  });

  it("should process arrays properly", () => {
    const req = {
      body: {
        items: ["<script>evil</script>safe1", "safe2", "<iframe src='abc'></iframe>safe3"],
      },
    } as unknown as Request;

    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    sanitizeInput(req, res, next);

    expect(req.body.items).toEqual(["safe1", "safe2", "safe3"]);
    expect(next).toHaveBeenCalled();
  });

  it("should sanitize req.query as well", () => {
    const req = {
      query: {
        search: "<object>obj</object>findme",
      },
    } as unknown as Request;

    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    sanitizeInput(req, res, next);

    expect(req.query.search).toBe("findme");
    expect(next).toHaveBeenCalled();
  });
});
