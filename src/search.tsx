import {useState} from "react";

export function SearchComponent({currSearchText, updateSearch}){
    const [inputText, setInputText] = useState("");

    return(
        <div>
            <input placeholder="Search..." onChange={(e) => setInputText(e.target.value)} value={inputText} />
            <button onClick={() => updateSearch(inputText)}>🔎</button>
            <button onClick={() => {
                setInputText("");
                updateSearch("");
            }}>↩️</button>
        </div>
    );
}