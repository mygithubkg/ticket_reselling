import React from 'react'
import { useState } from "react"
import "../styles/Search_Box.css"




export default function SearchBox({search,setSearch}) {

    function handelchange(e) {
        setSearch(e.target.value)
        console.log(search)
    }
     return (
        
            <div className='Search-contanier'>
            
            <input  className='Search-box' value={search} onChange={handelchange} type="text" placeholder='Search....' />
            </div>
                

       

    )
}
