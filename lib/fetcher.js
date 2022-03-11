// using rest parameter in function to accept N number of args
export default async (url, token) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    credentials: 'same-origin'
  })
  return res.json()
}
