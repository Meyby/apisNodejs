import { Request, Response } from 'express';
import Products from '../../db/schemas/products';
import { sendError, validaObjectId } from '../../utils/errors';

export const createProduct = async (
  rq: Request,
  rs: Response
): Promise<void> => {
  try {
    const { name, year, price, description, user } = rq.body;

    validaObjectId(user);
    const product = await Products.create({
      name,
      year,
      price,
      description,
      user,
    });

    rs.send(product);
  } catch (e) {
    sendError(rs, e);
  }
};

export const getProducts = async (rq: Request, rs: Response): Promise<void> => {
  const itemsPerPage = 3;
  const page: number = parseInt(rq.query.page as string);
  const start = (page - 1) * itemsPerPage;
  const total: number = await Products.count();

  const products = await Products.find().skip(start).limit(itemsPerPage);

  rs.send({
    page: page,
    per_page: itemsPerPage,
    total: total,
    total_pages: Math.ceil(total / itemsPerPage),
    data: products,
  });
};

export const getProductById = async (
  rq: Request,
  rs: Response
): Promise<void> => {
  try {
    const { productId } = rq.params;

    validaObjectId(productId);

    const product = await Products.findById(productId);

    if (product) {
      rs.send({ data: product });
    } else {
      rs.status(404).send({});
    }
  } catch (e) {
    sendError(rs, e);
  }
};

export const updateProduct = async (
  rq: Request,
  rs: Response
): Promise<void> => {
  try {
    const id = rq.params.productId;

    validaObjectId(id);

    const { name, year, price, description, user } = rq.body;

    const updateProduct = await Products.findByIdAndUpdate(id, {
      name,
      year,
      price,
      description,
      user,
    });

    if (updateProduct) {
      rs.send({ data: 'OK' });
    } else {
      rs.status(404).send({});
    }
  } catch (e) {
    sendError(rs, e);
  }
};

export const partialUpdateProduct = async (
  rq: Request,
  rs: Response
): Promise<void> => {
  try {
    const productId = rq.params.productId;
    const { name, year, price, description, user } = rq.body;

    const product = await Products.findById(productId);

    if (product) {
      product.name = name || product.name;
      product.year = year || product.year;
      product.price = price || product.price;
      product.description = description || product.description;
      product.user = user || product.user;

      await product.save();

      rs.send({ data: product });
    } else {
      rs.status(404).send({});
    }
  } catch (e) {
    sendError(rs, e);
  }
};

export const deleteProductById = async (
  rq: Request,
  rs: Response
): Promise<void> => {
  try {
    const productId: string = rq.params.productId;

    validaObjectId(productId);

    const deleted: any = await Products.deleteOne({ _id: productId });

    if (deleted.deletedCount > 0) {
      rs.send({ data: 'Elemento eliminado' });
    } else {
      rs.status(404).send({});
    }
  } catch (e) {
    sendError(rs, e);
  }
};
