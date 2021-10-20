import { ChangeEvent, ChangeEventHandler, FormEvent, KeyboardEvent, useContext, useState } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../context/auth';
import { api } from '../../services/api';
import styles from './styles.module.scss';

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    await api.post('messages', { message });

    setMessage('');
  };

  const handleEnter = (e: KeyboardEvent) => {
    if(e.key === 'Enter') {
      handleSendMessage(e);
    }
  };

  const handleChange = ({ target }: ChangeEvent) => {
    const { value } = target as HTMLTextAreaElement;
    setMessage(value);
  };

  return (
    <div className={ styles.sendMessageFormWrapper }>
      <button className={ styles.signOutButton } onClick={ signOut }>
        <VscSignOut size="32" />
      </button>

      <header className={ styles.userInformation }>
        <div className={ styles.userImage }>
          <img src={ user?.avatar_url } alt={ user?.name } />
        </div>
        <strong className={ styles.userName }>{ user?.name }</strong>
        <span className={ styles.userGithub }>
          <VscGithubInverted size="16" />
          { user?.login }
        </span>
      </header>

      <form onSubmit={ handleSendMessage } className={ styles.sendMessageForm }>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          value={ message }
          onChange={ handleChange }
          onKeyUp={ handleEnter }
        />
        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  );
};
