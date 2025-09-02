import prisma from "../config/db.js";

export const uploadDocument = async (req, res) => {
  const studentId = req.user.id;
  const { type } = req.body; // <-- optional, maybe used later
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Get the student
    const student = await prisma.student.findUnique({
      where: { userId: studentId },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Get clearance request
    const request = await prisma.clearanceRequest.findFirst({
      where: { studentId: student.id },
    });
    if (!request) {
      return res
        .status(400)
        .json({ message: "Submit clearance request first" });
    }

    // Save document
    const document = await prisma.document.create({
      data: {
        requestId: request.id, // ✅ valid foreign key
        name: file.originalname, // ✅ required field
        fileUrl: `/uploads/${file.filename}`,
      },
    });

    res.status(201).json({ message: "Document uploaded", document });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error uploading document",
      error: err.message,
    });
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
