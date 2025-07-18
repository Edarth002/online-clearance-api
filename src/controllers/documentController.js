import prisma from "../config/db.js";

export const uploadDocument = async (req, res) => {
  const studentId = req.user.id;
  const { type, url } = req.body;

  try {
    const student = await prisma.student.findUnique({
      where: { userId: studentId },
    });

    const request = await prisma.clearanceRequest.findFirst({
      where: { studentId: student.id },
    });

    if (!request)
      return res
        .status(400)
        .json({ message: "Submit clearance request first" });

    const document = await prisma.document.create({
      data: {
        type,
        url,
        requestId: request.id,
      },
    });

    res.status(201).json({ message: "Document uploaded", document });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error uploading document", error: err.message });
  }
};
