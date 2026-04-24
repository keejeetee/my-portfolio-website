import { streamText, type CoreMessage } from "ai";
import { groq } from "@ai-sdk/groq";
import { SYSTEM_PROMPT } from "@/lib/prompt";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: SYSTEM_PROMPT,
    messages,
    temperature: 0.8,
  });

  return result.toDataStreamResponse();
}
