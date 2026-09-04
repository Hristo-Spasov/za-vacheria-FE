import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/clients/prisma";
import { z } from "zod";

const LETTERS_ONLY = /^[a-zA-ZÀ-ÿа-яА-ЯёЁ\s'\-]+$/u
const NICKNAME_PATTERN = /^[a-zA-Zа-яА-ЯёЁ0-9_\-]+$/u
const ADDRESS_PATTERN = /^[a-zA-Zа-яА-ЯёЁ0-9\s.,\/\-]+$/u
const POSTAL_CODE_PATTERN = /^[a-zA-Z0-9\s\-]+$/u

const updateProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(100)
    .refine((val) => !val || LETTERS_ONLY.test(val), {
      message: "Name may only contain letters, spaces, hyphens and apostrophes",
    })
    .nullable()
    .optional(),
  lastName: z
    .string()
    .trim()
    .max(100)
    .refine((val) => !val || LETTERS_ONLY.test(val), {
      message: "Last name may only contain letters, spaces, hyphens and apostrophes",
    })
    .nullable()
    .optional(),
  nickname: z
    .string()
    .trim()
    .max(50)
    .refine((val) => !val || NICKNAME_PATTERN.test(val), {
      message: "Nickname may only contain letters, numbers, hyphens and underscores",
    })
    .nullable()
    .optional(),
  phone: z
    .string()
    .trim()
    .refine(
      (val) => {
        if (!val) return true;
        if (!/^\+?[\d\s\-()]+$/.test(val)) return false;
        const digits = val.match(/\d/g);
        return digits && digits.length >= 7 && digits.length <= 15;
      },
      { message: "Phone number must contain between 7 and 15 digits" },
    )
    .nullable()
    .optional(),
  address: z
    .string()
    .trim()
    .max(200)
    .refine((val) => !val || ADDRESS_PATTERN.test(val), {
      message: "Address may only contain letters, numbers, spaces and common punctuation",
    })
    .nullable()
    .optional(),
  city: z
    .string()
    .trim()
    .max(100)
    .refine((val) => !val || LETTERS_ONLY.test(val), {
      message: "City may only contain letters, spaces and hyphens",
    })
    .nullable()
    .optional(),
  postalCode: z
    .string()
    .trim()
    .max(20)
    .refine((val) => !val || POSTAL_CODE_PATTERN.test(val), {
      message: "Postal code may only contain letters, numbers, spaces and hyphens",
    })
    .nullable()
    .optional(),
  country: z
    .string()
    .trim()
    .max(100)
    .refine((val) => !val || LETTERS_ONLY.test(val), {
      message: "Country may only contain letters, spaces and hyphens",
    })
    .nullable()
    .optional(),
})

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
    phone: userProfile?.phoneNumber ?? null,
  };
  return NextResponse.json(completeUserProfile);
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = updateProfileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: z.treeifyError(parsed.error) },
        { status: 400 },
      );
    }
    const updatedProfile = await prisma.userProfile.update({
      where: {
        userId: session.user.id,
      },
      data: {
        name: parsed.data.firstName ?? undefined,
        familyName: parsed.data.lastName ?? undefined,
        nickname: parsed.data.nickname ?? undefined,
        phoneNumber: parsed.data.phone ?? undefined,
        address: parsed.data.address ?? undefined,
        city: parsed.data.city ?? undefined,
        postalCode: parsed.data.postalCode ?? undefined,
        country: parsed.data.country ?? undefined,
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 },
    );
  }
}
