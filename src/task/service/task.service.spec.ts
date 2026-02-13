import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { ITaskRepository } from '../interfaces/task.interface';
import { HttpStatus, HttpException, InternalServerErrorException } from '@nestjs/common';

describe('TaskService', () => {
    let service: TaskService;
    let repository: ITaskRepository;

    const mockTaskRepository = {
        findOne: jest.fn(),
        create: jest.fn(),
        getAllTasks: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TaskService,
                {
                    provide: ITaskRepository,
                    useValue: mockTaskRepository,
                },
            ],
        }).compile();

        service = module.get<TaskService>(TaskService);
        repository = module.get<ITaskRepository>(ITaskRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createTask', () => {
        it('if task with same title already exists dont create task and throw task already exists exception', async () => {
            mockTaskRepository.findOne.mockResolvedValue({ title: 'Existing Task' });

            await expect(service.createTask({ title: 'Existing Task', completed: false }))
                .rejects
                .toThrow(HttpException);

            expect(mockTaskRepository.findOne).toHaveBeenCalledWith('Existing Task');
        });

        it('when task is created successfully should return ResponseMessageDto', async () => {
            const dto = { title: 'New Task', completed: true };
            const createdEntity = { ...dto, createdAt: new Date() };

            mockTaskRepository.findOne.mockResolvedValue(null);
            mockTaskRepository.create.mockResolvedValue(createdEntity);

            const result = await service.createTask(dto);

            expect(result.success).toBe(true);
            expect(result.error).toBe(false);
            expect(result.statusCode).toBe(HttpStatus.CREATED);
            expect(result.message).toBe(`Task created successfully ${repository.constructor.name}`);
            expect(result.data.title).toBe(dto.title);
            expect(result.data.completed).toBe(dto.completed);
            expect(result.data.createdAt).toBe(createdEntity.createdAt);
        });

        it('if repository create fails should throw InternalServerErrorException', async () => {
            mockTaskRepository.findOne.mockResolvedValue(null);
            mockTaskRepository.create.mockResolvedValue(null);

            await expect(service.createTask({ title: 'Fault Task', completed: true }))
                .rejects
                .toThrow(InternalServerErrorException);
        });
    });

    describe('getAllTasks', () => {
        it('should return all tasks correctly mapped', async () => {
            const mockTasks = [
                { title: 'Task 1', completed: true, createdAt: new Date(), extraField: 'should be deleted' },
            ];
            mockTaskRepository.getAllTasks.mockResolvedValue(mockTasks);

            const result = await service.getAllTasks();

            expect(result.data).toHaveLength(1);  // check returning objects from db length is 1
            expect(result.data[0]).not.toHaveProperty('extraField'); // check returning objects from db has no extra fields
            expect(result.data[0].title).toBe('Task 1'); // check returning objects from db has title field
            expect(result.data[0].completed).toBe(true); // check returning objects from db has completed field
            expect(result.data[0].createdAt).toBe(mockTasks[0].createdAt); // check returning objects from db has createdAt field
            expect(result.success).toBe(true); // check returning objects from db has success field
            expect(result.error).toBe(false); // check returning objects from db has error field
            expect(result.statusCode).toBe(HttpStatus.OK); // check returning objects from db has statusCode field
            expect(result.message).toBe(`Tasks fetched successfully ${repository.constructor.name}`); // check returning objects from db has message field
        });

    });

});