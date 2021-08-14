import { Schema, Document, model, ObjectId } from 'mongoose';
import { User } from './users';

interface Product extends Document {
  name: string;
  year: number;
  price?: number;
  description?: string;
  user: ObjectId | User;
}

const schema = new Schema({
  name: { type: String, require: true },
  year: { type: Number, require: true },
  price: { type: Number, default: 0 },
  description: String,
  user: { type: Schema.Types.ObjectId, ref: 'user', require: true }, // Es como una llave foranea
});

const Products = model<Product>('product', schema);

export default Products;
