import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = styled.form`
  background: rgba(26, 15, 46, 0.8);
  padding: 1.2rem 2rem 0.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(157, 78, 221, 0.2);
  transform: translateY(0);
  transition: transform 0.3s ease;
  margin-bottom: 0;
  padding-bottom: 0;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #ffffff;
  margin-bottom: 1.2rem;
  font-family: 'Rajdhani', sans-serif;
  font-size: 2.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding-bottom: 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem;
  margin-bottom: 0.8rem;
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
  margin-bottom: 0.7rem;
  
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
  margin-bottom: 0.7rem;
  text-align: center;
  padding: 0.6rem;
  background: rgba(255, 77, 77, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 77, 77, 0.3);
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

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    console.log('Form submitted with:', { email, username, password: password ? '***' : 'empty' });

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      console.log('Calling register function...');
      await register(email, password, username);
      console.log('Registration successful, navigating to profile...');
      navigate('/profile');
    } catch (err) {
      console.error('Registration error in component:', err);
      setError('Registration error');
    }
  };

  return (
    <RegisterForm onSubmit={handleSubmit}>
      <Title>Register</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please fill out this field')}
        onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please fill out this field')}
        onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
      />
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please fill out this field')}
        onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
      />
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Please fill out this field')}
        onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
      />
      <ShowPasswordLabel>
        <ShowPasswordCheckbox
          type="checkbox"
          checked={showPassword}
          onChange={e => setShowPassword(e.target.checked)}
        />
        Show password
      </ShowPasswordLabel>
      <Button type="submit">Register</Button>
    </RegisterForm>
  );
};

export default Register; 