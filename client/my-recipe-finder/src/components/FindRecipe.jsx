import ReactMarkdown from "react-markdown"

export default function FindRecipe(props){
    return(
    <section>
        <h2>Chef Recommends: </h2>
        <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>

    )
}