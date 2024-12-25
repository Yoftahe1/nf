import logo from '../../assets/logo.png';

export default function TestLessonContent({ question, hiddenWord }: { question: string;  hiddenWord?: string }) {
  const lines: string[] = question.split('\\n');

  return (
    <div>
      <div className="rounded-md">
        <div className="abyssinica-sil-regular relative w-full rounded-sm border border-primary">
          <div className={`absolute z-0 top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-20`}>
            <img src={logo} className="h-40" alt="" />
          </div>

          <div className={`z-10 p-5 rounded-sm`}>
            {lines.map((line, lIdx) => {
              const words = line.split(' ');

              return (
                <div key={lIdx} className="flex items-end mb-0 gap-2 overflow-hidden">
                  {words.map((word, wIdx) => {
                    const chars = word.split('');

                    if (hiddenWord === word) {
                      return <div key={wIdx} className="w-32 h-6 border-b-2 border-primary"></div>;
                    }

                    return (
                      <div key={wIdx} className={`font-semibold`}>
                        {chars}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
