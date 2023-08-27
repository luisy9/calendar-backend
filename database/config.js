const mongoose = require('mongoose');

const dbcConnection = async() => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB Online');

  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inilizalizar BD');
  }
};


module.exports = {
    dbcConnection
}
