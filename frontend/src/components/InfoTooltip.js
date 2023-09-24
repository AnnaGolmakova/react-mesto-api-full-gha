import iconError from '../images/icon-error.svg';
import iconDone from '../images/icon-done.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpened ? "popup_opened" : ""}`}>
            <div className="popup__container popup__container_tooltip">
                {props.icon === "error" &&
                    <img
                        className="popup__status-icon"
                        src={iconError}
                        alt="Иконка ошибки"
                    />
                }
                {props.icon === "done" &&
                    <img
                        className="popup__status-icon"
                        src={iconDone}
                        alt="Иконка успех"
                    />
                }
                <h2 className="popup__title popup__title_tooltip">{props.title}</h2>
                <button
                    type="button"
                    className="popup__close"
                    onClick={props.onClose}
                />
            </div>
        </div >
    )
}

export default InfoTooltip;