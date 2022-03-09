// using rest parameter in function to accept N number of args
export default async (...args) => {
  const res = await fetch(...args)
  return res.json()
}
