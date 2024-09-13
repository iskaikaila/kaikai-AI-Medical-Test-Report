module.exports = {
    development: {
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'Admin123',
      database: process.env.DB_NAME || 'MedixAI',
      host: process.env.DB_HOST || '192.168.10.13',
      dialect: 'postgres',
    },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'postgres',
    }
  };
  