export async function fetchJson(url: string) {
  const data = await fetch(url, {
    method: "GET",
  });
  const jsonData = await data.json();
  return jsonData;
}

export async function postJson(
  url: string,
  body: any,
  method: "PUT" | "POST" | "PATCH"
) {
  const response = await fetch(url, {
    method: method || "POST",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}

export async function deleteJson(url: string, id: string) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
