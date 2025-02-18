import { SignUp } from '@clerk/nextjs'
export default function Home() {
  return(
  <div className="flex items-center justify-center h-screen">
      <SignUp />
    </div>
  );
}