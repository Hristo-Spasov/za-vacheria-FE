import { NextResponse } from "next/server";
import { questionService } from "@/api/questionServices";



export async function GET() {
    try {
        const data = await questionService.getQuestions();
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500}) 
    }
}