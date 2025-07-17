import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.03em;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.3rem;
  margin-bottom: 2rem;
`;

const Home: React.FC = () => (
  <Wrapper>
    <Title>AI 학습 플랫폼</Title>
    <Subtitle>삼성 스타일의 세련된 UI/UX로 만나는 AI 퀴즈 & 데이터 관리</Subtitle>
    {/* TODO: 로그인/회원가입, 대시보드 등 이동 버튼 추가 */}
  </Wrapper>
);

export default Home; 