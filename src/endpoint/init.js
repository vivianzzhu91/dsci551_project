export default async function api(path = '', init = {}) {
  const data = await fetch(path, init);
  const json = await data.json();
  if (!data.ok) {
    const message = json?.error ?? `${data.status} ${data.statusText}`;
    throw new Error(message);
  }
  return json;
}
