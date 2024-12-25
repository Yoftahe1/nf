import { StateObject } from '@/types';
import { symbolLabels } from '@/constants';

export function MatcherItem({ idx: cIdx, char, state, hideSymbol }: { idx: string; char: string; state: StateObject; hideSymbol?: boolean }) {
  const matchedState = state[cIdx] || { symbols: [], color: null };
  
  if (hideSymbol)
    return (
      <p className="font-semibold" style={{ color: matchedState.color || '' }}>
        {char}
      </p>
    );

  return (
    <div className="relative">
      <div className="flex gap-[1px] items-end">
        {matchedState.symbols.map((s: number, i: number) => {
          if (s === 3) return null;
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
