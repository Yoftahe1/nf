import logo from '../assets/logo.png';

export default function Logo() {
  return (
    <div className="flex items-center gap-2 font-semibold">
      <img src={logo} width={30} height={30} />

      <span className="text-primary">ኒቆዲሞስ</span>
    </div>
  );
}
