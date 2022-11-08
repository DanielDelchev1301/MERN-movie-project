import './Video.css'
import YoutubeEmbed from './YoutubeEmbed/YoutubeEmbed';
import { Link, useParams } from 'react-router-dom';

export function Video() {
    const { embed, title } = useParams();

    return (
        <>
            <div className="video">
                <h1>{title}</h1>
                <YoutubeEmbed embedId={embed}/>
            </div>
            <div className='check-more'>
                <p>If you want to watch another nice trailer, go to our <Link to='/catalog'>Movie List</Link> and choose one!</p>
            </div>
        </>
    );
}