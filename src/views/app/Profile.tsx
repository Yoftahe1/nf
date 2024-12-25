import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Zap, Flame, Mail, Key, Trash, User, Eye, LucideIcon } from 'lucide-react';

import logo from '@/assets/logo.png';
import { RootState } from '@/state/store';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/mode-toggle';
import EditProfile from '@/components/profile/edit-profile';
import DeleteAccount from '@/components/profile/delete-account';
import ChangePassword from '@/components/profile/change-password';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Activity from '@/components/profile/activity';

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="flex flex-col gap-8">
      <div className="">
        <div className="h-52 flex items-end rounded-xl relative">
          <div className="w-full h-full border-2 border-primary flex justify-center absolute rounded-xl">
            <img src={logo} className="h-full" />
          </div>
          <div className="border-2 border-primary ml-5 bg-background translate-y-20 rounded-full">
            <Avatar className="h-40 w-40">
              <AvatarImage src={user?.profile_pic ? user?.profile_pic : undefined} alt={'profile pic'} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex justify-between items-center p-5 pl-52 ">
          <div>
            <h3 className="text-2xl font-medium">{user?.first_name}</h3>
            <p className="text-sm text-muted-foreground">
              joined{' '}
              {user?.created_at
                ? `${new Date(user?.created_at).toLocaleString('en-US', { month: 'long' })} ${new Date(user?.created_at).getFullYear()}`
                : ''}
            </p>
          </div>
          <EditProfile />
        </div>
      </div>

      <Separator />
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-medium">Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <Statistic title="Day streak" score={user ? user.current_streak : 0} Icon={Flame} />
          <Statistic title="Total XP" score={user ? user.xp : 0} Icon={Zap} />
        </div>
      </div>
      <Activity />
      <div className="flex flex-col gap-2">
        <SettingOption Icon={Mail} title="Email Address" description={`${user?.email}`} />

        <SettingOption Icon={Eye} title="Theme" description="Customize appearance of website.">
          <ModeToggle />
        </SettingOption>
        <SettingOption Icon={Key} title="Password" description="Ensure your password is strong for your account's safety.">
          <ChangePassword />
        </SettingOption>
        <SettingOption Icon={Trash} title="Delete Account" description="Permanently remove your account and data.">
          <DeleteAccount />
        </SettingOption>
      </div>
    </div>
  );
};

export default Profile;

interface StatisticI {
  title: string;
  score: number;
  Icon: LucideIcon;
}

const Statistic = ({ title, score, Icon }: StatisticI) => {
  return (
    <div className="border-[1px] border-input p-4 rounded-lg flex flex-col gap-2">
      <div className="flex items-center">
        <Icon />
        {score}
      </div>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
};

interface SettingOptionI {
  title: string;
  description: string;
  Icon: LucideIcon;
  children?: ReactNode;
}

const SettingOption = ({ children, title, description, Icon }: SettingOptionI) => {
  return (
    <div className="flex items-center justify-between border-[1px] border-input p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">{<Icon />}</div>
        <div>
          <p>{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
};
