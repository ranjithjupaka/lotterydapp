import link from "../assets/images/link.png";
import invite from "../assets/images/invite.png";
import rewards from "../assets/images/rewards.png";
import { useContext, useEffect } from 'react'
import { LotteryContext } from '../contexts/LotteryContext'

function ReferralProgram({ auth, refferals, reftkn }) {
  const ReferralData = [
    {
      imgurl: link,
      Heading: '1. Get your Link ',
      SubHeading: 'Get your Refferal Link from below section',
    },
    {
      imgurl: invite,
      Heading: '2. Invite Friends',
      SubHeading:
        ' Invite friends to register thought the referral link  and get rewards everytime they win bets ',
    },
    {
      imgurl: rewards,
      Heading: '3. Get Rewards',
      SubHeading:
        "DigitDash: You'll receive the full amount of your friend's bet every time they win. For instance, if your friend bets 100 and wins, you'll receive 100.",
    },
  ]

  useEffect(() => {
    console.log(refferals, reftkn, auth)
  }, [])

  return (
    <>
      <div className='max-w-[1350px] m-auto px-4'>
        <div className='pt-12'>
          <h1 className='text-center text-white text-5xl font-semibold'>
            Referral Program
          </h1>
          <h1 className='text-center text-white pt-3 text-[23px] font-normal'>
            Give a Discount to Your Friends & Get More. How it Works :
          </h1>
          <div className='pt-20 '>
            <div className='grid text-white md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4  gap-10'>
              {ReferralData.map((val, ind) => {
                return (
                  <>
                    <div key={ind}>
                      <img src={val.imgurl} alt='' />
                      <h1 className=' text-2xl sm:text-[34px] font-semibold pt-3'>
                        {val.Heading}
                      </h1>
                      <span className=' text-sm sm:text-lg text-white/40 font-semibold flex pt-2'>
                        {val.SubHeading}
                      </span>
                    </div>
                  </>
                )
              })}

              {refferals && refferals.length > 0 ? (
                <div className='rounded-[5px] border border-white/70 w-fit h-fit'>
                  <table className='w-full h-fit '>
                    <thead>
                      <tr className=' text-justify border-b border-white/70 '>
                        <th className='pl-7 py-2'>Your Refferals</th>
                      </tr>
                    </thead>
                    <tbody>
                      {refferals.map((r) => {
                        return (
                          <tr className='text-justify border-b border-white/70 text-sm'>
                            <td className='pl-3 py-2 pr-3'>{r}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h1 className='text-bold text-justify items-center'>
                  No Refferals
                </h1>
              )}
            </div>
          </div>
          <div className=' text-white pt-16'>
            <span className=' text-sm sm:text-xl font-semibold'>
              YOUR PERSONAL REFERRAL LINK :
            </span>
            <div className='sm:flex items-center gap-5 pt-[10px]'>
              <span className=' text-sm sm:text-md h-[35px] rounded-[5px] bg-alto/10 p-2'>
                {`https://betdapp.co/?ref=${reftkn || ''}`}
              </span>

              {/* <button className='mt-3 sm:mt-0 text-lg gradient rounded-[5px] font-semibold px-7 py-[3px] '>
                Copy
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ReferralProgram;
