import prisma from "../config/db.js";

export const approveClearance = async (req, res) => {
  try {
    const officerId = req.user.id;
    const requestId = parseInt(req.params.requestId, 10);
    const { comment } = req.body;

    if (isNaN(requestId)) {
      return res.status(400).json({ error: "Invalid requestId" });
    }

    const officer = await prisma.officer.findUnique({
      where: { userId: officerId },
    });

    if (!officer) {
      return res.status(404).json({ message: "Officer not found" });
    }

    // ✅ Approve the request (in approvals table)
    const approval = await prisma.clearanceApproval.upsert({
      where: {
        requestId_officerId: {
          requestId,
          officerId: officer.id,
        },
      },
      update: { status: "APPROVED", comment, approvedAt: new Date() },
      create: {
        requestId,
        officerId: officer.id,
        stage: officer.position,
        status: "APPROVED",
        comment,
        approvedAt: new Date(),
      },
    });

    // ✅ Move request into AcceptedClearance
    const request = await prisma.clearanceRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    await prisma.acceptedClearance.create({
      data: {
        studentId: request.studentId,
        requestId: request.id,
      },
    });

    // Optionally: delete the old request
    await prisma.clearanceRequest.delete({ where: { id: requestId } });

    res.json({ message: "Clearance approved", approval });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Something went wrong", details: err.message });
  }
};

export const rejectClearance = async (req, res) => {
  try {
    const requestId = parseInt(req.params.requestId, 10);

    if (isNaN(requestId)) {
      return res.status(400).json({ error: "Invalid requestId" });
    }

    // Delete request so student can re-apply
    await prisma.clearanceRequest.delete({
      where: { id: requestId },
    });

    res.json({ message: "Clearance request rejected and deleted" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Something went wrong", details: err.message });
  }
};
