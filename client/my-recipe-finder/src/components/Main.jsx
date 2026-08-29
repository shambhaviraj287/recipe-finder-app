import React from "react"
import FindRecipe from "./FindRecipe"
import IngredientsList from "./IngredientsList"
import Favorites from "./Favorites"
import { getRecipeFromMistral } from "../Ai"
import { saveFavorite } from "../api"

export default function Main({ token, onLogout }){

    let [ingredients , setIngredients] = React.useState([])
    const [showFavorites, setShowFavorites] = React.useState(false)

    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients=> [...prevIngredients, newIngredient])
    }
    const [recipe, setRecipe] = React.useState("")
    const [saveMessage, setSaveMessage] = React.useState("")

    async function getRecipe(){
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)   
    }

    async function handleSaveFavorite(){
        const result = await saveFavorite(recipe, token)
        if (result.success) {
            setSaveMessage("Saved to favorites!")
        } else {
            setSaveMessage("Could not save recipe.")
        }
    }

    if (showFavorites) {
        return <Favorites token={token} onClose={() => setShowFavorites(false)} />
    }
    
    return(
        <main>

        <div className="top-actions">
            <button onClick={() => setShowFavorites(true)} className="favorites-nav-btn">
                My Favorites
            </button>
            <button onClick={onLogout} className="logout-btn">Log out</button>
        </div>

        <form 
            action ={addIngredient}
            className="add-ingredient-form"
            >
            <input
                type="text" 
                placeholder="e.g. oregano" 
                aria-label="Add ingredient"
                name ="ingredient"
            />
            <button>+ Add Ingredient</button>

        </form>

        {ingredients.length > 0 && 
            <IngredientsList
                     ingredients = {ingredients} 
                     getRecipe={getRecipe} 
                     />}

        {recipe && (
            <>
                <FindRecipe recipe={recipe} />
                <button onClick={handleSaveFavorite} className="save-favorite-btn">
                    ♥ Save to Favorites
                </button>
                {saveMessage && <p className="save-message">{saveMessage}</p>}
            </>
        )}
        </main>
    )
}