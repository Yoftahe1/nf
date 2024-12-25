import Cookies from 'js-cookie';
import { UserState } from '@/state/slice/user';

function saveAuthData(accessToken: string, user: UserState) {
  Cookies.set('access_token', accessToken, {
    secure: true,
    sameSite: 'Strict',
    expires: 1 / 24,
  });

  Cookies.set('user', JSON.stringify(user), {
    secure: true,
    sameSite: 'Strict',
    expires: 7,
  });
}

export default saveAuthData;
