import Image from "next/image";

import { Playfair_Display } from "next/font/google";
import { useSession, signOut } from "next-auth/react";
 

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});



export default function Home() {
  return (
    <>

      <div className="flex flex-col items-center justify-center h-[34vh] {poppins.className}">

        {/* <div className={`${playfair.className} text-7xl font-bold  flex justify-center items-center text-white text-9xl mb-4`}>Buy Me a Chai   </div> */}
        <div className={`${playfair.className}  font-bold  flex justify-center items-center text-white text-9xl mb-4 pt-[100px]`}>Buy Me a Chai  <span> <img src="/tea.gif" alt="" width={78} /></span>   </div>

        <p className="text-white text-lg">

          A crowdfunding platform for creators to raise funds for their projects by offering chai as a reward to their supporters.
        </p>


        <div className="flex gap-4 mt-6">
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-full">Start Here</button>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-full">Read More</button>

        </div>
      </div>
      <div className='bg-white h-1 opacity-10 mt-56'> </div>

      <div className="text-white container mx-auto py-16">
        <h1 className="text-2xl font-bold text-center mb-[34px]">Your fans can buy you a Chai</h1>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">

            <img className="bg-slate-400 rounded-full p-2 text-black" width={89} src="/man.gif" alt="" />
            <p className="font-bold">Fans want to help you</p>
            <p className="text-center "> your fans are available to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={89} src="/man.gif" alt="" />
            <p className="font-bold">Fans want to help you</p>
            <p className="text-center "> your fans are available to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">

            <img className="bg-slate-400 rounded-full p-2 text-black" width={89} src="/man.gif" alt="" />
            <p className="font-bold">Fans want to help you</p>
            <p className="text-center "> your fans are available to help you</p>
          </div>

        </div>
      </div>

      <div className='bg-white h-1 opacity-10'> </div>

      <div className="text-white container mx-auto py-10">
        <h1 className="text-2xl font-bold text-center my-14 mb-14">Watch Our Story</h1>
        <div className="flex justify-center">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/hC8CH0Z3L54?si=5x_XLX-8JIsbw1RL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>


    </>

  );
}
