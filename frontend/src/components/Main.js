import Profile from './Profile';
import Card from './Card';

function Main(props) {
    return (
        <main className="content">
            <Profile {...props} />
            <section className="pictures">
                <ul className="cards">
                    {props.cards.map((card, i) => (
                        <Card
                            key={card._id}
                            place={card}
                            handleCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;