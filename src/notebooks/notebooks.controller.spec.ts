import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';

describe('NotebooksController', () => {
  let controller: NotebooksController;
  let service: NotebooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotebooksController],
      providers: [NotebooksService],
    }).compile();

    controller = module.get<NotebooksController>(NotebooksController);
    service = module.get<NotebooksService>(NotebooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('NotebookController pruebas unitaria con spyOn, debe devolver {id, title, content} por la creacion del registro', async () => {
    const result = { id:1, title: "PC Lenovo", content: "falla en arranque"};
    const dto = {title: "PC Lenovo", content: "falla en arranque"};

    jest.spyOn(service,'create').mockImplementation(()=> Promise.resolve(result));
    const respuesta = await controller.create(dto);
    expect(respuesta).toBe(result);
  })
});
