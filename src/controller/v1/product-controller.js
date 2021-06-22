const products = [
  {
    "id": 1,
    "name": "cerulean",
    "year": 2000,
    "color": "#98B2D1",
    "pantone_value": "15-4020"
  },
  {
    "id": 2,
    "name": "fuchsia rose",
    "year": 2001,
    "color": "#C74375",
    "pantone_value": "17-2031"
  },
  {
    "id": 3,
    "name": "true red",
    "year": 2002,
    "color": "#BF1932",
    "pantone_value": "19-1664"
  },
  {
    "id": 4,
    "name": "aqua sky",
    "year": 2003,
    "color": "#7BC4C4",
    "pantone_value": "14-4811"
  },
  {
    "id": 5,
    "name": "tigerlily",
    "year": 2004,
    "color": "#E2583E",
    "pantone_value": "17-1456"
  },
  {
    "id": 6,
    "name": "blue turquoise",
    "year": 2005,
    "color": "#53B0AE",
    "pantone_value": "15-5217"
  },
  {
    "id": 7,
    "name": "Blanca",
    "year": 2006,
    "color": "#53B0AE",
    "pantone_value": "15-5217"
  }
];

const getProducts = (rq, rs) => {
  const itemsPerPage = 3;
  const page = parseInt(rq.query.page);
  const start = (page-1) * itemsPerPage;
  const total = products.length;
  const end = page * itemsPerPage;

  rs.send(
    {
      "page": page,
      "per_page": itemsPerPage,
      "total": total,
      "total_pages": Math.ceil(total/itemsPerPage),
      "data": products.slice(start, end),
    }
  )
}

const getProductById = (rq, rs) => {
  const { productId } = rq.params;
  const index = products.findIndex((item) => item.id == productId);

  if (index !== -1) {
    rs.send({ data: products[index]});
  } else {
    rs.status(404).send({});
  }
}

const createProduct = (rq, rs) => {
  const { name, year, color, pantone_value } = rq.body;
  const newProduct = {
    id: products.length + 1,
    name, // name: name
    year,
    color,
    pantone_value
  }

  products.push(newProduct);
  rs.send(newProduct);
}

const updateProduct = (rq, rs) => {
  const id = parseInt(rq.params.productId);
  const { name, year, color, pantone_value } = rq.body;
  const index = products.findIndex((item) => item.id == id);

  if (index !== -1) {
    products[index] = {
      id,
      name,
      year,
      color,
      pantone_value
    }
    rs.send({ data: products[index]});
  } else {
    rs.status(404).send({});
  }
}

const partialUpdateProduct = (rq, rs) => {
  const productId = parseInt(rq.params.productId);
  const { id, name, year, color, pantone_value } = rq.body;
  const index = products.findIndex((item) => item.id == productId);

  if (index !== -1) {
    const product = products[index];

    products[index] = {
      id: id || product.id,
      name: name || product.name,
      year: year || product.year,
      color: color || product.color,
      pantone_value: pantone_value || product.pantone_value
    };

    rs.send({ data: product });
  } else {
    rs.status(404).send({});
  }
}

const updateProductAndNotify = (rq, rs) => {
  const productId = parseInt(rq.params.productId);
  const { client, data } = rq.body;
  const { id, name, year, color, pantone_value } = data;
  const index = products.findIndex((item) => item.id == productId);

  if (index !== -1) {
    const product = products[index];

    products[index] = {
      id: id || product.id,
      name: name || product.name,
      year: year || product.year,
      color: color || product.color,
      pantone_value: pantone_value || product.pantone_value
    };

    rs.send({ data: products[index], message: `Email send to ${client}` });
  } else {
    rs.status(404).send({});
  }
}

const deleteProductById = (rq, rs) => {
  const productId = parseInt(rq.params.productId);
  const index = products.findIndex((item) => item.id == productId);

  if (index !== -1) {
    products.splice(index, 1);
    rs.send({});
  } else {
    rs.status(404).send({});
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  partialUpdateProduct,
  updateProductAndNotify,
  deleteProductById
}
