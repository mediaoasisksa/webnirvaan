import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { url } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an SEO expert. Provide a quick SEO audit checklist.",
      },
      { role: "user", content: `Audit this website: ${url}` },
    ],
  });

  return NextResponse.json({
    audit: completion.choices[0].message.content,
  });
}
