import styled from 'styled-components';

const Input = styled.input.attrs({
  'aria-label': '입력창',
  tabIndex: 0
})`
  width: 100%;
  padding: 0.9rem 1rem;
  margin-bottom: 1.1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 1.08rem;
  background: #f8fafc;
  transition: ${({ theme }) => theme.transition};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: #fff;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}33;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
    padding: 0.7rem 0.8rem;
  }
`;

export default Input; 