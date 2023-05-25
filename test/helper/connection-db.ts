import { MySqlContainer } from 'testcontainers';

const baseDbTestContainer = new MySqlContainer('mysql');
export default async () => {
  console.time('[MySql container] started in');
  console.log('[MySql container] starting...');
  const startedTestContainer = await baseDbTestContainer.start();
  process.env.DB_HOST = startedTestContainer.getHost();
  process.env.DB_PORT = String(startedTestContainer.getMappedPort(3306));
  process.env.DB_USERNAME = startedTestContainer.getUsername();
  process.env.DB_PASSWORD = startedTestContainer.getUserPassword();
  process.env.DB_NAME = startedTestContainer.getDatabase();
  global.TESTCONTAINER_MYSQL = startedTestContainer;
  console.timeEnd('[MySql container] started in');
};
