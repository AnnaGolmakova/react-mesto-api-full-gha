function ImagePopup(props) {
    return (
        <div className="popup popup_opened popup_preview">
            <div className="popup__container popup__container_preview">
                <img className="popup__image" src={props.image} alt={props.name} />
                <h2 className="popup__caption">{props.caption}</h2>
                <button
                    type="button"
                    className="popup__close"
                    onClick={props.onClose}
                />
            </div>
        </div>
    )
}

export default ImagePopup;