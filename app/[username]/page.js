import React from 'react'

// const Username = ({params}) => {
//   return (
//     <div className='text-white'>
//       {params.username}
//     </div>
//   )
// }

// export default Username

export default async function Username({ params }) {
  const { username } = await params;

  return (
    <>
      {username}
      <div className="cover w-full bg-amber-400 relative">
        <img className='' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/20.gif?token-hash=AK5ABuUj1faTfJ81f6g-kTWcxuDkPwfGfoWBnAegBss%3D&token-time=1783123200" alt="" />
        <div className="profile absolute -bottom-[106px] right-[46%] border border-gray-100 rounded-4xl">
          <img width={150} height={150} className='rounded-4xl' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/aa52624d1cef47ba91c357da4a7859cf/eyJoIjozNjAsInciOjM2MH0%3D/4.gif?token-hash=1DnYcnQ4OmqOXejf2ZmZPScr6MSb2eh1QGTpMzKf6MI%3D&token-time=1781913600" alt="" />
        </div>
      </div>
      <div className='info text-white text-2xl font-bold flex justify-center items-center my-28  flex-col gap-4'>
        <div>
          @{username}
        </div>

        <div className='text-slate-400 text-sm'>
          Creating Animated art for VTT's
        </div>
        <div className='text-slate-400 text-sm'>

          25,746 members111 posts$16,970/release
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11">
          <div className="supporters w-1/2 bg-gray-800 rounded-lg p-6">
            <h2 className='text-xl font-bold my-5' >Supporters</h2>
            <ul className='text-sm'>
              <li className="my-2 flex gap-2 justify-start items-center">
                <img className='rounded-full' width={33} height={33} src="profile.gif" alt=" user avatar" />
                <span>Shubham donated <span className='font-bold text-xl'> $30 </span> with a message "I suppport you bro , Lots of ❤️"</span>
              </li>
              <li className="my-2 flex gap-2 justify-start items-center">
                <img className='rounded-full' width={33} height={33} src="profile.gif" alt=" user avatar" />
                <span>Shubham donated <span className='font-bold text-xl'> $30 </span> with a message "I suppport you bro , Lots of ❤️"</span>
              </li>
              <li className="my-2 flex gap-2 justify-start items-center">
                <img className='rounded-full' width={33} height={33} src="profile.gif" alt=" user avatar" />
                <span>Shubham donated <span className='font-bold text-xl'> $30 </span> with a message "I suppport you bro , Lots of ❤️"</span>
              </li>
             
             
            
              
            </ul>
          </div>

          <div className="makePayment w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>

            <div className='flex gap-2 flex-col'>
              {/* input for name and message */}

              <div>
                <input
                  type="text"
                  className='w-full p-3 rounded-lg bg-slate-800'
                  placeholder='Enter Name'
                />
              </div>

              <input
                type="text"
                className='w-full p-3 rounded-lg bg-slate-800'
                placeholder='Enter Message'
              />

              <input
                type="text"
                className='w-full p-3 rounded-lg bg-slate-800'
                placeholder='Enter Amount'
              />

              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Pay
              </button>
            </div>

            {/* Or choose from these amounts */}

            <div className='flex gap-2 mt-5'>
              <button className='bg-slate-800 p-3 rounded-lg'>Pay $10</button>
              <button className='bg-slate-800 p-3 rounded-lg'>Pay $20</button>
              <button className='bg-slate-800 p-3 rounded-lg'>Pay $50</button>
            </div>
          </div>
        </div>




      </div>
    </>
  )
}