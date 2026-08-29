import { useState, useEffect } from "react";
import { getFavorites } from "../api";
import ReactMarkdown from "react-markdown";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api/v1";

async function removeFavorite(id, token) {
    const res = await fetch(`${API_URL}/favorites/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });
    return res.json();
}

function getTitle(markdown) {
    const firstLine = markdown.split("\n").find((line) => line.trim() !== "");
    return firstLine ? firstLine.replace(/[#*]/g, "").trim() : "Untitled Recipe";
}

export default function Favorites({ token, onClose }) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        async function fetchFavorites() {
            const result = await getFavorites(token);
            if (result.success) {
                setFavorites(result.data);
            }
            setLoading(false);
        }
        fetchFavorites();
    }, [token]);

    async function handleRemove(id, e) {
        e.stopPropagation();
        const result = await removeFavorite(id, token);
        if (result.success) {
            setFavorites(favorites.filter((fav) => fav._id !== id));
        }
    }

    function toggleExpand(id) {
        setExpandedId(expandedId === id ? null : id);
    }

    return (
        <section className="favorites-container">
            <div className="favorites-header">
                <h2>Your Saved Recipes</h2>
                <button onClick={onClose} className="close-favorites-btn">Back</button>
            </div>

            {loading && <p>Loading...</p>}
            {!loading && favorites.length === 0 && <p>No saved recipes yet.</p>}

            {favorites.map((fav) => (
                <div key={fav._id} className="favorite-item" onClick={() => toggleExpand(fav._id)}>
                    <div className="favorite-title-row">
                        <h3>{getTitle(fav.recipeMarkdown)}</h3>
                        <button
                            onClick={(e) => handleRemove(fav._id, e)}
                            className="remove-favorite-btn"
                            aria-label="Remove from favorites"
                        >
                            ♥
                        </button>
                    </div>

                    {expandedId === fav._id && (
                        <div className="favorite-expanded">
                            <ReactMarkdown>{fav.recipeMarkdown}</ReactMarkdown>
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
}