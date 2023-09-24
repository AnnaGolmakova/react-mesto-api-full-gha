import { useEffect, useState } from 'react';
import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from './InfoTooltip';

import api from '../utils/API';
import { userInfo } from '../utils/Auth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import '../index.css';

function App() {
  const [isEditProfilePopupOpen, setEditPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authorizedUser, setAuthorizedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    "name": "",
    "about": "",
    "avatar": "",
    "_id": "",
    "cohort": ""
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      api.getUserInfo()
        .then((res) => setCurrentUser(res))
        .catch((err) => {
          console.log(err);
        })
    }
  }, [isAuthorized])

  useEffect(() => {
    if (isAuthorized) {
      api.getCards().then((res) => setCards(res))
        .catch((err) => {
          console.log(err);
        })
    }
  }, [isAuthorized])

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      userInfo(token)
        .then((res) => {
          const userData = {
            email: res.data.email,
            _id: res.data._id
          }
          setAuthorizedUser(userData)
          setIsAuthorized(true);
          navigate("/", { replace: true })
        })
        .catch((err) => {
          logOut();
        })
    }
  }, [])

  function handleCardClick(place) {
    setSelectedCard(place)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(cardID) {
    api.deleteCard(cardID)
      .then((res) => {
        setCards(cards.filter((c) => c._id !== cardID))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setAddPopupOpen(false);
    setEditPopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSuccessPopupOpen(false);
    setErrorPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(user) {
    api.setUserInfo(user.name, user.about)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar.avatarURL)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCreateCard(card) {
    api.createCard(card.name, card.url)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function logOut() {
    setIsAuthorized(false);
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true })
  }

  return (
    <div className="page">
      <Header>
        {!isAuthorized && location.pathname === "/sign-up" &&
          <Link className="header__link" to="/sign-in">Войти</Link>
        }
        {!isAuthorized && location.pathname === "/sign-in" &&
          <Link className="header__link" to="/sign-up">Регистрация</Link>
        }
        {isAuthorized &&
          <div className="header__user-info">
            {authorizedUser && <div className='header__email'>{authorizedUser.email}</div>}
            <button className="header__link header__link_logout" onClick={logOut}>Выйти</button>
          </div>
        }
      </Header>

      <Routes>
        <Route path="/" element={
          <ProtectedRoute loggedIn={isAuthorized}>
            <CurrentUserContext.Provider value={currentUser}>
              <Main
                cards={cards}
                onCardLike={handleCardLike}
                onAddPlace={() => (setAddPopupOpen(true))}
                onEditProfile={() => (setEditPopupOpen(true))}
                onEditAvatar={() => (setEditAvatarPopupOpen(true))}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
              />
              <Footer />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleCreateCard}
              />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />
              {selectedCard &&
                <ImagePopup
                  image={selectedCard.link}
                  caption={selectedCard.name}
                  onClose={() => (closeAllPopups())}
                />
              }
            </CurrentUserContext.Provider>
          </ProtectedRoute>
        } />
        <Route path="/sign-up" element={
          <Register
            onSucess={() => { setSuccessPopupOpen(true) }}
            onError={() => { setErrorPopupOpen(true) }}
          />
        } />
        <Route path="/sign-in" element={
          <Login
            onSucess={() => { setIsAuthorized(true) }}
            onError={() => { setErrorPopupOpen(true) }}
          />
        } />
      </Routes>

      <InfoTooltip
        icon="error"
        isOpened={isErrorPopupOpen}
        onClose={closeAllPopups}
        title="Что-то пошло не так! Попробуйте ещё раз."
      />
      <InfoTooltip
        icon="done"
        isOpened={isSuccessPopupOpen}
        onClose={closeAllPopups}
        title="Вы успешно зарегистрировались!"
      />
    </div>
  );
}

export default App;
