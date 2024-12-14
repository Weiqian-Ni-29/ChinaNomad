const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// 创建一个新的 PostgreSQL 客户端实例
const pool = new Pool({
  user: 'postgres',        // PostgreSQL 用户名
  host: 'localhost',            // PostgreSQL 服务器地址，通常是 localhost
  database: 'sinomad',    // 要连接的数据库名
  password: '123456',    // PostgreSQL 密码
  port: 5432,                   // PostgreSQL 默认端口
});

// 使用连接池获得一个客户端，并保持这个客户端连接
let client;

async function connectAndQuery(query) {
  if (!client) {
    // 如果还没有客户端连接，则获取一个连接
    client = await pool.connect();
    console.log('Connected to PostgreSQL');
  }

  try {
    // 执行查询
    const res = await client.query(query);
    console.log(res.rows);  // 查询结果
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}

async function closeConnection() {
  if (client) {
    // 关闭连接
    await client.release();
    client = null;
    console.log('Connection closed');
  }
}

// 可选日期集合
const availableDates = [
  '2024-12-10',
  '2024-12-12',
  '2024-12-15',
];

// 获取可选日期集合
router.get('/available-dates', (req, res) => {
  res.json(availableDates);
});

// 提交选定日期
router.post('/submit-booking', (req, res) => {
  const { date, numberOfTravelers } = req.body;

  if (!date || !numberOfTravelers) {
    return res.status(400).json({ message: 'Date and number of travelers are required.' });
  }

  console.log(`Received booking: Date - ${date}, Number of Travelers - ${numberOfTravelers}`);
  res.json({ message: 'Booking received successfully.' });
});

// 用户个人信息
router.post('/submit-userinfo', async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'name, email and phone number are required.' });
  }
  console.log(`'Received user info: name -  ${name}, email - ${email}, phone - ${phone}'`);
  res.json({ message: 'user info received successfully' });
  await connectAndQuery("insert into userinfo (name, age, email, phone, travel_date, paid) values('" + name + "',null, '" + email + "', '" +phone + "', '2024-01-15', true);");
  await connectAndQuery('select * from userinfo;');
});

module.exports = router;
