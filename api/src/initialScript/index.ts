import { RoleName } from 'src/common/constants/role.constant';
import { HashingService } from 'src/common/services/hasing.service';
import { PrismaService } from 'src/common/services/prisma.service';
import envConfig from 'src/configs/config';

const prisma = new PrismaService();
const hashingService = new HashingService();
const main = async () => {
  const roleCount = await prisma.role.count();
  if (roleCount > 0) {
    throw new Error('Roles already exist');
  }
  const roles = await prisma.role.createMany({
    data: [
      {
        name: RoleName.Admin,
        description: 'Admin role',
      },
      {
        name: RoleName.Client,
        description: 'Client role',
      },
      {
        name: RoleName.Seller,
        description: 'Seller role',
      },
    ],
  });

  const adminRole = await prisma.role.findFirstOrThrow({
    where: {
      name: RoleName.Admin,
    },
  });
  const hashedPassword = await hashingService.hash(envConfig.ADMIN_PASSWORD);
  const adminUser = await prisma.user.create({
    data: {
      email: envConfig.ADMIN_EMAIL,
      password: hashedPassword,
      name: envConfig.ADMIN_NAME,
      phone: envConfig.ADMIN_PHONE_NUMBER,
      roleId: adminRole.id,
    },
  });
  return {
    createdRoleCount: roles.count,
    adminUser,
  };
};

main()
  .then(({ adminUser, createdRoleCount }) => {
    console.log(`Created ${createdRoleCount} roles`);
    console.log(`Created admin user: ${adminUser.email}`);
  })
  .catch(console.error);
