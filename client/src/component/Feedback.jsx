import React, { useState } from 'react';
import '../styles/feedback.css';
const resources = {
  emojis: [
    {
      id: 0,
      name: 'Sad',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/sad-emoji-img.png',
    },
    {
      id: 1,
      name: 'None',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/none-emoji-img.png',
    },
    {
      id: 2,
      name: 'Happy',
      imageUrl: 'https://assets.ccbp.in/frontend/react-js/happy-emoji-img.png',
    },
  ],
  loveEmojiUrl: 'https://assets.ccbp.in/frontend/react-js/love-emoji-img.png',
}

const Feedback = () => {
  const [isFeedBack, setIsFeedback] = useState(true);

  const onChangeResponse = () => {
    setIsFeedback(false);
  };

  const originPage = () => {
    const { emojis } = resources;
    return (
      <div className="emojis-container">
        <h1>
          How satisfied are you with our
          <br />
          customer support performance
        </h1>
        <ul className="emoji-container">
          {emojis.map((emoji) => (
            <li key={emoji.id} className="list-container">
              <button
                type="button"
                onClick={onChangeResponse}
                className="button"
              >
                <img src={emoji.imageUrl} alt={emoji.name} className="img" />
                <p>{emoji.name}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const feedBackPage = () => {
    const { loveEmojiUrl } = resources;
    return (
      <div className="tq-container">
        <img src={loveEmojiUrl} alt="love emoji" />
        <h1>Thank You</h1>
        <p>
          we will use your feedback to improve our customer support
          <br />
          performance.
        </p>
      </div>
    );
  };

  return (
    <div className="bg-container">
      <div className="sub-container">
        {isFeedBack ? originPage() : feedBackPage()}
      </div>
    </div>
  );
};

export default Feedback;
