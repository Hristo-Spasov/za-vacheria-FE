import { NextResponse } from "next/server";
import { mainPageServices } from "@/services/mainPageServices";

export async function GET(requests: Request) {
  try {
    const { searchParams } = new URL(requests.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 30;

    const data = await mainPageServices.getRecipes(page, pageSize);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
