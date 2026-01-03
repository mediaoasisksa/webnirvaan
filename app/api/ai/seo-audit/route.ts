import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const { website, business } = await req.json();

  const prompt = `
You are an SEO expert.

Perform a quick SEO audit for the following website:

Website URL: ${website}
Business type: ${business}

Return ONLY valid JSON in this format:

{
  "score": number,
  "strengths": string[],
  "issues": string[],
  "recommendations": string[],
  "summary": string
}

Assume no direct crawling is allowed.
Base the audit on best practices.
Keep it realistic for Indian businesses.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    messages: [
      { role: "system", content: "You perform SEO audits." },
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
