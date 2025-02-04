import "../styles/Search_Box.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import SearchDropBox from './SearchDropBox'





export default function SearchBox({search,setSearch,searchBoxResults,id,setId,sellerpage}) {

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
            {search && <SearchDropBox searchBoxResults={searchBoxResults} id={id} setId={setId} sellerpage={sellerpage}/>}
            </div>
                

       

    )
}