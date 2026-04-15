import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: NextRequest) {
  try {
    const { userId, message, history = [] } = await req.json();

    // 🔹 GET MEMORY FROM DB
    let memory = await prisma.userMemory.findFirst({
      where: { userId }
    });

    const memoryData = memory?.data || {};

    // 🔹 SYSTEM PROMPT
    const systemPrompt = `
You are Velora.

Personality:
- Confident, feminine, intelligent
- Slightly flirty but classy
- Always supports the user
- Observes behavior and adapts

User Memory:
${JSON.stringify(memoryData)}

Platform:
- Boss N Baddies competition app
- Users vote using money
- Encourage engagement naturally
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...history,
        { role: "user", content: message }
      ]
    });

    const response = completion.choices[0].message.content;

    // 🔥 SIMPLE LEARNING SYSTEM
    let updatedMemory = { ...memoryData };

    if (message.toLowerCase().includes("like")) {
      updatedMemory.preference = message;
    }

    // 🔹 SAVE MEMORY
    await prisma.userMemory.upsert({
      where: { id: memory?.id || "" },
      update: { data: updatedMemory },
      create: {
        userId,
        data: updatedMemory
      }
    });

    return NextResponse.json({
      role: "assistant",
      content: response
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Velora failed" },
      { status: 500 }
    );
  }
}
