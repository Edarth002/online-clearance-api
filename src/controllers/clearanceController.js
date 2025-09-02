import prisma from "../config/db.js";

/**
 * Student submits a new clearance request
 */
export const submitRequest = async (req, res) => {
  const studentId = req.user.id;
  const { matricNumber } = req.body; // ✅ get matricNumber from frontend

  try {
    // Check if student already submitted a request
    const existing = await prisma.clearanceRequest.findFirst({
      where: {
        student: {
          userId: studentId,
        },
      },
    });

    if (existing) {
      return res
        .status(409)
        .json({ message: "Clearance request already submitted" });
    }

    // Get student record
    const student = await prisma.student.findUnique({
      where: {
        userId: studentId,
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student record not found" });
    }

    if (!matricNumber) {
      return res.status(400).json({ message: "Matric number is required" });
    }

    // Create new clearance request
    const request = await prisma.clearanceRequest.create({
      data: {
        studentId: student.id, // ✅ link to student table ID
        matricNumber, // ✅ now defined
        status: "PENDING",
      },
    });

    res.status(201).json({ message: "Clearance request submitted", request });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Could not submit clearance request",
      error: err.message,
    });
  }
};

/**
 * Student views their current clearance request status
 */
export const getStatus = async (req, res) => {
  const studentId = req.user.id;

  try {
    const student = await prisma.student.findUnique({
      where: { userId: studentId },
    });

    if (!student) {
      return res.status(404).json({ message: "Student record not found" });
    }

    const request = await prisma.clearanceRequest.findFirst({
      where: { studentId: student.id },
      include: {
        approvals: {
          include: {
            officer: {
              include: {
                user: true,
              },
            },
          },
        },
        documents: true,
      },
    });

    if (!request) {
      return res.status(404).json({ message: "No clearance request found" });
    }

    res.json({
      status: request.status,
      approvals: request.approvals,
      documents: request.documents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Could not fetch clearance status",
      error: err.message,
    });
  }
};
