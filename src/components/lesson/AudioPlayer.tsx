import { useState, useEffect, useRef } from 'react';

import ReactHowler from 'react-howler';
import { Pause, Play } from 'lucide-react';

import { Button } from '../ui/button';

interface AudioPlayerProps {
  audio: string;
  currentTime: number;
  executeOnEnd?: () => void;
  setCurrentTime: (currentTime: number) => void;
}

function AudioPlayer({audio, currentTime, setCurrentTime, executeOnEnd }: AudioPlayerProps) {
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);

  const howlerRef = useRef<ReactHowler>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (howlerRef.current && howlerRef.current.seek()) {
        setCurrentTime(howlerRef.current.seek());
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => setPlaying(!playing);

  // Get the duration when the audio is loaded
  const handleOnLoad = () => {
    if (howlerRef.current) {
      setDuration(howlerRef.current.duration());
    }
  };

  // Stop playing when the audio ends
  const handleOnEnd = () => {
    setPlaying(false);

    if (executeOnEnd) {
      executeOnEnd();
    }
  };

  // Handle seeking
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!howlerRef.current || duration === 0) return;

    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - left;
    const clickPosition = (clickX / width) * duration;
    howlerRef.current.seek(clickPosition);
    setCurrentTime(clickPosition); // Update state to reflect the new position
  };

  // Calculate the progress percentage
  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="flex items-center gap-4 bg-gray-600 p-2 rounded-lg">
      <Button onClick={togglePlay} size="icon" className="w-16 h-12">
        {playing ? <Pause /> : <Play />}
      </Button>

      <div className="h-4 w-full bg-gray-700 rounded-full relative cursor-pointer" onClick={handleSeek}>
        <div className="h-full bg-primary rounded-full" style={{ width: `${progressPercentage}%` }} />

        {/* Circle indicator at the end of progress bar */}
        {progressPercentage > 0 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-white rounded-full shadow-md"
            style={{ left: `calc(${progressPercentage}% - 12px)` }} // Offset circle to align it
          />
        )}
      </div>

      <ReactHowler src={audio} playing={playing} ref={howlerRef} volume={1.0} mute={false} onLoad={handleOnLoad} onEnd={handleOnEnd} />

      <p className="text-white w-32">
        {currentTime.toFixed(2)}/{duration.toFixed(2)}
      </p>
    </div>
  );
}

export default AudioPlayer;
