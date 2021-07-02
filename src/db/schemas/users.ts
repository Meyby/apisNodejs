import { Schema, model } from 'mongoose';

interface User extends Document {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  password: string;
}


const schema = new Schema ({
  email: { type: String, unique: true, require: true }, // Datos unicos y que no contengan nulos
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  avatar: String,
  password: { type: String, require: true }
});

const Users = model<User>('user', schema);

export default Users;