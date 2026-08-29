import chef from '../chef-claude.webp' 


export default function Header(){
    return(
        <header>

        <img 
            className="logo"
            src={chef} 
            alt="chef" 
        />

        <p>Recipe-Finder</p>

        </header>
    )
}