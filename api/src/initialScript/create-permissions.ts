import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { HTTPMethod, RoleName } from 'src/common/constants/role.constant';
import { PrismaService } from 'src/common/services/prisma.service';
import { rootLogger } from 'src/routes/logger/logger';
import { randomUUID } from 'crypto';

const prisma = new PrismaService();
const log = rootLogger.child({
  job: 'create-permissions',
  jobId: randomUUID(),
});
const started = Date.now();

async function bootstrap() {
  log.info('Job started');
  const app = await NestFactory.create(AppModule);
  await app.listen(3010);
  const server = app.getHttpAdapter().getInstance();
  const router = server.router;
  const permissionsInDb = await prisma.permission.findMany({
    where: {
      deletedAt: null,
    },
  });
  const availableRoutes: {
    path: string;
    method: keyof typeof HTTPMethod;
    name: string;
    module: string;
  }[] = router.stack
    .map((layer) => {
      if (layer.route) {
        const path = layer.route?.path;
        const method = String(
          layer.route?.stack[0].method,
        ).toUpperCase() as keyof typeof HTTPMethod;
        const module = String(path.split('/')[1]).toUpperCase();
        return {
          path,
          method,
          name: method + ' ' + path,
          module,
        };
      }
    })
    .filter((item) => item !== undefined);
  // Tạo object permissionInDbMap với key là [method-path]
  const permissionInDbMap: Record<string, (typeof permissionsInDb)[0]> =
    permissionsInDb.reduce((acc, item) => {
      acc[`${item.method}-${item.path}`] = item;
      return acc;
    }, {});
  // Tạo object availableRoutesMap với key là [method-path]
  const availableRoutesMap: Record<string, (typeof availableRoutes)[0]> =
    availableRoutes.reduce((acc, item) => {
      acc[`${item.method}-${item.path}`] = item;
      return acc;
    }, {});

  // Tìm permissions trong database mà không tồn tại trong availableRoutes
  const permissionsToDelete = permissionsInDb.filter((item) => {
    return !availableRoutesMap[`${item.method}-${item.path}`];
  });
  let deletedCount = 0;
  let addedCount = 0;
  // Xóa permissions không tồn tại trong availableRoutes
  if (permissionsToDelete.length > 0) {
    const deleteResult = await prisma.permission.deleteMany({
      where: {
        id: {
          in: permissionsToDelete.map((item) => item.id),
        },
      },
    });
    deletedCount = deleteResult.count;
  }
  // Tìm routes mà không tồn tại trong permissionsInDb
  const routesToAdd = availableRoutes.filter((item) => {
    return !permissionInDbMap[`${item.method}-${item.path}`];
  });
  // Thêm các routes này dưới dạng permissions database
  if (routesToAdd.length > 0) {
    const permissionsToAdd = await prisma.permission.createMany({
      data: routesToAdd,
      skipDuplicates: true,
    });
    addedCount = permissionsToAdd.count;
  }

  // Lấy lại permissions trong database sau khi thêm mới (hoặc bị xóa)
  const updatedPermissionsInDb = await prisma.permission.findMany({
    where: {
      deletedAt: null,
    },
  });
  // Cập nhật lại các permissions trong Admin Role
  const adminRole = await prisma.role.findFirstOrThrow({
    where: {
      name: RoleName.Admin,
      deletedAt: null,
    },
  });
  await prisma.role.update({
    where: {
      id: adminRole.id,
    },
    data: {
      permissions: {
        set: updatedPermissionsInDb.map((item) => ({ id: item.id })),
      },
    },
  });

  log.info(
    {
      deleted: deletedCount,
      added: addedCount,
      durationMs: Date.now() - started,
    },
    'Job finished',
  );
  process.exit(0);
}
bootstrap().catch((err) => {
  log.error({ err, durationMs: Date.now() - started }, 'Job failed');
  process.exit(1);
});
