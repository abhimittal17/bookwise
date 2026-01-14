import prisma from "@/lib/prisma";
import { hashPassword } from "../lib/hash";

async function main() {
    const adminEmail = "admin@company.com";

    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (existingAdmin) {
        console.log("Admin already exists");
        return;
    }

    await prisma.user.create({
        data: {
            id: "admin-id-001",
            name: "Super Admin",
            email: adminEmail,
            role: "ADMIN",
            password: await hashPassword("Admin@123"),
            isActive: true,
        },
    });

    console.log("✅ Admin user created");
}

main()
    .catch(console.error)
    .finally(() => process.exit());
