import { NextResponse } from "next/server";
import { questionService } from "@/services/questionServices";



export async function GET() {
    try {
        const data = await questionService.getQuestions();
        return NextResponse.json(data)
    } catch {
        return NextResponse.json({error: "Failed to fetch questions"}, {status: 500})
    }
}
