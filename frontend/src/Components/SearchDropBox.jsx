import React from 'react'
import '../styles/SearchDropBox.css'
import { useNavigate } from 'react-router-dom';

export default function SearchDropBox({searchBoxResults,id,setId,sellerpage}) {
    const navigate = useNavigate();
    function handleonclick(id) {
        if(sellerpage){
            navigate(`/listing/step3_ticketdetails/${id}`)
            setId(id);
        } else{
            navigate(`/Event/${id}`);
            setId(id);
        }
      }
    return (
        <div className='SearchDropBox-container'>
            {searchBoxResults.map((item, index) => (
                <div key={index} className='SearchDropBox-item' onClick={() => handleonclick(item.event_id)}>
                    <img src={item.image_url} alt={item.event_name} className='SearchDropBox-image' />
                    <p className='SearchDropBox-title'>{item.event_name}</p>
                </div>
            ))}
        </div>
    )
}
