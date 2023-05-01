export async function getUser(id: number) {
  const respose = await fetch(process.env.REACT_APP_API_URL + `/users/${id}`);
  const data = await respose.json();
  return data;
}

export async function getCartUser(id: number) {
  const respose = await fetch(process.env.REACT_APP_API_URL + `/cart/${id}`);
  const data = await respose.json();
  return data;
}
