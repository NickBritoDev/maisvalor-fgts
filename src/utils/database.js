import mysql from 'mysql2/promise';

const config = {
  host: 'database.grupogmvb.com',
  user: 'grupogmvb',
  password: 'bruno0422LA',
  database: 'grupogmvb',
  dialect: 'mysql',
  timezone: '-03:00',
  logging: false,
};

const connect = async () => {
  try {
    const connection = await mysql.createConnection(config);
    return connection;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
};

export { connect };
