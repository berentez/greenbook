import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormMessage, UserData } from '../../interfaces';
import { signUpService } from '../../services/sign-up-service';
import Message from '../common/alert-message';
import Button from '../common/button/Button';

import Input from '../common/input';
import Title from '../common/title';

import './signup.scss';

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  let history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const usernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleOnSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    let newUser: UserData = { username: '', password: '' };

    if (username.length === 0 || password.length === 8) {
      setMessage('Username and password are required.');
      setMessageType('error');
      return;
    } else if (password.length <= 8) {
      setMessage('Your password should be at least 8 characters.');
      setMessageType('error');
      return;
    } else {
      newUser.username = username;
      newUser.password = password;
    }
    let result: FormMessage = await signUpService(newUser);
    setMessage(result.message);
    setMessageType(result.type);

    if (result.type === 'success') {
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    }
  };

  return (
    <div className="content">
      <div className="formBox">
        <Title text="Sign Up" />
        <form className="form" onSubmit={handleOnSubmit}>
          <Input
            value={username}
            type="text"
            placeholder="My username"
            onChange={usernameChange}
          />
          <Input
            value={password}
            type="password"
            placeholder="My password"
            onChange={passwordChange}
          />
          <div className="redirection">
            <p>Already has an account?</p>
            <Link to="/login"> Go to Login!</Link>
          </div>
          <Button label="Sign Up" />
          <Message type={messageType} text={message} />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
