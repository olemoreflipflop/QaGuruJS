import { faker } from '@faker-js/faker';

export class UserBulder {
  addEmail() {
    this.email = faker.internet.email();
    return this;
  }
  addUserName() {
    this.userName = faker.internet.userName();
    return this;
  }
  addPassword() {
    this.password = faker.internet.password();
    return this;
  }
  generate() {
    const copy = structuredClone({
      email: this.email,
      userName: this.userName,
      password: this.password,
    });
    return copy;
  }
}
