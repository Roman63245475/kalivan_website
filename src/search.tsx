import {useState} from "react";

export function SearchComponent(){

    const [searchText, setSearchText] = useState('');

    return(
        <div>
            <input placeholder="Search..." onChange={(e) => {console.log("Chtoto")}}/>
            <button>🔎</button>
        </div>
    );
}