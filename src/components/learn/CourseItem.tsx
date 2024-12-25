import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CourseItemI {
  id: string;
  course_no: number;
  course_img: string;
  course_title: string;
}

export default function CourseItem({ id, course_no, course_title, course_img }: CourseItemI) {
  return (
    <Card className="w-full flex gap-6 p-6  border-background-800">
      <div className="space-y-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="text-sky-400 text-sm font-medium flex items-center gap-2">SEE DETAILS</div>
          <h2 className="text-2xl font-bold">Course {course_no}</h2>
        </div>

        <div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-slate-800 rounded-full">
              <div className="w-0 h-full bg-[#58CC02] rounded-full" />
            </div>
            <div className="text-slate-400 text-sm">0 / 10</div>
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>

          <div className="relative bg-slate-800 rounded-lg mt-4 p-4 w-fit text-white">
            <div className="text-lg">{course_title}</div>
          </div>
        </div>

        <Link to={`course/${id}`}>
          <Button className="w-full text-white font-bold rounded-xl">CONTINUE</Button>
        </Link>
      </div>

      <img src={course_img} alt="Mascot" className="w-[200px] object-cover rounded-xl" />
    </Card>
  );
}
