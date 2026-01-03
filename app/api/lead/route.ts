import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, messages, page } = await req.json();

  const lead = {
    email,
    page,
    summary: messages.slice(-3).map((m: { content: string }) => m.content).join(" "),
    createdAt: new Date(),
  };

  // Example: Airtable / Zoho / HubSpot
  console.log("New CRM Lead:", lead);

  return NextResponse.json({ success: true });
}
