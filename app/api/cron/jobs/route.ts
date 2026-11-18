import { NextRequest, NextResponse } from "next/server";
import { processOutboxJobs } from "@/lib/jobs/outbox";
import { env } from "@/lib/env";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || req.nextUrl.searchParams.get("secret");

  if (token !== env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized cron token" }, { status: 401 });
  }

  const result = await processOutboxJobs();
  return NextResponse.json({ success: true, ...result });
}

export async function GET(req: NextRequest) {
  return POST(req);
}
