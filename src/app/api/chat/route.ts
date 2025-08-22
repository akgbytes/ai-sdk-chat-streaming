import {
  streamText,
  convertToModelMessages,
  smoothStream,
  UIMessage,
} from "ai";
import { google } from "@ai-sdk/google";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash-preview-05-20"),
    messages: convertToModelMessages(messages),
    experimental_transform: smoothStream({
      delayInMs: 25,
      chunking: "word",
    }),
  });

  return result.toUIMessageStreamResponse();
}
