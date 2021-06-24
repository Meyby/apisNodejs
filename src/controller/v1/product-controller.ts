import { Request, Response } from 'express';
import { products, Products } from '../../data/products';

export const getProducts = (rq: Request, rs: Response): void => {
  const itemsPerPage = 3;
  const page = parseInt(rq.query.page as string);
  const start = (page - 1) * itemsPerPage;
  const total = products.length;
  const end = page * itemsPerPage;

  rs.send({
    page: page,
    per_page: itemsPerPage,
    total: total,
    total_pages: Math.ceil(total / itemsPerPage),
    data: products.slice(start, end),
  });
};

export const getProductById = (rq: Request, rs: Response): void => {
  const { productId } = rq.params;
  const index: number = products.findIndex(
    (item) => item.id === parseInt(productId)
  );

  if (index !== -1) {
    rs.send({ data: products[index] });
  } else {
    rs.status(404).send({});
  }
};

export const createProduct = (rq: Request, rs: Response): void => {
  const { name, year, color, pantoneValue }: Products = rq.body;
  const newProduct: Products = {
    id: products.length + 1,
    name, // name: name
    year,
    color,
    pantoneValue,
  };

  products.push(newProduct);
  rs.send(newProduct);
};

export const updateProduct = (rq: Request, rs: Response): void => {
  const id = parseInt(rq.params.productId);
  const { name, year, color, pantoneValue }: Products = rq.body;
  const index = products.findIndex((item) => item.id === id);

  if (index !== -1) {
    products[index] = {
      id,
      name,
      year,
      color,
      pantoneValue,
    };
    rs.send({ data: products[index] });
  } else {
    rs.status(404).send({});
  }
};

export const partialUpdateProduct = (rq: Request, rs: Response): void => {
  const productId = parseInt(rq.params.productId);
  const { id, name, year, color, pantoneValue }: Products = rq.body;
  const index = products.findIndex((item) => item.id === productId);

  if (index !== -1) {
    const product = products[index];

    products[index] = {
      id: id || product.id,
      name: name || product.name,
      year: year || product.year,
      color: color || product.color,
      pantoneValue: pantoneValue || product.pantoneValue,
    };

    rs.send({ data: product });
  } else {
    rs.status(404).send({});
  }
};

export const updateProductAndNotify = (rq: Request, rs: Response): void => {
  const productId: number = parseInt(rq.params.productId);
  const { client, data } = rq.body;
  const { id, name, year, color, pantoneValue }: Products = data;
  const index: number = products.findIndex((item) => item.id === productId);

  if (index !== -1) {
    const product = products[index];

    products[index] = {
      id: id || product.id,
      name: name || product.name,
      year: year || product.year,
      color: color || product.color,
      pantoneValue: pantoneValue || product.pantoneValue,
    };

    rs.send({ data: products[index], message: `Email send to ${client}` });
  } else {
    rs.status(404).send({});
  }
};

export const deleteProductById = (rq: Request, rs: Response): void => {
  const productId = parseInt(rq.params.productId);
  const index: number = products.findIndex((item) => item.id === productId);

  if (index !== -1) {
    products.splice(index, 1);
    rs.send({});
  } else {
    rs.status(404).send({});
  }
};
