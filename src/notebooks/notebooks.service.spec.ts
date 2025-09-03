import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksService } from './notebooks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notebook } from './entities/notebook.entity';
import { Repository } from 'typeorm';
import { NotebooksModule } from './notebooks.module';

describe('NotebooksService pruebas unitarias', () => {
  let service: NotebooksService;


  const mockNotebookRepository = {
    find: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockImplementation(dto => ({ id: 1, ...dto })),
    save: jest.fn().mockImplementation(notebook => Promise.resolve(notebook)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NotebooksModule,],
    }).overrideProvider(getRepositoryToken(Notebook))
    .useValue(mockNotebookRepository)
    .compile();

    service = module.get<NotebooksService>(NotebooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deberia devolver un arreglo vacio de notebooks', async ()=> {
    const result = await service.findAll();
    expect(mockNotebookRepository.find).toHaveBeenCalled();//no es obligatorio, pero verifica que el metodo find haya sido llamado por el findAll
    expect(result).toEqual([]);//toBe falla porque no son exactamente los mismos arreglos en memoria (son 2 arreglos vacios "distintos")
  });

  it('Deberia crear un nuevo registro en la base de datos { title: "PC Lenovo", content: "falla en arranque" }', async ()=>{
    const dto = { title: "PC Lenovo", content: "falla en arranque" };
    const result = await service.create(dto);

    expect(mockNotebookRepository.create).toHaveBeenCalledWith(dto); //no es obligatorio, pero testea la llamada al repository
    expect(mockNotebookRepository.save).toHaveBeenCalledWith({ id: 1, ...dto });//no es obligatorio, pero testea la llamada
    expect(result).toEqual({ id: 1, ...dto });
  } )
});
