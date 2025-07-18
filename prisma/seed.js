import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Delete existing data
  await prisma.approval.deleteMany();
  await prisma.clearanceRequest.deleteMany();
  await prisma.document.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const student = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "student@example.com",
      password: "hashed_student_password", // hash manually before using
      role: "STUDENT",
    },
  });

  const deptOfficer = await prisma.user.create({
    data: {
      name: "Mrs. Chika",
      email: "dept@example.com",
      password: "hashed_dept_password",
      role: "DEPARTMENT_OFFICER",
    },
  });

  const facultyOfficer = await prisma.user.create({
    data: {
      name: "Mr. Obinna",
      email: "faculty@example.com",
      password: "hashed_faculty_password",
      role: "FACULTY_OFFICER",
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Admin Mike",
      email: "admin@example.com",
      password: "hashed_admin_password",
      role: "ADMIN",
    },
  });

  // Add test clearance request
  const clearance = await prisma.clearanceRequest.create({
    data: {
      reason: "For final year clearance",
      matricNumber: "UNN/2020/123456",
      department: "Computer Science",
      studentId: student.id,
      approvals: {
        create: [{ stage: "DEPARTMENT_OFFICER" }, { stage: "FACULTY_OFFICER" }],
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
