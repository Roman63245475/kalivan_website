import {useState} from "react";

export function SearchComponent(){

    const [searchText, setSearchText] = useState('');

    function updateSearch(query: string){
        setSearchText(query);
    }

    async function onSearch(){
        const response = await fetch('https://dummyjson.com/posts/search?q='+searchText)
        const json = await response.json();
    }

    return(
        <div>
            <input placeholder="Search..." onChange={(e) => updateSearch(e.target.value)} value={searchText} />
            <button onClick={onSearch}>🔎</button>
        </div>
    );
}