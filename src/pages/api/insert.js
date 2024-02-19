'use server'
import { connect } from "@/utils/database";

const cleanPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/\D/g, ''); 
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); 
  }

  const { nome, telefone, email, produto, duvida, origem } = req.body;

  const telefoneLimpo = cleanPhoneNumber(telefone);

  try {
    const connection = await connect(); 

    const query = 'INSERT INTO leads_auto (nome, telefone, email, produto, duvida, data, origem) VALUES (?, ?, ?, ?, ?, NOW(), ?)';
    await connection.execute(query, [nome, telefoneLimpo, email, produto, duvida, origem]);

    connection.end();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
}