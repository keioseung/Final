import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import MobileDrawer from './MobileDrawer';
import { useAuth } from '../hooks/useAuth';

const Bar = styled.header`
  width: 100vw;
  height: 64px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 8px rgba(20,40,160,0.06);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  font-size: 1.7rem;
  font-weight: 700;
  color: #fff;
  margin-right: 2rem;
  letter-spacing: -0.04em;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
    margin-left: auto;
  }
`;

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Bar>
      <Logo to="/">AI 학습</Logo>
      <NavLinks>
        {isLoggedIn && <Link to="/dashboard">대시보드</Link>}
        {isLoggedIn && <Link to="/quiz">퀴즈풀이</Link>}
        {isLoggedIn && isAdmin && <Link to="/admin/data">데이터 관리</Link>}
        {isLoggedIn && isAdmin && <Link to="/admin/quiz">퀴즈 관리</Link>}
        {isLoggedIn && isAdmin && <Link to="/admin/prompt">프롬프트 관리</Link>}
        {isLoggedIn && <Link to="/profile">마이페이지</Link>}
        {!isLoggedIn && <Link to="/login">로그인</Link>}
        {!isLoggedIn && <Link to="/register">회원가입</Link>}
        {isLoggedIn && <span style={{ marginLeft: 12, fontWeight: 500 }}>{user?.username}</span>}
        {isLoggedIn && <button style={{ marginLeft: 8 }} onClick={() => { logout(); navigate('/login'); }}>로그아웃</button>}
      </NavLinks>
      <MenuButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon fontSize="large" />
      </MenuButton>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </Bar>
  );
};

export default Navbar; 