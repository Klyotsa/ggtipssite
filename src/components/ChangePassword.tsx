import React, { useState } from 'react';
import styled from 'styled-components';

interface ChangePasswordProps {
  onClose: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const checkPasswordStrength = (password: string) => {
    if (password.length === 0) {
      setPasswordStrength('');
      return;
    }

    let strength = 0;
    let feedback = '';

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength < 3) {
      feedback = 'Слабый пароль';
    } else if (strength < 5) {
      feedback = 'Средний пароль';
    } else {
      feedback = 'Сильный пароль';
    }

    setPasswordStrength(feedback);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setNewPassword(password);
    checkPasswordStrength(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Валидация
    if (currentPassword === newPassword) {
      setError('Новый пароль должен отличаться от текущего');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Новые пароли не совпадают');
      return;
    }

    if (newPassword.length < 8) {
      setError('Новый пароль должен содержать минимум 8 символов');
      return;
    }

    // Дополнительная проверка безопасности
    if (newPassword.toLowerCase().includes('password') || 
        newPassword.toLowerCase().includes('admin') ||
        newPassword.toLowerCase().includes('123456')) {
      setError('Пароль слишком простой! Выберите более сложный пароль.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/backend/api/change_password.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Пароль успешно изменен!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordStrength('');
        
        // Закрываем модал через 2 секунды
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(data.error || 'Произошла ошибка при изменении пароля');
      }
    } catch (err) {
      setError('Ошибка соединения. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.includes('Слабый')) return '#f44336';
    if (passwordStrength.includes('Средний')) return '#ff9800';
    if (passwordStrength.includes('Сильный')) return '#4caf50';
    return '#ccc';
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>🔐 Изменить пароль</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <SecurityInfo>
          <h3>🛡️ Требования безопасности</h3>
          <ul>
            <li>Пароль должен содержать минимум 8 символов</li>
            <li>Рекомендуется использовать буквы, цифры и специальные символы</li>
            <li>Не используйте простые комбинации (123456, password)</li>
            <li>Регулярно меняйте пароль для безопасности</li>
          </ul>
        </SecurityInfo>

        {message && <SuccessMessage>{message}</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="current-password">Текущий пароль:</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Введите текущий пароль"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="new-password">Новый пароль:</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="Введите новый пароль"
              minLength={8}
              required
            />
            {passwordStrength && (
              <PasswordStrength style={{ color: getPasswordStrengthColor() }}>
                {passwordStrength}
              </PasswordStrength>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirm-password">Подтвердите новый пароль:</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите новый пароль"
              minLength={8}
              required
            />
          </FormGroup>

          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              Отмена
            </CancelButton>
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Изменение...' : 'Изменить пароль'}
            </SubmitButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 100%);
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  
  h2 {
    color: #ffd700;
    margin: 0;
    font-size: 1.8em;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  font-size: 2em;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const SecurityInfo = styled.div`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  
  h3 {
    color: #ffd700;
    margin-bottom: 15px;
    font-size: 1.2em;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 8px;
    padding-left: 20px;
    position: relative;
    color: #ccc;
    
    &:before {
      content: "✅";
      position: absolute;
      left: 0;
      color: #4CAF50;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #ffd700;
  font-weight: 600;
  font-size: 1em;
`;

const Input = styled.input`
  padding: 15px 20px;
  border: 1px solid rgba(157, 78, 221, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1em;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #9d4edd;
    box-shadow: 0 0 0 3px rgba(157, 78, 221, 0.1);
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const PasswordStrength = styled.div`
  font-size: 0.9em;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid currentColor;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled(Button)`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(45deg, #9d4edd, #7b2cbf);
  color: white;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(157, 78, 221, 0.3);
  }
`;

const Message = styled.div`
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
`;

const SuccessMessage = styled(Message)`
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
  border: 1px solid rgba(76, 175, 80, 0.3);
`;

const ErrorMessage = styled(Message)`
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
`;

export default ChangePassword;
