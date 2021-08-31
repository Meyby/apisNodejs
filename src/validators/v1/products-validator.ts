import { checkSchema, ParamSchema, Schema } from 'express-validator';

const createProductSchema = (isStrict: boolean, prefix?: string): Schema => {
  const nameSchema: ParamSchema = {
    isString: true,
    rtrim: {
      options: ' ',
    },
    isLength: {
      options: {
        min: 2,
      },
    },
    errorMessage: 'name debe ser una cadena valida con mas de 2 caracteres',
  };

  const yearSchema: ParamSchema = {
    isInt: true,
      isString: {
        negated: true,
      },
      errorMessage: 'year debe ser un entero',
  }

  const priceSchema: ParamSchema = {
    isNumeric: true,
      isString: {
        negated: true,
      },
      custom: {
        options: (value: number) => {
          return value > 0;
        },
      },
      errorMessage: 'price debe tener un valor numerico > 0',
  }

  if (!isStrict) {
    const optional = {
      options: {
        nullable: true,
      }
    }

    nameSchema.optional = optional;
    yearSchema.optional = optional;
    priceSchema.optional = optional;
  }

  if (prefix) {
    const result: Schema = {};
    result[`${prefix}.name`] = nameSchema;
    result[`${prefix}.year`] = yearSchema;
    result[`${prefix}.price`] = priceSchema;
    return result;
  }

  return {
    name: nameSchema,
    year: yearSchema,
    price: priceSchema,
  };
};

export const validateNewProductBody = checkSchema(createProductSchema(true));

export const validateDelete = checkSchema({
  productId: {
    in: 'params',
    isMongoId: true,
  },
});

export const validateProductAndNotify = checkSchema({
  productId: {
    in: 'params',
    isMongoId: true,
  },
  client: {
    isEmail: true,
    in: 'body',
  },
  ...createProductSchema(false, 'data'),
});
