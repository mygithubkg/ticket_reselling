import React from 'react'
import '../styles/SearchDropBox.css'
import { useNavigate } from 'react-router-dom';

const data = [
    {
        imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "IPL Match"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "IPL Match"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "IPL Match"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "IPL Match"
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "IPL Match"
    }
]

export default function SearchDropBox({searchBoxResults,id,setId}) {
    const navigate = useNavigate();
    function handleonclick(id) {
        navigate(`/Event/${id}`);
        setId(id);
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
