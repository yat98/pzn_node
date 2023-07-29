import { UserRepository } from "../src/user_repository";
import { UserService } from "../src/user_service";

jest.mock('../src/user_repository.js');

const repository = new UserRepository();
const service = new UserService(repository);

test('test mock class save', () => {
  const user = {id: 1, name: 'Hidayat'};
  service.save(user);
  expect(repository.save).toHaveBeenCalled();
  expect(repository.save).toHaveBeenCalledWith(user);
});

test('test mock class findById', () => {
  const user = {id: 1, name: 'Hidayat'};
  repository.findById.mockReturnValueOnce(user);
  expect(service.findById(1)).toEqual(user);
  expect(repository.findById).toHaveBeenCalled();
  expect(repository.findById).toHaveBeenCalledWith(1);
});

test('test mock class findAll', () => {
  const users = [
    {id: 1, name: 'Hidayat'},
    {id: 1, name: 'EKo'}
  ];

  repository.findAll.mockReturnValueOnce(users);

  expect(service.findAll()).toEqual(users);
  expect(repository.findAll).toHaveBeenCalled();
});