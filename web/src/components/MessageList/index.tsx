import logoImg from '../../assets/logo.svg';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import io from 'socket.io-client';
import styles from './styles.module.scss';

type Message = {
  id: string;
  text: string;
  user: {
    avatar_url: string;
    name: string;
  };
};

const messagesQueue: Message[] = [];

const socket = io('http://localhost:4000');

socket.on('new_message', (newMessage: Message) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((prevMessages) => [
          messagesQueue[0],
          prevMessages[0],
          prevMessages[1],
        ].filter(Boolean));

        messagesQueue.shift();
      };
    }, 1000)
  }, [])

  useEffect(() => {
    (async function () {
      const response = await api.get<Message[]>('/messages/last3');
      setMessages(response.data);
    }())
  }, [])

  return (
    <div className={ styles.messageListWrapper }>
      <img src={ logoImg } alt="DoWhile 2021" />

      <ul className={ styles.messageList }>
        {
          messages.map((message, index) => {
            return (
              <li className={ styles.message } key={ `Mensagem ${index + 1}` }>
                <p className={ styles.messageContent }>{ message.text }</p>
                <div className={ styles.messageUser }>
                  <div className={ styles.userImage }>
                    <img src={ message.user.avatar_url } alt={ message.user.name } />
                  </div>
                  <span>{ message.user.name }</span>
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  )
};
