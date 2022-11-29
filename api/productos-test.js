import fakeProducts from '../utils/products_mock.js'

class MockService {
  products = []
  constructor() {}

  getAll(qty=5){
    for (let i = 0; i < qty; i++) {
      this.products.push(fakeProducts(i))
    }
    return this.products
  }
}

export default MockService