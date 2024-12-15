const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const dayjs = require('dayjs');

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
    return res;
  } catch (err) {
    console.error('Error executing query', err.stack);
    return null;
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

// 获取可选日期集合
router.get('/available-dates-n-vacancies', async (req, res) => {
  const availableDateNVacancies = await connectAndQuery("select departure_time, (6 - num_of_travelers) as vacant_slots from bookinginfo where route = 'xujiahui-jingan' and num_of_travelers < 6 and departure_time <= (now() + interval '1 month')::date;");
  const departureTimes = availableDateNVacancies.rows.map(row => row.departure_time);
  const vacantSlots = availableDateNVacancies.rows.map(row => row.vacant_slots);
  console.log(departureTimes);
  console.log(vacantSlots);
  res.json({
    departureTimes: departureTimes,
    vacantSlots: vacantSlots
  });
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
  const { name, email, phone, amount_paid, travelers, travel_date } = req.body;
  console.log('Received data:', req.body);
  if (!name || !email || !phone || !amount_paid || !travelers || !travel_date) {
    return res.status(400).json({ message: 'some vital data fields of the transaction are missing.' });
  }
  const parsedDate = dayjs(travel_date.$d);
  if (!parsedDate.isValid()) {
    return res.status(400).json({ message: 'Invalid travel_date format.' });
  }
  const formattedDate = parsedDate.format('YYYY-MM-DD');
  console.log(`'Received user info: name -  ${name}, email - ${email}, phone - ${phone}, travelers - ${travelers}, travel_date - ${formattedDate}, amount_paid - ${amount_paid}'`);
  res.json({ message: 'user info received successfully' });
  await connectAndQuery("insert into userinfo (name, age, email, phone, travel_date, travelers, route, paid, amount_paid, transaction_time) values('" + name + "',null, '" + email + "', '" + phone + "', '"+ formattedDate +"' ," + travelers + ", 'xujiahui-jingan', true, " + amount_paid + ",now());");
  await connectAndQuery("update bookinginfo set num_of_travelers = num_of_travelers + " + travelers + " where departure_time='"+ formattedDate +"' and route = 'xujiahui-jingan'");
});

module.exports = router;
