export const createProductMutation = `
    mutation(
        $title: String!
        $description: String!
        $price: Int!
        $category: String!
        $image: String!
    ){
    createProduct(input:{
        title: $title
        description: $description
        price: $price
        category: $category
        image: $image
    }){
      id
      title
      description
      price
      category
      image
    }
  }`;

export const updateProductMutation = `
    mutation(
        $id: ID!
        $title: String!
        $description: String!
        $price: Int!
        $category: String!
        $image: String!
    ){
    updateProduct(input:{
        id: $id
        title: $title
        description: $description
        price: $price
        category: $category
        image: $image
    }){
      id
      title
      description
      price
      category
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
      title
      description
      price
      category
      image
    }
  }`;

export const getProductsQuery = `
    query{
    products{
      id
      title
      description
      price
      category
      image
    }
  }`;
