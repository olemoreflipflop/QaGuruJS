import { faker } from '@faker-js/faker';

export class ArticleBuilder {
  addTitle() {
    this.title = faker.lorem.word({ length: { min: 15, max: 25 } });
    return this;
  }
  addDescription() {
    this.description = faker.lorem.words(3);
    return this;
  }
  addBody() {
    this.body = faker.lorem.sentence();
    return this;
  }
  addTag() {
    this.tag = faker.color.human();
    return this;
  }
  generate() {
    const copy = structuredClone({
      title: this.title,
      description: this.description,
      body: this.body,
      tag: this.tag,
    });
    return copy;
  }
}
