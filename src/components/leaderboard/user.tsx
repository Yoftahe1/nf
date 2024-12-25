import { User as UserIcon, Flame, Crown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

interface UserI {
  isVertical: boolean;
  rank: number;
  xp: number;
  username: string;
  profilePic: string;
  createdAt: string;
}

const User = ({ isVertical, rank, username, xp, profilePic, createdAt }: UserI) => {
  return (
    <div
      className={cn('flex justify-between items-center', isVertical && 'flex-col justify-start', isVertical && (rank === 2 || rank === 3) && 'mt-16')}
    >
      <div className={cn('flex gap-4 items-center', isVertical && 'flex-col ')}>
        <p className="text-lg">{rank === 1 && isVertical ? <Crown size={26} className="text-primary" /> : rank}</p>
        <Avatar className={cn('w-14 h-14', isVertical && 'w-28 h-28', rank === 1 && isVertical && 'w-36 h-36')}>
          <AvatarImage src={profilePic} alt={'profile pic'} />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className={cn('font-bold text-lg', isVertical && 'text-center ')}>{username}</p>
          <p className={cn('text-sm', isVertical && 'text-center ')}>
            {new Date(createdAt).toLocaleString('en-US', { month: 'short' })} {new Date(createdAt).getDate()}, {new Date(createdAt).getFullYear()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Flame size={18} />
        <p>{xp}XP</p>
      </div>
    </div>
  );
};

export default User;
