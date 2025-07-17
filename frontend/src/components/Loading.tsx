import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
`;

const Loading: React.FC = () => (
  <Center role="status" aria-live="polite">
    <CircularProgress style={{ color: '#1428A0' }} thickness={5} size={56} />
    <span style={{ position: 'absolute', left: -9999 }}>로딩 중...</span>
  </Center>
);

export default Loading; 