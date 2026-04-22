const API = "http://localhost:3000/ventas";

// Cargar ventas
async function cargarVentas() {
  const res = await fetch(API);
  const data = await res.json();

  const tabla = document.getElementById("tablaVentas");
  tabla.innerHTML = "";

  data.forEach(v => {
    tabla.innerHTML += `
      <tr>
        <td>${v.id_venta}</td>
        <td>${v.id_cliente}</td>
        <td>
          <button class="btn-delete" onclick="eliminar(${v.id_venta})">🗑</button>
        </td>
      </tr>
    `;
  });
}

// Guardar
async function guardarVenta() {
  const id_cliente = document.getElementById("id_cliente").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_cliente })
  });

  cargarVentas();
}

// Eliminar
async function eliminar(id) {
  await fetch(API + "/" + id, { method: "DELETE" });
  cargarVentas();
}

cargarVentas();