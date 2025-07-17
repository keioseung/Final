import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';

const Wrapper = styled.div`
  max-width: 380px;
  margin: 4rem auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(20,40,160,0.07);
  padding: 2.5rem 2rem 2rem 2rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const Switch = styled.p`
  text-align: center;
  margin-top: 1.2rem;
  color: #888;
  font-size: 0.98rem;
  a {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    text-decoration: underline;
    margin-left: 0.3rem;
  }
`;

type Props = {
  mode: 'login' | 'register';
};

const AuthForm: React.FC<Props> = ({ mode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const isLogin = mode === 'login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 연동
    if (isLogin) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <Wrapper>
      <Title>{isLogin ? '로그인' : '회원가입'}</Title>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        )}
        <Input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit">{isLogin ? '로그인' : '회원가입'}</Button>
      </form>
      <Switch>
        {isLogin ? (
          <>
            계정이 없으신가요?
            <a onClick={() => navigate('/register')}>회원가입</a>
          </>
        ) : (
          <>
            이미 계정이 있으신가요?
            <a onClick={() => navigate('/login')}>로그인</a>
          </>
        )}
      </Switch>
    </Wrapper>
  );
};

export default AuthForm; 