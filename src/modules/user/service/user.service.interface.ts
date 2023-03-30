export interface UserService {
  findUserBy(type: string, field: string);
  findUsers();
  createUser(user: any);
  updateUser(user_id: any, userDetail: any);
}
