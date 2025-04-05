import { cn } from '@/lib/utils';
import { StateObject } from '@/types';

const symbolLabels: { [key: number]: string | null | JSX.Element } = {
  0: null,
  1: 'ጠ',
  2: '_',
  3: '-',
  4: ',',
  5: '.',
};

const Matcher = ({
  content,
  state,
  timestamp,
  position,
  type,
  currentSecond,
}: {
  content: string;
  state: StateObject;
  timestamp?: any;
  position?: string;
  type?: string;
  currentSecond?: number;
}) => {
  let lines= content.split('\n');
  if (type === 'spelling'||type === 'lesson') {
    const parsedContent = JSON.parse(content);
    lines = parsedContent.split('\n');
  } 

  return (
    <div className="abyssinica-sil-regular relative w-full rounded-sm h-full">
      <div className={`z-10 h-full p-2 rounded-sm`} >
        {lines.map((line: string, lIdx: number) => {
          const words = line.split(' ');

          return (
            <div key={lIdx} className="flex items-end mb-0 gap-2 overflow-hidden">
              {words.map((word, wIdx) => {
                const chars = word.split('');
                if (word === '___') return <div key={wIdx} className="w-32 h-6 border-b-2 border-primary" />;
                return (
                  <div
                    key={wIdx}
                    className={cn(
                      'flex gap-0.5 items-end rounded-sm',
                      position === `${lIdx}:${wIdx}` && 'bg-primary',
                      timestamp && currentSecond && timestamp[`${lIdx}:${wIdx}`] < currentSecond && 'text-primary animate-pulseYellow',
                    )}
                  >
                    {chars.map((char, cIdx) => {
                      return <MatcherItem key={cIdx} char={char} state={state!} idx={`${lIdx}:${wIdx}:${cIdx}:${char}`} />;
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Matcher;

function MatcherItem({ idx: cIdx, char, state }: { idx: string; char: string; state: StateObject }) {
  const matchedState = state[cIdx] || { symbols: [], color: null };

  return (
    <div className="relative">
      <div className="flex gap-[1px] items-end">
        {matchedState.symbols.map((s: number, i: number) => {
          if (s === 3) return null;
          // if (s === 2) return <div key={i} className="h-[1px] w-1/2 mx-auto bg-primary mb-[0px]" />;
          return (
            <p key={i} className={`text-primary  ${s === 1 ? 'mb-[-6px]' : 'mb-[-4px]'} w-full text-center`} style={{ fontSize: s === 4 ? 12 : 6 }}>
              {symbolLabels[s]}
            </p>
          );
        })}
      </div>

      <p className="font-semibold" style={{ color: matchedState.color || '' }}>
        {char}
      </p>

      <>
        {matchedState.symbols.map((s: number, i: number) => {
          if (s === 3)
            return (
              <p key={i} className="px-1 h-[10px] text-primary absolute right-[-11px] bottom-3.5">
                {symbolLabels[s]}
              </p>
            );
          return null;
        })}
      </>
    </div>
  );
}
