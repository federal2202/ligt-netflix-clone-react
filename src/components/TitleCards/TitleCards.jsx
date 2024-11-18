import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'


const url = "https://image.tmdb.org/t/p/w500/"

export default function TitleCards({title, category}){
    const [apiData, setApiData] = useState([])
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDFkYWZhZTViYzg5YzAzYTk4YzcwOTkzZWI1MTNkZSIsIm5iZiI6MTczMTcxMTc5OC4wOTA2NjQ5LCJzdWIiOiI2NzM3ZDBjY2ZmMGUxODM3M2NlZWIyMjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8OIMvyL9K3c2F9CKBcCgjTcd7nCZoDJ4zTFzhiejsBw'
        }
      };
      
      

    function handleWheel(event){
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }
    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category ? category :"now_playing"}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));

        cardsRef.current.addEventListener("wheel", handleWheel)
    }, [])
    return (
        <div className="title-cards">
            <h2>{title ? title : "Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}