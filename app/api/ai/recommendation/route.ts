import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const { business, goal } = await req.json();

  const prompt = `
You are a senior web & AI consultant.

Based on:
- Business type: ${business}
- Primary goal: ${goal}

Recommend the best website solution.

Return ONLY valid JSON in this format:

{
  "title": string,
  "stack": string,
  "features": string[],
  "timeline": string,
  "summary": string
}

Keep recommendations realistic for an Indian agency.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    messages: [
      { role: "system", content: "You recommend web solutions." },
      { role: "user", content: prompt },
    ],
  });

  const text = completion.choices[0].message.content || "{}";

  try {
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "AI response parsing failed" },
      { status: 500 }
    );
  }
}
