import {faker} from '@faker-js/faker';

faker.locale = 'es';

const fakeProducts = (id) => {
  return {
    id,
    nombre: faker.commerce.productName(),
    precio: faker.commerce.price(),
    thumbnail: faker.image.image(),
  }
}

export default fakeProducts;