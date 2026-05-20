import { NextResponse } from "next/server";
import { mainPageServices } from "@/services/mainPageServices";

export async function GET() {
  try {
    const data = await mainPageServices.getRecipes();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
