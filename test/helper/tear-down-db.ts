export default async () => {
  global.TESTCONTAINER_MYSQL.stop();
  console.log('[MySql container] stoped');
};
