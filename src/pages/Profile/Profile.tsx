import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserCircle } from '@styled-icons/boxicons-regular';
import { Camera, Wallet, LogOut, UserDetail, LockAlt, ShoppingBag as ShoppingBagIcon, CreditCardAlt } from '@styled-icons/boxicons-solid';
import ChangePassword from '../../components/ChangePassword';

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 3rem;
  background: rgba(20, 10, 35, 0.85);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(157, 78, 221, 0.25);
  transition: all 0.3s ease-in-out;

  @media (max-width: 992px) {
  margin: 2rem auto;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1.5rem;
    border-radius: 12px;
  }
`;

const Title = styled.h1`
  color: #e0e0e0;
  margin-bottom: 2.5rem;
  font-family: 'Rajdhani', sans-serif;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.35);
  text-align: center;
`;

const ProfileNavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  gap: 1.5rem;
  border-bottom: 1px solid rgba(157, 78, 221, 0.2);
  padding-bottom: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
`;

const ProfileNavGroup = styled.nav`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const NavButton = styled.button<{ isActive: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${({ isActive }) => isActive ? 'linear-gradient(135deg, #9d4edd, #7b2cbf)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${({ isActive }) => isActive ? 'white' : '#c0c0c0'};
  border: 1px solid ${({ isActive }) => isActive ? '#9d4edd' : 'rgba(157, 78, 221, 0.2)'};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: ${({ isActive }) => isActive ? 'linear-gradient(135deg, #ad5eff, #8c3ddf)' : 'rgba(255, 255, 255, 0.1)'};
    border-color: #9d4edd;
    color: white;
  }
`;

const ProfileContentArea = styled.div`
  // This will hold the content of the active tab
  // No specific grid here, layout will be managed by child components or a simpler structure
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-bottom: 2rem;

  @media (min-width: 992px) {
    grid-template-columns: 350px 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProfileSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.section`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  border: 1px solid rgba(157, 78, 221, 0.2);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(157, 78, 221, 0.4);
    transform: translateY(-3px) translateX(3px);
  }
`;

const SectionTitle = styled.h2`
  color: #c593f5;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(157, 78, 221, 0.2);

  svg {
    width: 28px;
    height: 28px;
    color: #c593f5;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.label`
  font-weight: 500;
  color: #bda0e0;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

const InfoValue = styled.div`
  color: #f0f0f0;
  font-size: 1.1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(157, 78, 221, 0.15);
  word-break: break-word;

  &:last-child {
    border-bottom: none;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  border: 3px solid rgba(157, 78, 221, 0.4);
  margin: 0 auto 1.5rem auto;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(157, 78, 221, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarPlaceholder = styled(UserCircle)`
  width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.5);
`;

const AvatarUpload = styled.label`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    width: 20px;
    height: 20px;
    color: white;
  }

  &:hover {
    background: rgba(157, 78, 221, 0.7);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const Button = styled.button`
  padding: 0.9rem 1.8rem;
  background: linear-gradient(135deg, #9d4edd, #7b2cbf);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(157, 78, 221, 0.45);
    background: linear-gradient(135deg, #ad5eff, #8c3ddf);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(157, 78, 221, 0.3);
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(157, 78, 221, 0.3);
    color: #e0e0e0;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: #9d4edd;
      box-shadow: 0 4px 15px rgba(157, 78, 221, 0.25);
    }
  }
`;

const BalanceInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  margin-bottom: 1.1rem;
  border: 1px solid rgba(157, 78, 221, 0.2);
  min-height: 48px;
`;

const BalanceAmount = styled.div`
  font-size: 1.25rem;
  color: #a063f0;
  font-weight: 700;
`;

const PurchaseHistory = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PurchaseItem = styled.div`
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(157, 78, 221, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateX(4px);
    border-left: 4px solid #9d4edd;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  margin-bottom: 0;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(157, 78, 221, 0.25);
  border-radius: 8px;
  font-size: 1rem;
  color: #e0e0e0;
  transition: all 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
    border-color: #9d4edd;
    box-shadow: 0 0 0 3px rgba(157, 78, 221, 0.25), inset 0 1px 3px rgba(0,0,0,0.1);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const PasswordMessage = styled.div`
  color: #ff6b6b;
  margin-bottom: 1rem;
  text-align: center;
  padding: 0.6rem;
  background: rgba(255, 77, 77, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 77, 77, 0.3);
`;

const PasswordSuccess = styled(PasswordMessage)`
  color: #4caf50;
  background: rgba(76, 175, 80, 0.08);
  border: 1px solid rgba(76, 175, 80, 0.3);
`;

const PasswordSectionContainer = styled(Section)`
  max-width: 500px;
  margin: 0 auto;
`;

// Модальное окно для детального просмотра заказа
const OrderModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(20, 10, 35, 0.85);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
const OrderModalContent = styled.div`
  background: rgba(40, 20, 60, 0.98);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.45);
  padding: 2.5rem 2rem 2rem 2rem;
  width: 90vw;
  max-width: 1000px;
  color: #fff;
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  overflow: visible;
  max-height: none;
  @media (max-width: 800px) {
    flex-direction: column;
    gap: 1.2rem;
    padding: 1.2rem 0.5rem 1.2rem 0.5rem;
    max-width: 99vw;
    width: 99vw;
  }
`;
const ModalCloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  color: #c593f5;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1;
  transition: color 0.2s;
  &:hover { color: #fff; }
`;
const ModalTitle = styled.h3`
  color: #c593f5;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;
const ModalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.1rem;
  gap: 1.5rem;
`;
const ModalLabel = styled.div`
  color: #bda0e0;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.7px;
`;
const ModalValue = styled.div`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  word-break: break-word;
`;

const ModalLeft = styled.div`
  flex: 1 1 320px;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;
const ModalRight = styled.div`
  flex: 1 1 320px;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const TopupModalContent = styled(OrderModalContent)`
  max-width: 400px;
  width: 95vw;
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  gap: 1.2rem;
`;

const Profile: React.FC = () => {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.username || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');
  const [activeTab, setActiveTab] = useState('info');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [orderChats, setOrderChats] = useState<{[orderId: string]: {author: string, text: string, time: string}[]}>({});
  const [selectedTopup, setSelectedTopup] = useState<any | null>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Функция для обновления профиля с сервера
  const fetchProfile = async () => {
    const response = await fetch('/backend/api/profile.php', { credentials: 'include' });
    const data = await response.json();
    if (data.success && data.user) {
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
  };

  // При монтировании обновляем профиль
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 100);
  };

  // Загрузка аватара в БД
  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      await fetch('/backend/api/upload_avatar.php', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      // После загрузки обновляем профиль
      await fetchProfile();
    }
  };

  const handleSaveProfile = () => {
    if (!user) return;
    const updatedUser = { ...user, username: editedName, email: editedEmail };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    alert('Profile saved successfully!');
  };

  const handlePasswordChange = () => {
    setShowChangePassword(true);
  };

  if (!user) {
    return <div>Loading user profile...</div>;
  }

  const mockPurchases = [
    {
      id: 'ORD-1001',
      product: 'GTA V Boost',
      amount: 50,
      date: '2024-03-15',
      status: 'Completed',
      proofs: [
        'https://via.placeholder.com/320x180.png?text=Proof+1',
        'https://via.placeholder.com/320x180.png?text=Proof+2',
        // можно добавить видео: 'https://samplelib.com/mp4/sample-5s.mp4'
      ],
      paymentMethod: 'Card',
      chat: [
        {author: 'manager', text: 'Здравствуйте! Ваш заказ принят в работу.', time: '09:00'},
        {author: 'user', text: 'Спасибо, жду!', time: '09:01'},
      ]
    },
    {
      id: 'ORD-1002',
      product: 'Path of Exile 2 Leveling',
      amount: 75,
      date: '2024-03-10',
      status: 'In Progress',
      proofs: [],
      paymentMethod: 'Crypto',
      chat: []
    },
  ];

  const mockTopups = [
    {
      id: 'TOPUP-2001',
      amount: 500,
      date: '2024-04-01',
      time: '14:23',
      method: 'Card'
    },
    {
      id: 'TOPUP-2002',
      amount: 250,
      date: '2024-03-20',
      time: '10:05',
      method: 'Crypto'
    },
  ];

  const mockBalance = 1250;

  return (
    <ProfileContainer>
      <Title>Hello, {user.username}!</Title>

      <ProfileNavBar>
        <ProfileNavGroup>
          <NavButton isActive={activeTab === 'info'} onClick={() => setActiveTab('info')}><UserDetail /> Info</NavButton>
          <NavButton isActive={activeTab === 'balance'} onClick={() => setActiveTab('balance')}><CreditCardAlt /> Balance</NavButton>
          <NavButton isActive={activeTab === 'history'} onClick={() => setActiveTab('history')}><ShoppingBagIcon /> History</NavButton>
          <NavButton isActive={activeTab === 'password'} onClick={() => setActiveTab('password')}><LockAlt /> Password</NavButton>
          <NavButton isActive={false} onClick={handleLogout} style={{marginLeft: '1.5rem'}}>
            <LogOut /> Log Out
          </NavButton>
        </ProfileNavGroup>
      </ProfileNavBar>

      <ProfileContentArea>
        {activeTab === 'info' && (
      <ProfileGrid>
        <ProfileSidebar>
          <AvatarContainer>
                {user.avatar_base64 ? (
                  <Avatar src={user.avatar_base64} alt="Profile Avatar" />
            ) : (
              <AvatarPlaceholder />
            )}
            <AvatarUpload htmlFor="avatar-upload">
                  <Camera /> Change
            </AvatarUpload>
            <HiddenInput
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </AvatarContainer>
              
          <Section>
            <SectionTitle>
                  <UserDetail />
              Personal Information
            </SectionTitle>
            {isEditing ? (
              <>
                    <InputGroup>
                <InfoLabel>Username</InfoLabel>
                      <StyledInput
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                      />
                    </InputGroup>
                    <InputGroup>
                <InfoLabel>Email</InfoLabel>
                      <StyledInput
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                      />
                    </InputGroup>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
                    <Button onClick={() => setIsEditing(false)} className="secondary" style={{marginTop: '1rem'}}>Cancel</Button>
              </>
            ) : (
                  <InfoGrid>
                    <InfoItem>
                <InfoLabel>Username</InfoLabel>
                <InfoValue>{user.username}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>{user.email}</InfoValue>
                    </InfoItem>
                    <InfoItem style={{ gridColumn: '1 / -1'}}>
                       <Button onClick={() => setIsEditing(true)} style={{marginTop: '1rem'}}>Edit Profile</Button>
                    </InfoItem>
                  </InfoGrid>
            )}
          </Section>
        </ProfileSidebar>

        <MainContent>
              <Section>
                <SectionTitle>Account Statistics</SectionTitle>
                <InfoGrid>
                    <InfoItem>
                        <InfoLabel>Joined</InfoLabel>
                        <InfoValue>{new Date(Date.now()).toLocaleDateString()}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                        <InfoLabel>Purchases Made</InfoLabel>
                        <InfoValue>{mockPurchases.length}</InfoValue>
                    </InfoItem>
                </InfoGrid>
              </Section>
            </MainContent>
          </ProfileGrid>
        )}

        {activeTab === 'balance' && (
          <>
          <Section>
            <SectionTitle>
              <Wallet />
              Balance
            </SectionTitle>
            <BalanceInfo>
                <InfoLabel style={{textTransform: 'none', fontSize: '1.2rem', color: '#e0e0e0'}}>Current Balance</InfoLabel>
                <BalanceAmount>${mockBalance.toFixed(2)}</BalanceAmount>
            </BalanceInfo>
              <Button style={{maxWidth: '250px', margin: '1rem auto 0'}}>Add Funds</Button>
              <div style={{marginTop: '2.5rem'}}>
                <SectionTitle style={{fontSize: '1.15rem'}}>Top-up History</SectionTitle>
                {mockTopups.length > 0 ? (
                  <PurchaseHistory>
                    {mockTopups.map((topup) => (
                      <PurchaseItem key={topup.id} onClick={() => setSelectedTopup(topup)} style={{cursor: 'pointer'}}>
                        <InfoGrid>
                          <InfoItem>
                            <InfoLabel>Date</InfoLabel>
                            <InfoValue style={{borderBottom: 'none'}}>{topup.date} {topup.time}</InfoValue>
                          </InfoItem>
                          <InfoItem>
                            <InfoLabel>Amount</InfoLabel>
                            <InfoValue style={{borderBottom: 'none', color: '#4caf50'}}>+${topup.amount.toFixed(2)}</InfoValue>
                          </InfoItem>
                          <InfoItem>
                            <InfoLabel>Method</InfoLabel>
                            <InfoValue style={{borderBottom: 'none'}}>{topup.method}</InfoValue>
                          </InfoItem>
                        </InfoGrid>
                      </PurchaseItem>
                    ))}
                  </PurchaseHistory>
                ) : (
                  <InfoValue>No top-ups yet.</InfoValue>
                )}
              </div>
          </Section>
            {selectedTopup && (
              <OrderModalOverlay onClick={() => setSelectedTopup(null)}>
                <TopupModalContent onClick={e => e.stopPropagation()}>
                  <ModalCloseButton onClick={() => setSelectedTopup(null)} title="Close">×</ModalCloseButton>
                  <ModalLeft>
                    <ModalTitle>
                      <Wallet style={{width: 22, height: 22}} />
                      Top-up Details
                    </ModalTitle>
                    <ModalRow>
                      <ModalLabel>Top-up ID</ModalLabel>
                      <ModalValue>{selectedTopup.id}</ModalValue>
                    </ModalRow>
                    <ModalRow>
                      <ModalLabel>Date</ModalLabel>
                      <ModalValue>{selectedTopup.date} {selectedTopup.time}</ModalValue>
                    </ModalRow>
                    <ModalRow>
                      <ModalLabel>Amount</ModalLabel>
                      <ModalValue style={{color: '#4caf50'}}>+${selectedTopup.amount.toFixed(2)}</ModalValue>
                    </ModalRow>
                    <ModalRow>
                      <ModalLabel>Method</ModalLabel>
                      <ModalValue>{selectedTopup.method}</ModalValue>
                    </ModalRow>
                  </ModalLeft>
                </TopupModalContent>
              </OrderModalOverlay>
            )}
          </>
        )}

        {activeTab === 'history' && (
          <>
          <Section>
            <SectionTitle>
                <ShoppingBagIcon />
              Purchase History
            </SectionTitle>
              {mockPurchases.length > 0 ? (
            <PurchaseHistory>
              {mockPurchases.map((purchase) => (
                      <PurchaseItem key={purchase.id} onClick={() => setSelectedOrder(purchase)} style={{cursor: 'pointer'}}>
                      <InfoGrid>
                          <InfoItem style={{flexGrow: 2}}>
                          <InfoLabel>Product</InfoLabel>
                          <InfoValue style={{borderBottom: 'none'}}>{purchase.product}</InfoValue>
                          </InfoItem>
                          <InfoItem>
                          <InfoLabel>Amount</InfoLabel>
                          <InfoValue style={{borderBottom: 'none'}}>${purchase.amount.toFixed(2)}</InfoValue>
                          </InfoItem>
                          <InfoItem>
                          <InfoLabel>Date</InfoLabel>
                          <InfoValue style={{borderBottom: 'none'}}>{purchase.date}</InfoValue>
                          </InfoItem>
                          <InfoItem>
                          <InfoLabel>Status</InfoLabel>
                          <InfoValue style={{borderBottom: 'none', color: purchase.status === 'Completed' ? '#4caf50' : '#f9a825' }}>{purchase.status}</InfoValue>
                          </InfoItem>
                      </InfoGrid>
                </PurchaseItem>
              ))}
            </PurchaseHistory>
              ) : (
                  <InfoValue>No purchase history yet.</InfoValue>
              )}
          </Section>
          </>
        )}

        {activeTab === 'password' && (
          <>
            <Section>
              <SectionTitle>
                <LockAlt />
                Change Password
              </SectionTitle>
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p style={{ color: '#ccc', marginBottom: '2rem', fontSize: '1.1rem' }}>
                  Click the button below to securely change your password
                </p>
                <Button onClick={handlePasswordChange} style={{ maxWidth: '300px', margin: '0 auto' }}>
                  <LockAlt />
                  Change Password
                </Button>
              </div>
            </Section>
          </>
        )}
      </ProfileContentArea>

      {selectedOrder && (
        <OrderModalOverlay onClick={() => setSelectedOrder(null)}>
          <OrderModalContent onClick={e => e.stopPropagation()}>
            <ModalCloseButton onClick={() => setSelectedOrder(null)} title="Close">×</ModalCloseButton>
            <ModalLeft>
              <ModalTitle>
                <ShoppingBagIcon style={{width: 28, height: 28}} />
                Order Details
              </ModalTitle>
              <ModalRow>
                <ModalLabel>Product</ModalLabel>
                <ModalValue>{selectedOrder.product}</ModalValue>
              </ModalRow>
              <ModalRow>
                <ModalLabel>Amount</ModalLabel>
                <ModalValue>${selectedOrder.amount.toFixed(2)}</ModalValue>
              </ModalRow>
              <ModalRow>
                <ModalLabel>Date</ModalLabel>
                <ModalValue>{selectedOrder.date}</ModalValue>
              </ModalRow>
              <ModalRow>
                <ModalLabel>Status</ModalLabel>
                <ModalValue style={{color: selectedOrder.status === 'Completed' ? '#4caf50' : '#f9a825'}}>{selectedOrder.status}</ModalValue>
              </ModalRow>
              <ModalRow>
                <ModalLabel>Order ID</ModalLabel>
                <ModalValue>{selectedOrder.id || 'Generating...'}</ModalValue>
              </ModalRow>
              <ModalRow>
                <ModalLabel>Payment Method</ModalLabel>
                <ModalValue>{selectedOrder.paymentMethod || 'Not specified'}</ModalValue>
              </ModalRow>
            </ModalLeft>
            <ModalRight>
              <ModalRow style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <ModalLabel>Delivery Proofs</ModalLabel>
                <div style={{display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginTop: '0.5rem', width: '100%'}}>
                  {selectedOrder.proofs && selectedOrder.proofs.length > 0 ? (
                    selectedOrder.proofs.map((url: string, idx: number) =>
                      url.endsWith('.mp4') ? (
                        <video key={idx} src={url} controls style={{width: window.innerWidth < 600 ? 120 : 180, borderRadius: 8, background: '#222', maxWidth: '100%'}} />
                      ) : (
                        <img key={idx} src={url} alt={`proof-${idx}`} style={{width: window.innerWidth < 600 ? 120 : 180, borderRadius: 8, background: '#222', maxWidth: '100%'}} />
                      )
                    )
                  ) : (
                    <div style={{color: '#bda0e0'}}>No delivery proofs yet</div>
                  )}
                </div>
              </ModalRow>
              <ModalRow style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <ModalLabel>Chat with Manager</ModalLabel>
                <div style={{width: '100%', maxWidth: 400, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 12, marginTop: 8, minHeight: 120, maxHeight: 220, overflowY: 'auto'}}>
                  {(orderChats[selectedOrder.id] || selectedOrder.chat || []).map((msg, idx) => (
                    <div key={idx} style={{marginBottom: 8, textAlign: msg.author === 'user' ? 'right' : 'left'}}>
                      <span style={{color: msg.author === 'user' ? '#9d4edd' : '#ffd700', fontWeight: 600}}>{msg.author === 'user' ? 'You' : 'Manager'}: </span>
                      <span style={{color: '#fff'}}>{msg.text}</span>
                      <span style={{color: '#bda0e0', fontSize: 12, marginLeft: 6}}>{msg.time}</span>
                    </div>
                  ))}
                </div>
                <form style={{display: 'flex', gap: 8, marginTop: 8, width: '100%'}} onSubmit={e => {
                  e.preventDefault();
                  if (!chatInput.trim()) return;
                  setOrderChats(prev => ({
                    ...prev,
                    [selectedOrder.id]: [...(prev[selectedOrder.id] || selectedOrder.chat || []), {author: 'user', text: chatInput, time: new Date().toLocaleTimeString().slice(0,5)}]
                  }));
                  setChatInput('');
                }}>
                  <StyledInput
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Message..."
                    style={{flex: 1, minWidth: 0}}
                  />
                  <Button type="submit" style={{width: 'auto', minWidth: 80}}>Send</Button>
                </form>
              </ModalRow>
            </ModalRight>
          </OrderModalContent>
        </OrderModalOverlay>
      )}

      {/* Модальное окно изменения пароля */}
      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </ProfileContainer>
  );
};

export default Profile; 