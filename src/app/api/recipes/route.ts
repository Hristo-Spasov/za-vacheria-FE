import { NextResponse } from "next/server";
import { mainPageServices } from "@/services/mainPageServices";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 30;
    const categories = searchParams.get("categories") || "";
    const difficulties = searchParams.get("difficulties") || "";
    const maxTime = searchParams.get("maxTime") || "";

    const recipes = await mainPageServices.getRecipes(page, pageSize, {
      categories: categories ? categories.split(",").map(Number) : [],
      difficulties: difficulties ? difficulties.split(",").map(Number) : [],
      maxTime: maxTime ? Number(maxTime) : null,
    });

    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}