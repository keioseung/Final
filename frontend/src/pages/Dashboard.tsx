import React, { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Loading from '../components/Loading';
import Alert from '../components/Alert';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');

  return (
    <Layout>
      <Card>
        <h2>대시보드</h2>
        <p>여기에 학습 진척도, 통계, 최근 퀴즈 등이 표시됩니다.</p>
        <button onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setAlert('업데이트 완료!'); }, 1200); }}>
          통계 업데이트
        </button>
        {loading && <Loading />}
        {alert && <Alert severity="success">{alert}</Alert>}
      </Card>
    </Layout>
  );
};

export default Dashboard; 