import prisma from "../config/db.js";

export const uploadDocument = async (req, res) => {
  const studentId = req.user.id;
  const { type } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const url = `/uploads/${file.filename}`; // You can change this path depending on your frontend needs

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

export const getDocuments = async (req, res) => {
  const studentId = req.user.id;

  try {
    const student = await prisma.student.findUnique({
      where: { userId: studentId },
    });

    const request = await prisma.clearanceRequest.findFirst({
      where: { studentId: student.id },
    });

    if (!request) {
      return res
        .status(404)
        .json({ message: "No clearance request found for this student" });
    }

    const documents = await prisma.document.findMany({
      where: { requestId: request.id },
    });

    res.json({ documents });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error retrieving documents", error: err.message });
  }
};
