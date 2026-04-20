import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Here you would typically save to a database or call an external service like SuperPhone
    console.log(`Subscribed: ${phone}`);

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
