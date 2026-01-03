import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Summarize this client requirement and suggest next steps.",
      },
      { role: "user", content: JSON.stringify(form) },
    ],
  });

  return NextResponse.json({
    summary: completion.choices[0].message.content,
  });
}
