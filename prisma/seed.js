import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const hashedPassword =
    "$2a$12$sOv0VAuHz0nF5CUMBmdQk.WR08P.t2ftAROk2L6qSH4cooetWboqK";

  // Create Users
  const studentUser = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@example.com",
      password: hashedPassword,
      role: "STUDENT",
    },
  });

  const deptUser = await prisma.user.create({
    data: {
      name: "Mrs. Chika",
      email: "chika@example.com",
      password: hashedPassword,
      role: "OFFICER",
    },
  });

  const facultyUser = await prisma.user.create({
    data: {
      name: "Mr. Obinna",
      email: "obinna@example.com",
      password: hashedPassword,
      role: "OFFICER",
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      name: "Admin Mike",
      email: "mike@example.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Create Student & Officers
  const student = await prisma.student.create({
    data: {
      userId: studentUser.id,
      matricNo: "UNN/2020/123456",
      department: "Computer Science",
      faculty: "Physical Sciences",
    },
  });

  const deptOfficer = await prisma.officer.create({
    data: {
      userId: deptUser.id,
      position: "Department Officer",
      department: "Computer Science",
    },
  });

  const facultyOfficer = await prisma.officer.create({
    data: {
      userId: facultyUser.id,
      position: "Faculty Officer",
      faculty: "Physical Sciences",
    },
  });

  // Create Clearance Request with Approvals
  await prisma.clearanceRequest.create({
    data: {
      studentId: student.id,
      matricNumber: student.matricNo,
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
