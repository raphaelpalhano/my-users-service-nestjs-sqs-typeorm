import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UserEntity } from 'src/database/typeorm/entities';
import { Repository } from 'typeorm';
import { userMock } from 'test/mocks';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from 'src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Manipulate users route', () => {
  let app: INestApplication;
  let repositoryUser: Repository<UserEntity>;
  let userEntityMocked: UserEntity;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    repositoryUser = moduleFixture.get(getRepositoryToken(UserEntity));

    userEntityMocked = userMock(1)[0];
    await request(app.getHttpServer())
      .post('/users')
      .send(userEntityMocked)
      .set({ Accept: 'application/json' });

    const body = JSON.stringify({
      email: userEntityMocked.email,
      password: userEntityMocked.password,
    });
    const auth = await request(app.getHttpServer())
      .post('/auth')
      .send(body)
      .set({ 'Content-Type': 'application/json' });

    token = auth.body.token;
  });

  afterAll(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  it('create valid user', async () => {
    const userMocked = userMock(1)[0];
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(userMocked)
      .set({ Accept: 'application/json' });

    const user = await repositoryUser.find({
      where: {
        id: response.body.id,
      },
    });

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        birthDate: expect.any(String),
        age: expect.any(Number),
        id: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );

    expect(response.body.email).toEqual(user[0].email);
    expect(response.body.age).toEqual(user[0].age);
    expect(response.body.id).toEqual(user[0].id);
    expect(response.body.birthDate).toEqual(user[0].birthDate);
  });

  it('List all users', async () => {
    //act
    const response = await request(app.getHttpServer())
      .get('/users')
      .set({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      });

    //assert
    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        birthDate: expect.any(String),
        age: expect.any(Number),
        id: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('get specific user', async () => {
    //act
    const response = await request(app.getHttpServer())
      .get(`/users/${userEntityMocked.id}`)
      .set({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      });

    //assert
    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        birthDate: expect.any(String),
        age: expect.any(Number),
        id: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('update specific user', async () => {
    //arrange
    const updateBody = {
      name: 'Rafaelo',
      birthDate: '2003-05-21',
    };

    //act
    const response = await request(app.getHttpServer())
      .patch(`/users/${userEntityMocked.id}`)
      .send(updateBody)
      .set({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      });

    //assert
    expect(response.status).toBe(HttpStatus.ACCEPTED);
    expect(response.body.name).toEqual('Rafaelo');
    expect(response.body.birthDate).toEqual('2003-05-21');
    expect(response.body.age).toEqual(20);

    expect(response.body).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        birthDate: expect.any(String),
        age: expect.any(Number),
        id: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('delete specific user', async () => {
    const user = userMock(1)[0];
    repositoryUser.create(user);
    await repositoryUser.save(user);

    //act
    const response = await request(app.getHttpServer())
      .delete(`/users/${user.id}`)
      .set({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      });

    //assert
    expect(response.status).toBe(HttpStatus.OK);

    expect(response.body).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        birthDate: expect.any(String),
        age: expect.any(Number),
        id: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        deletedAt: expect.any(String),
      }),
    );
  });
});
