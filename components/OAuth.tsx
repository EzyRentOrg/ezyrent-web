import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';

// type OAuthProps = {
//   onGoogleSignIn?: () => Promise<void>;
//   onAppleSignIn?: () => Promise<void>;
// };
export default function OAuth() {
  const handleGoogleSignIn = async () => {
    // if (onGoogleSignIn) {
    //   await onGoogleSignIn();
    // }
    console.log("google")
  };

  const handleAppleSignIn = async () => {
    // if (onAppleSignIn) {
    //   await onAppleSignIn();
    // }
    console.log("apple");
    
  };

  return (
    <div className="w-full">
      <div className="my-10  relative flex items-center justify-center text-[#98A2B3] font-bold text-sm before:content-[''] after:content-[''] before:flex-grow after:flex-grow before:h-px after:h-px before:bg-[#98A2B3] after:bg-[#98A2B3] before:mx-2 after:mx-2">
        or
      </div>

      <div className="flex items-center space-x-4">
        <Button
          className="w-full h-[72px] bg-transparent shadow-none text-[1.1rem] text-[#1D2939] rounded-[80px] border-[1px] border-[#667085]"
          type="button"
        >
          <Image
            src="/icons/google.png"
            alt="Google logo"
            width={20}
            height={20}
            className="mr-[5px]"
          />
          Sign up with Google
        </Button>
        <Button
          className="w-full h-[72px] bg-transparent shadow-none text-[1.1rem] text-[#1D2939] rounded-[80px] border-[1px] border-[#667085]"
          type="button"
        >
          <Image
            src="/icons/apple.png"
            alt="Apple Logo"
            width={20}
            height={20}
            className="mr-[5px]"
          />
          Sign up with Google
        </Button>
      </div>
    </div>
  );
}
