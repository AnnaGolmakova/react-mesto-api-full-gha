function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpened ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <form
                    name={`form_${props.name}`}
                    className="form"
                    onSubmit={props.onSubmit}
                    noValidate
                >
                    {props.children}
                    <button type="submit" className="save-button">{props.buttonText}</button>
                </form>
                <button
                    type="button"
                    className="popup__close"
                    onClick={props.onClose}
                />
            </div>
        </div>
    )
}

export default PopupWithForm;