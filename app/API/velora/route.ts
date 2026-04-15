import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getIO } from "@/server/socket";
import { z } from "zod";

const prisma = new PrismaClient();

// 🔐 Validation schema
const VoteSchema = z.object({
  userId: z.string(),
  contestantId: z.string(),
  amount: z.number().min(1).max(100)
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ Validate input
    const parsed = VoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    const { userId, contestantId, amount } = parsed.data;

    // 🔥 1. CREATE VOTE RECORD
    await prisma.vote.create({
      data: {
        userId,
        contestantId,
        amount
      }
    });

    // 🔥 2. UPDATE TOTAL VOTES
    const updatedContestant = await prisma.contestant.update({
      where: { id: contestantId },
      data: {
        votes_total: {
          increment: amount
        }
      }
    });

    // ⚡ 3. EMIT REAL-TIME UPDATE
    try {
      const io = getIO();

      io.emit("leaderboard:update", {
        contestantId,
        newTotal: updatedContestant.votes_total
      });
    } catch (err) {
      console.log("Socket not initialized yet");
    }

    return NextResponse.json({
      success: true,
      contestant: updatedContestant
    });

  } catch (error) {
    console.error("Vote error:", error);

    return NextResponse.json(
      { error: "Vote failed" },
      { status: 500 }
    );
  }
}
