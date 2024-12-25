import { Frown } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';
import { useToast } from '@/hooks/use-toast';
import CourseItem from '@/components/learn/CourseItem';
import { useGetCoursesQuery } from '@/state/services/course';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

export default function Learn() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isSuccess, isError } = useGetCoursesQuery({ page: currentPage });

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
          <>
            {data.courses.map(({ id, course_title, course_img, course_no }) => (
              <CourseItem key={id} id={id} course_title={course_title} course_img={course_img} course_no={course_no} />
            ))}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={cn(currentPage === 1 && 'opacity-50')}
                    onClick={() => {
                      if (currentPage > 1) setCurrentPage((prev) => prev - 1);
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className={cn(currentPage === data.totalPages && 'opacity-50')}
                    onClick={() => {
                      if (currentPage < data.totalPages) setCurrentPage((prev) => prev + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
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
}
