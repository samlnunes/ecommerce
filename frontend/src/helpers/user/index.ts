export async function getUser(id: number) {
  const respose = await fetch(`http://localhost:8383/users/${id}`);
  const data = await respose.json();
  return data;
}

export async function getCartUser(id: number) {
  const respose = await fetch(`http://localhost:8383/cart/${id}`);
  const data = await respose.json();
  return data;
}
