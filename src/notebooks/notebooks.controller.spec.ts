import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notebook } from './entities/notebook.entity';
import { AppModule } from './../app.module';
import { HttpException, HttpStatus } from '@nestjs/common';


describe('Test unitarios de NotebooksController (usando spyOn)', () => {
  let controller: NotebooksController;
  let service: NotebooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule,
        TypeOrmModule.forFeature([Notebook]),],
      controllers: [NotebooksController],
      providers: [NotebooksService],
    }).compile();

    controller = module.get<NotebooksController>(NotebooksController);
    service = module.get<NotebooksService>(NotebooksService);

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const dto = { title: "PC Lenovo", content: "falla en arranque" };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Deberia devolver {id, title, content} por la creacion del registro', async () => {
    const result = { id: 1, title: "PC Lenovo", content: "falla en arranque" };


    jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(result));
    const respuesta = await controller.create(dto);
    expect(respuesta).toBe(result);
  });

  it('Deberia devolver todas las notebooks cargadas', async () => {
    const result = [{ id: 1, title: "PC Lenovo", content: "falla en arranque" }];

    jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));
    const respuesta = await controller.findAll();
    expect(respuesta).toBe(result);

  });

  it('Deberia devolver error cuando falla la creacion', async () => {
    jest.spyOn(service, 'create').mockRejectedValue(new Error());
    await expect(controller.create(dto)).rejects.toThrow(new HttpException('Error creating notebook', HttpStatus.BAD_REQUEST),);
  });

  it('Deberia devolver error cuando falla obtener todas las notebooks ', async () => {
    jest.spyOn(service,'findAll').mockRejectedValue(new Error());
    await expect(controller.findAll()).rejects.toThrow(new HttpException('Error retrieving notebooks',HttpStatus.INTERNAL_SERVER_ERROR));
  } )
});
