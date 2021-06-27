import moongoose from 'mongoose';

const connect = async (): Promise<boolean> => {

  try {
    await moongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
export default connect;
