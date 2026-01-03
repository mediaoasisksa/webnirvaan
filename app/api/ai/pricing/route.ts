import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Pricing request received:", body);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI pricing assistant for web projects in India. Respond with price range and timeline.",
        },
        {
          role: "user",
          content: JSON.stringify(body),
        },
      ],
    });

    return NextResponse.json({
      estimate: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Pricing API error:", error);
    return NextResponse.json(
      { error: "Pricing calculation failed" },
      { status: 500 }
    );
  }
}
