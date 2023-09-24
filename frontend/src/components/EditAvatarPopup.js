import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const inputRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();

        inputRef.current.focus();

        props.onUpdateAvatar({
            avatarURL: inputRef.current.value,
        });
    }

    return (
        <PopupWithForm
            title="Обновить аватар"
            buttonText="Сохранить"
            name="update-avatar"
            isOpened={props.isOpen}
            onClose={(props.onClose)}
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input
                    ref={inputRef}
                    id="avatar-url-input"
                    type="url"
                    name="url"
                    className="form__input form__input_subtitle"
                    placeholder="Ссылка на картинку"
                    required
                />
                <span className="form__input-error avatar-url-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;