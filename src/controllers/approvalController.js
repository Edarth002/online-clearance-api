import prisma from "../config/db.js";

// Officer approves or rejects a clearance request
export const approveClearance = async (req, res) => {
  const officerId = req.user.id;
  const { requestId, status, comment } = req.body;

  if (!["APPROVED", "REJECTED"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const officer = await prisma.clearanceOfficer.findUnique({
      where: { userId: officerId },
    });

    const approval = await prisma.clearanceApproval.upsert({
      where: {
        requestId_officerId: {
          requestId,
          officerId: officer.id,
        },
      },
      update: { status, comment },
      create: { requestId, officerId: officer.id, status, comment },
    });

    res.json({ message: `Request ${status.toLowerCase()}`, approval });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error processing approval", error: err.message });
  }
};

export const rejectClearance = async (req, res) => {
  req.body.status = "REJECTED";
  return approveClearance(req, res);
};
