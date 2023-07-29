import { UserRepository } from "../src/user_repository";
import { UserService } from "../src/user_service";

const repository = new UserRepository();
const service = new UserService(repository);

test('test mock class findById', () => {
  const user = {id: 1, name: 'Hidayat'};

  const findById = jest.spyOn(repository, 'findById');
  findById.mockReturnValueOnce(user);

  expect(service.findById(1)).toEqual(user);
  expect(findById).toHaveBeenCalled();
  expect(findById).toHaveBeenCalledWith(1);
  expect(repository.findById).toHaveBeenCalled();
  expect(repository.findById).toHaveBeenCalledWith(1);
});

test.failing('test mock class findAll', () => {
  service.findAll();
});