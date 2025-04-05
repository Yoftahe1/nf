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
      {isSuccess && data.length > 0 && <Quiz id={data[0].id} difficulty={data[0].difficulty} content={data[0].content} state={data[0].state} position={data[0].position} type={data[0].type} options={data[0].options} lessonId={data[0].file_id}/>}
      <Layout>
        <Outlet />
      </Layout>
    </>
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
