import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, messages } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Generate a short, professional email reply confirming we received the inquiry.",
      },
      {
        role: "user",
        content: JSON.stringify(messages),
      },
    ],
  });

  // TODO: send via email provider (Resend / SMTP)
  console.log("Send email to:", email);
  console.log("Email body:", completion.choices[0].message.content);

  return NextResponse.json({ success: true });
}
