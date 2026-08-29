const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api/v1";

export async function registerUser(username, email, password) {
    const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });
    return res.json();
}

export async function loginUser(email, password) {
    const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    return res.json();
}

export async function saveFavorite(recipeMarkdown, token) {
    const res = await fetch(`${API_URL}/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ recipeMarkdown })
    });
    return res.json();
}

export async function getFavorites(token) {
    const res = await fetch(`${API_URL}/favorites`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    return res.json();
}