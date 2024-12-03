// // import { cn } from '@/lib/utils';

// // interface SpinnerProps {
// //     className?: string;
// //     outerSize?: string;
// //     childSize?: string;
// // }
// // export default function Spinner({
// //     className,
// //     outerSize,
// //     childSize,
// // }: SpinnerProps) {
// //     return (
// //         <div
// //             className={cn(
// //                 `m-2 h-8 w-8 animate-spin items-center justify-center rounded-full
// //         bg-gradient-to-bl from-pink-500 to-blue-600 p-0.5`,
// //                 className,
// //                 outerSize
// //             )}
// //         >
// //             <div className={cn('h-6 w-6 rounded-full bg-white', childSize)} />
// //         </div>
// //     );
// // }
// import React from 'react';
// import clsx from 'clsx';

// interface SpinnerProps {
//     size?: string; // Optional size prop to customize spinner size
//     className?: string; // Optional additional class for custom styles
// }

// const Spinner: React.FC<SpinnerProps> = ({ size = 'h-32 w-32', className }) => {
//     return (
//         <div
//             className={clsx(
//                 'relative flex justify-center items-center',
//                 size,
//                 className
//             )}
//         >
//             {/* Outer Circle with Gradient */}
//             <div className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

//             {/* Small Circle that Spins Around the Outer Circle */}
//             <div className="absolute w-6 h-6 rounded-full bg-white animate-spin "></div>
//         </div>
//     );
// };

// export default Spinner;
