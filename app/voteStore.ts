
app.post("/vote", async (req, res) => {
  const { userId, contestantId, amount } = req.body;

  await prisma.vote.create({
    data: {
      userId,
      contestantId,
      amount
    }
  });

  await prisma.contestant.update({
    where: { id: contestantId },
    data: {
      votes_total: { increment: amount }
    }
  });

  res.json({ success: true });
});
