import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import Quiz from '@/components/quiz';
import Layout from '@/components/Layout';
import { RootState } from '@/state/store';
import { useGetQuizQuery } from '@/state/services/course';

const RequireAuth = () => {
  const { data, isSuccess } = useGetQuizQuery(null);
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation();

  return token ? (
    <>
      {isSuccess && data.length > 0 && <Quiz data={data[0]} />}
      <Layout>
        <Outlet />
      </Layout>
    </>
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
