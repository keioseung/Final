import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Side = styled.aside`
  width: 220px;
  background: #fff;
  border-right: 1px solid #e5e8ef;
  min-height: 100vh;
  padding-top: 80px;
  position: sticky;
  top: 64px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const MenuLink = styled(Link)<{ $active?: boolean }>`
  padding: 0.9rem 1.5rem;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : '#222')};
  background: ${({ $active, theme }) => ($active ? '#eaf1ff' : 'transparent')};
  border-radius: 8px;
  font-weight: 500;
  font-size: 1.08rem;
  transition: background 0.15s;
  &:hover {
    background: #f0f4fa;
  }
`;

const menus = [
  { to: '/dashboard', label: '대시보드' },
  { to: '/quiz', label: '퀴즈풀이' },
  { to: '/admin/data', label: '데이터 관리' },
  { to: '/admin/quiz', label: '퀴즈 관리' },
  { to: '/admin/prompt', label: '프롬프트 관리' },
  { to: '/profile', label: '마이페이지' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <Side>
      {menus.map((m) => (
        <MenuLink key={m.to} to={m.to} $active={location.pathname === m.to}>
          {m.label}
        </MenuLink>
      ))}
    </Side>
  );
};

export default Sidebar; 