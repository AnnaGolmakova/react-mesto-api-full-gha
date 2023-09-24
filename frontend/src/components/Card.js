import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ place, handleCardClick, onCardLike, onCardDelete }) {
    const userContext = useContext(CurrentUserContext);
    const isOwn = place.owner._id === userContext._id;
    const likes = place.likes.length;
    const isLiked = place.likes.some(i => i._id === userContext._id);
    const cardLikeButtonClassName = (isLiked ? 'card__like-button_active ' : '') + 'card__like-button';

    function handleClick() {
        handleCardClick(place);
    }

    function handleLikeClick() {
        onCardLike(place);
    }

    function handleDeleteClick() {
        onCardDelete(place._id);
    }

    return (
        <li className="card">
            <img className="card__image" src={place.link} alt={place.name} onClick={handleClick} />
            <div className="card__description">
                <h2 className="card__title">{place.name}</h2>
                <div className="card__like">
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                    >
                        <span aria-label="Лайк"></span>
                    </button>
                    <div className="card__like-counter">{likes}</div>
                </div>
            </div>
            {isOwn && <button type="button" className="card__delete-button" onClick={handleDeleteClick} ><span aria-label="Удалить"></span></button>}
        </li>
    );
}

export default Card;