import React from 'react';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';

const Register: React.FC = () => (
  <Layout>
    <AuthForm mode="register" />
  </Layout>
);

export default Register; 