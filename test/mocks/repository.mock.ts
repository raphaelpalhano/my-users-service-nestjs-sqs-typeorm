export const repositoryMock = () => ({
  find: jest.fn(),
  findOneOrFail: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  findById: jest.fn(),
  findBy: jest.fn(),
  save: jest.fn(),
  merge: jest.fn(),
  softDelete: jest.fn(),
  create: jest.fn().mockReturnValue({
    save: jest.fn(),
  }),
  insert: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue({
    withDeleted: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({
        getOne: jest.fn().mockReturnThis(),
      }),
    }),
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnThis(),
    getCount: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
  }),
  remove: jest.fn(),
  delete: jest.fn(),
  findAndCount: jest.fn(),
  update: jest.fn(),
});
