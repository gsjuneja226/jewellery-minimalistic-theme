import { env } from "@/lib/env";

export interface OutboxJob {
  id: string;
  jobType: "email" | "sms" | "stock_release" | "abandoned_cart";
  payload: Record<string, any>;
  status: "pending" | "processing" | "completed" | "failed";
  attempts: number;
  maxAttempts: number;
  lastError?: string;
}

const memoryOutbox: OutboxJob[] = [];

export async function enqueueJob(
  jobType: OutboxJob["jobType"],
  payload: Record<string, any>
): Promise<string> {
  const id = `job_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  memoryOutbox.push({
    id,
    jobType,
    payload,
    status: "pending",
    attempts: 0,
    maxAttempts: 3,
  });
  return id;
}

export async function processOutboxJobs(): Promise<{
  processed: number;
  failed: number;
}> {
  let processed = 0;
  let failed = 0;

  const pendingJobs = memoryOutbox.filter((j) => j.status === "pending");

  for (const job of pendingJobs) {
    try {
      job.status = "processing";
      job.attempts += 1;

      if (job.jobType === "email") {
        console.log(`[OUTBOX:EMAIL] Sending to ${job.payload.to}: ${job.payload.subject}`);
      } else if (job.jobType === "sms") {
        console.log(`[OUTBOX:SMS] Sending OTP to ${job.payload.phone}`);
      } else if (job.jobType === "stock_release") {
        console.log(`[OUTBOX:STOCK] Released expired reservations`);
      } else if (job.jobType === "abandoned_cart") {
        console.log(`[OUTBOX:ABANDONED_CART] Sent recovery reminder`);
      }

      job.status = "completed";
      processed += 1;
    } catch (err: any) {
      job.lastError = err.message;
      if (job.attempts >= job.maxAttempts) {
        job.status = "failed";
        failed += 1;
      } else {
        job.status = "pending";
      }
    }
  }

  return { processed, failed };
}
