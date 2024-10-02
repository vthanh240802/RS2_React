export async function fetchJson(url: string) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw error;
  }
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
