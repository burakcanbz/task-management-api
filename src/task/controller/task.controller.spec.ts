import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from '../service/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { HttpStatus } from '@nestjs/common';

describe('TaskController', () => {
    let controller: TaskController;
    let service: TaskService;

    const mockTaskService = {
        getAllTasks: jest.fn(),
        createTask: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TaskController],
            providers: [
                {
                    provide: TaskService,
                    useValue: mockTaskService,
                },
            ],
        }).compile();

        controller = module.get<TaskController>(TaskController);
        service = module.get<TaskService>(TaskService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllTasks', () => {
        it('should call taskService.getAllTasks and return results', async () => {
            const mockResponse = { success: true, error: false, message: `Tasks fetched successfully ${TaskService.name}`, statusCode: HttpStatus.OK, data: [] };

            mockTaskService.getAllTasks.mockResolvedValue(mockResponse);

            // mock result to check if controller returns the same result as service
            const result = await controller.getAllTasks();

            expect(service.getAllTasks).toHaveBeenCalled();
            expect(result).toEqual(mockResponse);
        });
    });

    describe('createTask', () => {
        it('should call taskService.createTask with DTO and return result', async () => {
            const dto: CreateTaskDto = { title: 'Test Task', completed: false };
            const mockResponse = { success: true, error: false, message: `Task created successfully ${TaskService.name}`, statusCode: HttpStatus.CREATED, data: dto };

            // mock response with mockResolvedValue
            mockTaskService.createTask.mockResolvedValue(mockResponse);

            const result = await controller.createTask(dto);

            // check if createTask called with dto
            expect(service.createTask).toHaveBeenCalledWith(dto);
            // check if result is equal to mockResponse
            expect(result).toEqual(mockResponse);
        });
    });
});