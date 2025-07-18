import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  //Delete existing data
  //   await prisma.approval.deleteMany();
  //   await prisma.clearanceRequest.deleteMany();
  //   await prisma.document.deleteMany();
  //   await prisma.user.deleteMany();

  // Create users
  const student = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "student@example.com",
      password: "$2a$12$sOv0VAuHz0nF5CUMBmdQk.WR08P.t2ftAROk2L6qSH4cooetWboqK",
      role: "STUDENT",
    },
  });

  const deptOfficer = await prisma.user.create({
    data: {
      name: "Mrs. Chika",
      email: "dept@example.com",
      password: "$2a$12$sOv0VAuHz0nF5CUMBmdQk.WR08P.t2ftAROk2L6qSH4cooetWboqK",
      role: "OFFICER",
    },
  });

  const facultyOfficer = await prisma.user.create({
    data: {
      name: "Mr. Obinna",
      email: "faculty@example.com",
      password: "$2a$12$sOv0VAuHz0nF5CUMBmdQk.WR08P.t2ftAROk2L6qSH4cooetWboqK",
      role: "OFFICER",
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Admin Mike",
      email: "admin@example.com",
      password: "$2a$12$sOv0VAuHz0nF5CUMBmdQk.WR08P.t2ftAROk2L6qSH4cooetWboqK",
      role: "ADMIN",
    },
  });

  // Add test clearance request
  const clearance = await prisma.clearanceRequest.create({
    data: {
      matricNumber: "UNN/2020/123456",
      department: "Computer Science",
      studentId: student.id,
      approvals: {
        create: [{ stage: "OFFICER" }, { stage: "OFFICER" }],
      },
    },
  });

  console.log("Seeded data successfully");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
