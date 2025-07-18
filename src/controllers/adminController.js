import prisma from "../config/db.js";

// Admin views all clearance requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await prisma.clearanceRequest.findMany({
      include: {
        student: {
          include: {
            user: true,
          },
        },
        approvals: {
          include: {
            officer: {
              include: { user: true },
            },
          },
        },
        documents: true,
      },
    });

    res.json(requests);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Could not fetch requests", error: err.message });
  }
};
