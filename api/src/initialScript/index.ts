import { RoleName } from 'src/common/constants/role.constant';
import { HashingService } from 'src/common/services/hasing.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { rootLogger } from 'src/routes/logger/logger';
import { randomUUID } from 'crypto';

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
  const hashedPassword = await hashingService.hash(
    process.env.ADMIN_PASSWORD as string,
  );
  const adminUser = await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL as string,
      password: hashedPassword,
      name: process.env.ADMIN_NAME as string,
      phone: process.env.ADMIN_PHONE_NUMBER as string,
      roleId: adminRole.id,
    },
  });
  return {
    createdRoleCount: roles.count,
    adminUser,
  };
};

const log = rootLogger.child({ job: 'init-seed-data', jobId: randomUUID() });
const started = Date.now();
log.info('Job started');
main()
  .then(({ adminUser, createdRoleCount }) => {
    log.info(
      {
        createdRoles: createdRoleCount,
        adminUserId: String(adminUser.id),
        durationMs: Date.now() - started,
      },
      'Job finished',
    );
  })
  .catch((err) => {
    log.error({ err, durationMs: Date.now() - started }, 'Job failed');
    process.exitCode = 1;
  });
