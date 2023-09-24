import { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [url, setURL] = useState('');

    useEffect(() => {
        setName('');
        setURL('');
    }, [props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeURL(e) {
        setURL(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name,
            url,
        });
    }

    return (
        <PopupWithForm
            title="Новое место"
            buttonText="Создать"
            name="add"
            isOpened={props.isOpen}
            onSubmit={handleSubmit}
            onClose={props.onClose}
        >
            <label className="form__field">
                <input
                    id="title-input"
                    type="text"
                    name="name"
                    className="form__input form__input_title"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    required
                    value={name}
                    onChange={handleChangeName}
                />
                <span className="form__input-error title-input-error"></span>
            </label>
            <label className="form__field">
                <input
                    id="url-input"
                    type="url"
                    name="url"
                    className="form__input form__input_subtitle"
                    placeholder="Ссылка на картинку"
                    required
                    value={url}
                    onChange={handleChangeURL}
                />
                <span className="form__input-error url-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;