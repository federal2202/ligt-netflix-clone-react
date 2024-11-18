import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Player(){

    const {id} = useParams();
    const navigate = useNavigate();

    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        type: "",
    })

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDFkYWZhZTViYzg5YzAzYTk4YzcwOTkzZWI1MTNkZSIsIm5iZiI6MTczMTcxMTc5OC4wOTA2NjQ5LCJzdWIiOiI2NzM3ZDBjY2ZmMGUxODM3M2NlZWIyMjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8OIMvyL9K3c2F9CKBcCgjTcd7nCZoDJ4zTFzhiejsBw'
        }
      };
      useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results[0]))
            .catch(err => console.error(err));
      })

    return (
        <div className="player">
            <img src={back_arrow_icon} alt="" onClick={() => {navigate(-2)}}/>
            <iframe width='90%' 
                    height='90%' 
                    src={`https://www.youtube.com/embed/${apiData.key}`}
                    frameborder="0"
                    allowFullScreen>

            </iframe>
            <div className="player-info">
                <p>{apiData.published_at.slice(0,10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    )
}