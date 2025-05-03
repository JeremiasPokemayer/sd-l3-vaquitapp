import { client } from "@/lib/db/postgres";

type Purchase = {
  id: string;
  from: string;
  amount: number;
  message: string;
  date: Date;
  status: string;
};

async function agregarDonacion(nombre, mensaje, monto, fecha, estado) {
  const query =
    "INSERT INTO donaciones (nombre, mensaje, monto, fecha, estado) VALUES ($1, $2, $3, $4, $5 )";
  const values = [nombre, mensaje, monto, fecha, estado];

  try {
    await client.query(query, values);
    console.log("Donación agregada exitosamente");
  } catch (err) {
    console.error("Error al agregar donación", err.stack);
  }
}

export async function getConfirmedPayments(): Promise<Purchase[]> {
  const query = `SELECT * FROM public.donaciones 
  WHERE estado = 'confirmado'`;
  const res = await client.query(query);
  const data = res.rows;
  const purchases = data.map((row) => ({
    id: row.id,
    from: row.nombre,
    amount: row.monto,
    message: row.mensaje,
    date: row.fecha,
  }));

  return purchases;
}

export async function createPurchase(
  newPurchInput: Pick<Purchase, "from" | "amount" | "message">
): Promise<string> {
  const { from, amount, message } = newPurchInput;
  const fecha = new Date();
  const purchase = {
    ...newPurchInput,
    date: fecha,
    status: "pending",
  };
  await agregarDonacion(from, message, amount, fecha, "Pendiente");
  return "Donacion creada";
}

export async function confirmPurchase() {
  const queryGet = `
  SELECT * FROM public.donaciones
  ORDER BY id ASC `;

  const query = `
    UPDATE public.donaciones
    SET estado = 'confirmado'
    WHERE id = $1
  `;
  const purchase = await client.query(queryGet);
  const data = purchase.rows;
  const confirm = await client.query(query, [data.length]);
  return true;
}
