import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Clear previous data safely
  //   await prisma.approval.deleteMany();
  //   await prisma.clearanceRequest.deleteMany();
  //   await prisma.user.deleteMany();
  const hashedPassword =
    "$2a$12$sOv0VAuHz0nF5CUMBmdQk.WR08P.t2ftAROk2L6qSH4cooetWboqK";

  // Create users
  const student = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "student@example.com",
      password: hashedPassword,
      role: "STUDENT",
    },
  });

  const deptOfficer = await prisma.user.create({
    data: {
      name: "Mrs. Chika",
      email: "dept@example.com",
      password: hashedPassword,
      role: "OFFICER",
    },
  });

  const facultyOfficer = await prisma.user.create({
    data: {
      name: "Mr. Obinna",
      email: "faculty@example.com",
      password: hashedPassword,
      role: "OFFICER",
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Admin Mike",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Create a test clearance request with approval stages
  await prisma.clearanceRequest.create({
    data: {
      matricNumber: "UNN/2020/123456",
      department: "Computer Science",
      studentId: student.id,
      approvals: {
        create: [
          {
            stage: "DEPARTMENT_OFFICER",
            officerId: deptOfficer.id,
            status: "PENDING",
          },
          {
            stage: "FACULTY_OFFICER",
            officerId: facultyOfficer.id,
            status: "PENDING",
          },
        ],
      },
    },
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
