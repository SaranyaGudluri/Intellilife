// "use client";
// import React, { useEffect } from 'react';
// import Image from 'next/image';
// import { Book, FileClock, Home, Paperclip, Pen, Settings, WalletCards } from 'lucide-react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link'; 

// function SideNav() {
//     const MenuList = [
//         {
//             name: 'Home',
//             icon: Home,
//             path: '/dashboard'
//         },
//         // {
//         //     name: 'Quiz',
//         //     icon: Book,
//         //     path: '/dashboard/quiz'
//         // },
//         // {
//         //     name: 'Assess',
//         //     icon: Pen,
//         //     path: '/dashboard/assess'
//         // },
//         {
//             name: 'Exercise',
//             icon: Pen,
//             path: '/dashboard/exercise'
//         },
//         {
//             name: 'Meal Planner',
//             icon: Paperclip,
//             path: '/dashboard/mealPlanner'
//         },
//         {
//             name: 'History',
//             icon: FileClock,
//             path: '/dashboard/history'
//         },
//         // {
//         //     name: 'Billing',
//         //     icon: WalletCards,
//         //     path: '/dashboard/billing'
//         // },
//         {
//             name: 'Setting',
//             icon: Settings,
//             path: '/dashboard/settings'
//         },
//         {
//             name: 'Finance',
//             icon: Settings,
//             path: '/dashboard/finance'
//         },
//         {
//             name: 'Music',
//             icon: Settings,
//              path: '/dashboard/music'
//         },
//     ];

//     const path = usePathname();
//     useEffect(() => {
//         console.log(path);
//     }, [path]);

//     return (
//         <div className='h-screen p-5 shadow-sm border bg-gray-200'>
//             <div className='flex justify-center border-b'>
//                 <Image src={'/logo.svg'} alt='logo' width={50} height={50} />
//             </div>
//             <hr className='my-3 border' />
//             <div className='mt-3'>
//                 {MenuList.map((menu, index) => (
//                     <Link key={index} href={menu.path}> {/* Wrap in Link */}
//                         <div className={`flex gap-2 mb-2 p-3
//                         hover:bg-[#3bb6bf] hover:text-white rounded-lg
//                         cursor-pointer items-center
//                         ${path === menu.path ? 'bg-[#3bb6bf] text-white' : ''}
//                         `}>
//                             <menu.icon className='h-6 w-6' />
//                             <h2>{menu.name}</h2>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default SideNav;

"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Book, FileClock, Home, Paperclip, Pen, Settings, WalletCards, Cloud } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link'; 

function SideNav() {
    const MenuList = [
        {
            name: 'Home',
            icon: Home,
            path: '/dashboard'
        },
        {
            name: 'Exercise',
            icon: Pen,
            path: '/dashboard/exercise'
        },
        {
            name: 'Meal Planner',
            icon: Paperclip,
            path: '/dashboard/mealPlanner'
        },
        {
            name: 'Weather',
            icon: Cloud,
            path: '/dashboard/weather'
        },
        {
            name: 'Finance',
            icon: Settings,
            path: '/dashboard/finance'
        },
        {
            name: 'Music',
            icon: Settings,
            path: '/dashboard/music'
        },
        // {
        //     name: 'History',
        //     icon: FileClock,
        //     path: '/dashboard/history'
        // },
        {
            name: 'Setting',
            icon: Settings,
            path: '/dashboard/settings'
        },
    ];

    const path = usePathname();
    useEffect(() => {
        console.log(path);
    }, [path]);

    return (
        <div className='h-screen p-5 shadow-sm border bg-gray-200'>
            <div className='flex justify-center border-b'>
                <Image src={'/logo.svg'} alt='logo' width={50} height={50} />
            </div>
            <hr className='my-3 border' />
            <div className='mt-3'>
                {MenuList.map((menu, index) => (
                    <Link key={index} href={menu.path}> 
                        <div className={`flex gap-2 mb-2 p-3
                        hover:bg-[#3bb6bf] hover:text-white rounded-lg
                        cursor-pointer items-center
                        ${path === menu.path ? 'bg-[#3bb6bf] text-white' : ''}
                        `}>
                            <menu.icon className='h-6 w-6' />
                            <h2>{menu.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SideNav;