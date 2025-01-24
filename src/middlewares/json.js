export async function json(req,res){
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  // {"name": "Daniel", "Email": "daniel@email.com"} teria que esperar totalmente pra poder consumir.

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }

  res.setHeader('Content-type','application/json')
}

// Middleware é tudo que intercepta nossa api