import placeholder from '../images/avatar.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Profile(props) {
    const userContext = useContext(CurrentUserContext);

    return (
        <section className="profile">
            <button
                type="button"
                className="avatar-button"
                aria-label="Обновить аватар"
                onClick={props.onEditAvatar}
            >
                <img src={userContext.avatar !== "" ? userContext.avatar : placeholder} className="profile__avatar" alt="Аватар" />
            </button>
            <div className="profile__info">
                <div className="profile__info-editable">
                    <h1 className="profile__info-title">{userContext.name}</h1>
                    <button
                        type="button"
                        className="edit-button"
                        aria-label="Редактировать профиль"
                        onClick={props.onEditProfile}
                    />
                </div>
                <div className="profile__info-subtitle">{userContext.about}</div>
            </div>
            <button
                type="button"
                className="add-button"
                aria-label="Добавить"
                onClick={props.onAddPlace}
            />
        </section>
    )
}

export default Profile;