export const createProductMutation = `
    mutation(
        $name: String!
        $description: String!
        $price: Int!
        $stock: Int!
        $image: String!
    ){
    createProduct(input:{
        name: $name
        description: $description
        price: $price
        stock: $stock
        image: $image
    }){
      id
      name
      description
      price
      stock
      image
    }
  }`;

export const updateProductMutation = `
    mutation(
        $id: ID!
        $name: String!
        $description: String!
        $price: Int!
        $stock: Int!
        $image: String!
    ){
    updateProduct(input:{
        id: $id
        name: $name
        description: $description
        price: $price
        stock: $stock
        image: $image
    }){
      id
      name
      description
      price
      stock
      image
      }
  }`;

export const deleteProductMutation = `
    mutation(
        $id: ID!
    ){
    deleteProduct(input:{
        id: $id
    })
  }`;

export const getProductQuery = `
    query(
        $id: ID!
    ){
    product(input:{
        id: $id
    }){
      id
      name
      description
      price
      stock
      image
    }
  }`;

export const getProductsQuery = `
    query{
    products{
      id
      name
      description
      price
      stock
      image
    }
  }`;
