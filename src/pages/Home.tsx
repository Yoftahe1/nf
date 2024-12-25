import { ChevronRightCircle, Facebook, Instagram, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import icon from '@/assets/icon.svg';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'Comprehensive Learning Tools',
    description: 'Access a wide range of resources to support your educational journey.',
  },
  {
    title: 'Personalized Learning Paths',
    description: 'Tailored courses to help you achieve your specific goals effectively.',
  },
  {
    title: 'Engaging Content',
    description: 'Learn through interactive lessons designed to keep you motivated.',
  },
];
const pricingFeatures = [
  'Complete Course Library',
  '120+ Interactive Lessons',
  'Dedicated Learning Support',
  'Personalized Progress Tracking',
  'Access to Expert Mentors',
];
export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-2">
              <img className="w-14 h-14" src={icon} alt="" />
              <div className="flex flex-col leading-tight">
                <span className="truncate font-semibold text-lg">ኒቆዲሞስ</span>
                <span className="truncate text-xs">የማታ ተማሪ</span>
              </div>
            </div>

            <button type="button" className="inline-flex p-2 transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
              <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"></path>
              </svg>

              <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
              <a href="#" title="" className="text-base transition-all duration-200 hover:text-opacity-80">
                Features
              </a>
              <a href="#" title="" className="text-base transition-all duration-200 hover:text-opacity-80">
                Pricing
              </a>
            </div>

            <Button onClick={() => navigate('/app/learn')} className="px-5 py-4 rounded-full">
              <p>Join Now</p>
            </Button>
          </div>
        </div>
      </header>
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">A Home for learners</p>
              <h1 className="mt-4 text-4xl font-bold lg:mt-8 sm:text-6xl xl:text-8xl">Connect & learn from the experts</h1>
              <p className="mt-4 text-base lg:mt-8 sm:text-xl">Grow your knowledge fast with right mentor.</p>
              <Button onClick={() => navigate('/app/learn')} className="flex gap-8  mt-8  px-6 py-7 rounded-full">
                <p>Join for free</p>
                <ChevronRightCircle size={18} />
              </Button>

              <div className="mt-5 flex gap-2">
                <p className="text-gray-500">Already joined us?</p>
                <Link to={'/auth/login'} className=" transition-all duration-200 hover:underline">
                  Log in
                </Link>
              </div>
            </div>

            <div>
              <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex px-4 py-1.5 mx-auto rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-600">
              <p className="text-xs font-semibold tracking-widest text-white uppercase">130+ Courses</p>
            </div>
            <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Learn and Grow with Our Platform</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              Discover a platform to grow your skills with expert lessons, interactive tools, and resources for your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 mt-12 sm:grid-cols-3 lg:mt-20 lg:gap-x-12">
            {features.map((feature, index) => (
              <div key={index}>
                <div className="py-10 px-9 flex flex-col items-center">
                  <svg className="w-16 h-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <h3 className="mt-8 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-4 text-base text-gray-500 text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-4xl font-bold lg:text-5xl sm:text-5xl">Pricing</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-500">
              Access All Features with a Single Price – No Hidden Costs, No Surprises. Enjoy Unlimited Access to Everything You Need for One Simple
              Price.
            </p>
          </div>
          <div className="flex justify-center mt-12 lg:mt-20">
            <div className="overflow-hidden w-[400px] border border-input rounded-md">
              <div className="p-6 md:py-8 md:px-9">
                <h3 className="text-xl font-semibold">Learning Pro</h3>
                <p className="mt-2.5 text-sm text-gray-500">Unlock advanced tools and resources to elevate your learning experience</p>

                <div className="flex items-end mt-5">
                  <div className="flex items-start">
                    <span className="text-xl font-medium"> $ </span>
                    <p className="text-6xl font-medium tracking-tight">9.99</p>
                  </div>
                  <span className="ml-0.5 text-lg text-gray-500"> / month </span>
                </div>

                <Button className="rounded-full w-full  mt-6" size={'lg'}>
                  Get access now
                </Button>
                <div className="flex flex-col mt-8 space-y-4">
                  {pricingFeatures.map((feature, index) => (
                    <div key={index} className="inline-flex items-center space-x-2">
                      <Check size={18} />
                      <span className="text-base font-medium "> {feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 ">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <hr className="mt-16 mb-10 border-gray-200" />

          <div className="sm:flex sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">© Copyright 2021, All Rights Reserved</p>

            <div className="flex items-center mt-5 space-x-3 md:order-3 sm:mt-0">
              <Button variant={'outline'} size={'icon'} className="hover:bg-primary hover:text-white">
                <Facebook />
              </Button>

              <Button variant={'outline'} size={'icon'} className="hover:bg-primary hover:text-white">
                <Instagram />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
