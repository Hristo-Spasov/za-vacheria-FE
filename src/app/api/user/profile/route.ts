import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/clients/prisma";


export async function GET() {
  const session = await auth();
  let userProfile;

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { email } = session.user;


  try {
    userProfile = await prisma.userProfile.findUnique({
      where: {
        userId: session?.user?.id,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 },
    );
  }
  const completeUserProfile = {
    email,
    ...userProfile,
  };
  return NextResponse.json(completeUserProfile);
}



