import { useEffect } from 'react';
import { Frown } from 'lucide-react';
import { useSelector } from 'react-redux';

import logo from '@/assets/logo.png';
import { RootState } from '@/state/store';
import { useToast } from '@/hooks/use-toast';
import User from '@/components/leaderboard/user';
import { useGetLeaderboardQuery } from '@/state/services/user';

const Leaderboard = () => {
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.auth.user);
  const { data, isLoading, isSuccess, isError } = useGetLeaderboardQuery(null);

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Fetch courses failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  }, [isError, toast]);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="h-full flex flex-col gap-4 w-full">
        {isSuccess && (
          <div className="h-full flex flex-col gap-14 relative">
            <div className="flex justify-evenly">
              {data.leaderboard[1] ? (
                <User
                  isVertical={true}
                  rank={2}
                  username={`${data.leaderboard[1].first_name} ${data.leaderboard[1].last_name}`}
                  xp={data.leaderboard[1].xp}
                  profilePic={data.leaderboard[1].profile_pic}
                  createdAt={data.leaderboard[1].created_at}
                />
              ) : (
                <div className="w-[112px]" />
              )}
              <User
                isVertical={true}
                rank={1}
                username={`${data.leaderboard[0].first_name} ${data.leaderboard[0].last_name}`}
                xp={data.leaderboard[0].xp}
                profilePic={data.leaderboard[0].profile_pic}
                createdAt={data.leaderboard[0].created_at}
              />
              {data.leaderboard[2] ? (
                <User
                  isVertical={true}
                  rank={3}
                  username={`${data.leaderboard[2].first_name} ${data.leaderboard[2].last_name}`}
                  xp={data.leaderboard[2].xp}
                  profilePic={data.leaderboard[2].profile_pic}
                  createdAt={data.leaderboard[2].created_at}
                />
              ) : (
                <div className="w-[112px]" />
              )}
            </div>
            <div className="flex flex-col gap-4 flex-grow">
              {data.leaderboard.slice(3).map((value, index) => (
                <User
                  key={index}
                  isVertical={false}
                  rank={index + 4}
                  username={`${value.first_name} ${value.last_name}`}
                  xp={value.xp}
                  profilePic={value.profile_pic}
                  createdAt={value.created_at}
                />
              ))}
            </div>
            <div className="p-4 bg-background sticky bottom-10 border border-input rounded-md">
              <User
                isVertical={false}
                rank={data.position}
                username={`${user!.first_name} ${user!.last_name}`}
                xp={user!.xp}
                profilePic={user!.profile_pic || ''}
                createdAt={user!.created_at}
              />
            </div>
          </div>
        )}
        {isError && (
          <div className="h-full flex flex-col justify-center items-center gap-6 ">
            <Frown size={150} color="#fbbf24" />
            <h4 className="text-2xl">The resource requested could not be found.</h4>
            <p className="text-md text-muted-foreground">Try another resource.</p>
          </div>
        )}
        {isLoading && (
          <div className="h-full flex justify-center items-center">
            <img src={logo} className="w-[300px] animate-pulse-custom" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
