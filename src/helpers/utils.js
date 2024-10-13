import { faker } from '@faker-js/faker';

export const createUserData = () => {
  const user = {
    data: {
      email: faker.internet.email(),
      userName: faker.internet.userName(),
      password: faker.internet.password(),
    },
    getData() {
      return this.data;
    },
  };
  return user;
};

export const createArticleData = () => {
  const article = {
    data: {
      title: faker.lorem.word({ length: { min: 10, max: 15 } }),
      description: faker.lorem.words(3),
      body: faker.lorem.sentence(),
      tag: faker.color.human(),
    },
    getData() {
      return this.data;
    },
  };
  return article;
};
