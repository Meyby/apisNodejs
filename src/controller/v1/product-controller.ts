import { Request, Response } from 'express';
import Products from '../../db/schemas/products';
import { sendError, validaObjectId } from '../../utils/errors';

export const createProduct = async (
  rq: Request,
  rs: Response
): Promise<void> => {
  try {
    const { userId } = rq.session;    
    const { name, year, price, description } = rq.body;

    // validaObjectId(userId);
    const product = await Products.create({
      name,
      year,
      price,
      description,
      user: userId,
    });

    rs.send(product);
  } catch (e) {
    sendError(rs, e);
  }
};

export const getProducts = async (rq: Request, rs: Response): Promise<void> => {
  const itemsPerPage: number = 20;
  const page: number = parseInt(rq.query.page as string);
  const start = (page - 1) * itemsPerPage;
  const total: number = await Products.count({ user: rq.session.userId });
  
  const products = await Products.find({
    user: rq.session.userId // Es suficiente con quitarle el filtro para listar todos los productos
  })
    .skip(start)
    .limit(itemsPerPage);

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

    const product = await Products.findOne({
      _id: productId,
      user: rq.session.userId
    }).populate({
      path: 'user',
      select: {
        password: 0,
        __v: 0,
      },
    });

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

    const { name, year, price, description } = rq.body;

    const updateProduct = await Products.findOneAndUpdate({
      _id: id,
      user: rq.session.userId
    }, {
      name,
      year,
      price,
      description,
      user: rq.session.userId,
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
    const { name, year, price, description } = rq.body;

    const product = await Products.findOne({ 
      _id: productId,
      user: rq.session.userId
    });

    if (product) {
      product.name = name || product.name;
      product.year = year || product.year;
      product.price = price || product.price;
      product.description = description || product.description;

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

    const deleted: any = await Products.deleteOne({ 
      _id: productId,
      user: rq.session.userId
    });

    if (deleted.deletedCount > 0) {
      rs.send({ data: 'Eliminado' });
    } else {
      rs.status(404).send({});
    }
  } catch (e) {
    sendError(rs, e);
  }
};

export const updateProductAndNotify = async (
  rq: Request,
  rs: Response
): Promise<void> => {
  try {
    const productId = rq.params.productId;
    validaObjectId(productId);
    const { client, data } = rq.body;
    const { name, year, price, description } = data;

    const product = await Products.findOne({
      _id: productId,
      user: rq.session.userId
    });

    if (product) {
      product.name = name || product.name;
      product.year = year || product.year;
      product.price = price || product.price;
      product.description = description || product.description;

      rs.send({ data: product, message: `Email send to ${client}` });
    } else {
      rs.status(404).send({});
    }
  } catch (e) {
    sendError(rs, e);
  }
};
