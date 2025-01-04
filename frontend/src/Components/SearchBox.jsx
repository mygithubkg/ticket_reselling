import React from 'react'
import { useState } from "react"
import "../styles/Search_Box.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'




export default function SearchBox({search,setSearch}) {

    function handelchange(e) {
        setSearch(e.target.value)
        console.log(search)
    }
     return (
        
            <div className='Search-contanier1'>
              <FontAwesomeIcon  className="search-icon" icon={faMagnifyingGlass} size="xl" style={{color: "#008FDB"}} />
            
            <input  className='Search-box1' value={search} onChange={handelchange} type="text" placeholder='Search....' />
            </div>
                

       

    )
}
