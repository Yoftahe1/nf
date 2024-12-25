import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function Section() {
  const { id: sectionId } = useParams();

  return (
    <div>
      <UnitHeader sectionId={sectionId!} unitNumber={'1'} />

      <div className="my-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <UnitItem />
        <UnitItem />
        <UnitItem />
        <UnitItem />
        <UnitItem />
      </div>

      <UnitHeader sectionId={sectionId!} unitNumber={'2'} />

      <div className="my-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <UnitItem />
        <UnitItem />
        <UnitItem />
        <UnitItem />
        <UnitItem />
      </div>
    </div>
  );
}

function UnitHeader({ sectionId, unitNumber }: { sectionId: string; unitNumber: string }) {
  return (
    <div className="bg-primary p-4 rounded-lg">
      <div className="flex gap-4 items-center">
        <ArrowLeft className="h-5 w-5" />
        <p>
          Section {sectionId}, Unit {unitNumber}
        </p>
      </div>

      <h1 className="font-bold text-xl">ጸሎት ዘዘወትር</h1>
    </div>
  );
}

function UnitItem() {
  return (
    <Link to="/app/lesson/1">
      <div className="flex items-center justify-center border border-primary/40 rounded-sm h-24 hover:bg-background/50 hover:cursor-pointer hover:border-primary transition-all">
        አአትብ
      </div>
    </Link>
  );
}
