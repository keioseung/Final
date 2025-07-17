import React from 'react';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import styled from 'styled-components';

const StyledAlert = styled(MuiAlert)`
  font-size: 1.08rem;
  border-radius: 10px;
  margin: 1rem 0;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  opacity: 1;
  animation: fadeIn 0.4s;
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

type Props = {
  severity: AlertColor;
  children: React.ReactNode;
};

const Alert: React.FC<Props> = ({ severity, children }) => (
  <StyledAlert severity={severity} variant="filled" aria-live="polite">
    {children}
  </StyledAlert>
);

export default Alert; 