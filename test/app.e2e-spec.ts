import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { useContainer } from 'class-validator';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const activityShape = expect.objectContaining({
    id: expect.any(Number),
    title: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  });

  const activityData = [
    {
      title: 'Test',
    },
    {
      title: 'Test',
    },
  ];
  const todoData = [
    {
      activity_group_id: 1,
      title: 'Test',
      priority: 'MEDIUM',
      active: true,
    },
    {
      activity_group_id: 2,
      title: 'Test',
      priority: 'MEDIUM',
      active: false,
    },
  ];
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    await prisma.activity.create({
      data: activityData[0],
    });
    await prisma.activity.create({
      data: activityData[1],
    });
  });

  describe('Get /activity', () => {
    it('should return all activities', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        '/activity',
      );
      expect(status).toBe(200);
      expect(body).toEqual(expect.arrayContaining([activityShape]));
      expect(body).toHaveLength(2);
      expect(body[0].title).toBeTruthy();
    });
  });
});
