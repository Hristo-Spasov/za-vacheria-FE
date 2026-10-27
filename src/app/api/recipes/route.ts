import { NextResponse } from "next/server";
import { mainPageServices } from "@/services/mainPageServices";
import { InvalidListingParamsError, RecipePageNotFoundError, parseListingParams, ListingSearchParams } from "@/lib/recipeListingParams";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params: ListingSearchParams = {};
    for (const key of ["page", "pageSize", "categories", "difficulties", "maxTime", "search"]) {
      const values = searchParams.getAll(key);
      params[key] = values.length > 1 ? values : values[0];
    }
    const { search, page, pageSize, filters } = parseListingParams(params);
    const recipes = await mainPageServices.getRecipes(search, page, pageSize, filters);

    return NextResponse.json(recipes);
  } catch (error) {
    if (error instanceof InvalidListingParamsError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof RecipePageNotFoundError) {
      return NextResponse.json({ error: "Recipe page does not exist" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
