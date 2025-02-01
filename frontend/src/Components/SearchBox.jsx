// import React, { useState } from 'react'
// import '../styles/Search_Box.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import SearchDropBox from './SearchDropBox'




import React, { useEffect, useRef } from 'react'
import { useState } from "react"
import "../styles/Search_Box.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import SearchDropBox from './SearchDropBox'





export default function SearchBox({search,setSearch,searchBoxResults,id,setId}) {

    function handelchange(e) {
        setSearch(e.target.value)
        // console.log(search)
        // console.log("hi");
        // console.log(searchBoxResults);
    }
     return (
        
            <div className='Search-contanier1'>
              <FontAwesomeIcon  className="search-icon" icon={faMagnifyingGlass} size="xl" style={{color: "#008FDB"}} />
            
            <input  className='Search-box1' value={search} onChange={handelchange} type="text" placeholder='Search....' />
            {search && <SearchDropBox searchBoxResults={searchBoxResults} id={id} setId={setId}/>}
            </div>
                

       

    )
}



// export default function SearchBox({ search, setSearch }) {
//     const [results, setResults] = useState([])

//     async function handleSearch(e) {
//         setSearch(e.target.value)
//         if (e.target.value) {
//             const response = await fetch(`https://api.example.com/search?q=${e.target.value}`)
//             const data = await response.json()
//             setResults(data)
//         } else {
//             setResults([])
//         }
//         console.log(search)
//     }

//     return (
//         <div className='Search-container1'>
//             <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} size="xl" style={{ color: "#008FDB" }} />
//             <input className='Search-box1' value={search} onChange={handleSearch} type="text" placeholder='Search....' />
//             {search && <SearchDropBox results={results} />}
//         </div>
//     )
// }
