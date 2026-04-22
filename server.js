const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());


// 👇 SOLO ESTA LÍNEA PARA FRONTEND
app.use(express.static(path.join(__dirname, 'public')));

// HOME (opcional pero recomendado)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// BD
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'base_de_datos'
});

db.connect(() => console.log('MySQL conectado 🚀'));

// CRUD
app.get('/ventas', (req, res) => {
  db.query('SELECT * FROM ventas ORDER BY id_venta DESC', (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

app.post('/ventas', (req, res) => {
  const { id_cliente } = req.body;
  db.query('INSERT INTO ventas (id_cliente) VALUES (?)', [id_cliente], () => {
    res.json({ ok: true });
  });
});

app.put('/ventas/:id', (req, res) => {
  const { id } = req.params;
  const { id_cliente } = req.body;

  db.query(
    'UPDATE ventas SET id_cliente=? WHERE id_venta=?',
    [id_cliente, id],
    () => res.json({ ok: true })
  );
});

app.delete('/ventas/:id', (req, res) => {
  db.query('DELETE FROM ventas WHERE id_venta=?', [req.params.id], () => {
    res.json({ ok: true });
  });
});

app.listen(3000, () => console.log('http://localhost:3000'));