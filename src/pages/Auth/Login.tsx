import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = styled.form`
  background: rgba(26, 15, 46, 0.8);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(157, 78, 221, 0.2);
  transform: translateY(0);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #ffffff;
  margin-bottom: 2rem;
  font-family: 'Rajdhani', sans-serif;
  font-size: 2.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(157, 78, 221, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  color: #ffffff;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #9d4edd;
    box-shadow: 0 0 0 2px rgba(157, 78, 221, 0.2);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #9d4edd, #7b2cbf);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(157, 78, 221, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  margin-bottom: 1rem;
  text-align: center;
  padding: 0.8rem;
  background: rgba(255, 77, 77, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 77, 77, 0.3);
`;

const RememberMeLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #bbb;
  font-size: 1rem;
  margin-bottom: 1.2rem;
  cursor: pointer;
`;

const Checkbox = styled.input`
  accent-color: #9d4edd;
  width: 1.1rem;
  height: 1.1rem;
`;

const ShowPasswordLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #bbb;
  font-size: 1rem;
  margin-bottom: 1.2rem;
  cursor: pointer;
  user-select: none;
`;

const ShowPasswordCheckbox = styled.input`
  accent-color: #9d4edd;
  width: 1.1rem;
  height: 1.1rem;
`;

const Login: React.FC = () => {
  const [loginValue, setLoginValue] = useState(() => localStorage.getItem('rememberedLogin') || '');
  const [password, setPassword] = useState(() => localStorage.getItem('rememberedPassword') || '');
  const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem('rememberedLogin'));
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(loginValue, password);
      if (rememberMe) {
        localStorage.setItem('rememberedLogin', loginValue);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedLogin');
        localStorage.removeItem('rememberedPassword');
      }
      navigate('/profile');
    } catch (err) {
      setError('Invalid login or password');
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <Title>Sign In</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input
        type="text"
        placeholder="Email или Username"
        value={loginValue}
        onChange={(e) => setLoginValue(e.target.value)}
        required
      />
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <ShowPasswordLabel>
        <ShowPasswordCheckbox
          type="checkbox"
          checked={showPassword}
          onChange={e => setShowPassword(e.target.checked)}
        />
        Show password
      </ShowPasswordLabel>
      <RememberMeLabel>
        <Checkbox
          type="checkbox"
          checked={rememberMe}
          onChange={e => setRememberMe(e.target.checked)}
        />
        Remember Me
      </RememberMeLabel>
      <Button type="submit">Sign In</Button>
    </LoginForm>
  );
};

export default Login; 