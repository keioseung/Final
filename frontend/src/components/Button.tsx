import styled from 'styled-components';

const Button = styled.button.attrs({
  'aria-label': '버튼',
  tabIndex: 0
})`
  padding: 0.95rem 2.2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow.card};
  transition: ${({ theme }) => theme.transition};
  &:hover, &:focus {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 6px 24px ${({ theme }) => theme.colors.shadow};
    outline: none;
  }
  &:active {
    transform: scale(0.98);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
    padding: 0.8rem 1.2rem;
  }
`;

export default Button; 