import { openai } from "@/lib/openai";
import { knowledgeBase } from "@/data/knowledge";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, page } = await req.json();

  /* ================= SYSTEM PROMPT ================= */

  const systemPrompt = `
You are WebNirvaan AI, a professional web & AI consultant.

Current page: ${page}

Guidelines:
- If page includes "pricing", focus on costs, packages, timelines.
- If page includes "work" or "portfolio", explain case studies and results.
- Otherwise, provide general guidance.

Use the following company knowledge when answering:
${knowledgeBase}
`;

  /* ================= OPENAI STREAM ================= */

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages, // ← user + assistant conversation
    ],
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
      } catch (err) {
        console.error("AI stream error:", err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
