import { useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            buttonText="Сохранить"
            name="edit"
            isOpened={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input
                    id="name-input"
                    type="text"
                    name="name"
                    className="form__input form__input_title"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="40"
                    required
                    value={name}
                    onChange={handleChangeName}
                />
                <span className="form__input-error name-input-error"></span>
            </label>
            <label className="form__field">
                <input
                    id="job-input"
                    type="text"
                    name="job"
                    className="form__input form__input_subtitle"
                    placeholder="О себе"
                    minLength="2"
                    maxLength="200"
                    required
                    value={description}
                    onChange={handleChangeDescription}
                />
                <span className="form__input-error job-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;