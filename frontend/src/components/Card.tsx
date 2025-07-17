import styled from 'styled-components';

const Card = styled.div.attrs({
  role: 'region',
  'aria-label': '카드'
})`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 18px;
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 2rem 1.5rem;
  margin-bottom: 2rem;
  transition: ${({ theme }) => theme.transition};
  &:hover {
    box-shadow: 0 8px 32px ${({ theme }) => theme.colors.shadow};
    transform: translateY(-2px) scale(1.01);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.1rem 0.5rem;
    margin-bottom: 1.2rem;
  }
`;

export default Card; 