import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('NotebooksController Test de integracion (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/notebooks/ (GET) deberia devolver un arreglo de notebooks', () => {
    return request(app.getHttpServer())
      .get('/notebooks/')
      .expect(200)
      .expect([{ 'id': 1, 'title': "PC Lenovo", 'content': "falla en arranque" }]);
  });

  it('/notebooks/ (POST) deberia crear un nuevo registro (notebook)', () => {
    return request(app.getHttpServer())
      .post('/notebooks/')
      .send({ title: "HP Pavilion", content: "pantalla parpadea" })
      .expect(201)
      .expect(res => {
        expect(res.body).toMatchObject({
          title: "HP Pavilion",
          content: "pantalla parpadea",
          id: expect.any(Number)
        });
      });


  });
  })
