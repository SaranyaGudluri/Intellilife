// import { SignIn } from '@clerk/nextjs';
// export default function Page() {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <SignIn />
//     </div>
//   );
// }

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn 
        forceRedirectUrl="/dashboard" 
        fallbackRedirectUrl="/dashboard" 
      />
    </div>
  );
}
