import createReport from "@/lib/createReport";
import axios from "axios";
import { NextResponse } from "next/server";
import rateLimiter from "@/lib/rateLimiter";
import normalizeIp from "@/lib/server/utils/normalizeIp";
import { headers } from "next/headers";

export async function POST(request: Request) {
  //! When GDPR is implemented can be added to createReport request
  const rawAddress = (await headers()).get("x-forwarded-for") || "anonymous";
  const userIp = normalizeIp(rawAddress);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("recipeId");

  if (!id) {
    return NextResponse.json({ error: "Missing recipeId" }, { status: 400 });
  }
  //   Rate limiting
  try {
    await rateLimiter("report", userIp);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Too many requests";
    return NextResponse.json({ message }, { status: 429 });
  }
  try {
    await createReport(id, "anonymous");
    return NextResponse.json({ message: "Report created successfully" });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      return NextResponse.json({ message: "Report received" });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
