import React, { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Loading from '../components/Loading';

const Quiz: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [answer, setAnswer] = useState('');

  return (
    <Layout>
      <Card>
        <h2>퀴즈 풀이</h2>
        <div style={{ margin: '1.5rem 0' }}>
          <b>Q. AI란 무엇인가요?</b>
        </div>
        <input
          style={{ width: '100%', padding: '0.8rem', borderRadius: 8, border: '1px solid #e5e8ef', marginBottom: 16 }}
          placeholder="정답을 입력하세요"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
        <Button onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setAlert('정답입니다!'); }, 1200); }}>
          제출
        </Button>
        {loading && <Loading />}
        {alert && <Alert severity="success">{alert}</Alert>}
      </Card>
    </Layout>
  );
};

export default Quiz; 