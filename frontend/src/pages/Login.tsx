import React from 'react';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';

const Login: React.FC = () => (
  <Layout>
    <AuthForm mode="login" />
  </Layout>
);

export default Login; 