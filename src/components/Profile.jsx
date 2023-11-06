import avtar from "../assets/images/avtar.png";
import { MdEdit } from "react-icons/md";
import { BiLogoTelegram } from "react-icons/bi";
import { useContext, useEffect } from 'react'
import { BiCopy } from 'react-icons/bi'
import { LotteryContext } from '../contexts/LotteryContext'

function Profile({ account, username, authcode }) {
  useEffect(() => {
    console.log('username,account loaded', username, account, authcode)
  }, [username, account, authcode])

  return (
    <>
      <div className='max-w-[1024px] text-white mx-auto px-4'>
        <h1 className=' text-base py-5 md:text-[28px] font-bold'>Profile</h1>
        {/* <div className='flex flex-col items-center py-10 '>
          <img
            src={avtar}
            alt=''
            className='w-[140px] h-[140px]  rounded-full'
          />
          <button className=' mt-5 font-bold rounded-[5px] py-2 px-3 gradient'>
            My NFTs
          </button>
          <span className='text-white/40 mt-2'>
            Choose a NFT as Your Avatar
          </span>
        </div> */}
        <div>
          <label className='font-bold text-xs md:text-sm'>NICKNAME</label>
          <div className='relative flex pt-1'>
            <input
              value={username}
              className='w-full rounded-[3px] bg-alto/[13%] h-10 focus:outline-none p-2'
              readOnly
            />
            <div className=' cursor-pointer flex absolute text-white right-3  p-2 rounded-[5px] top-2  md:top-2 '>
              <MdEdit />
            </div>
          </div>
        </div>
        <div className='pt-5'>
          <label className='font-bold text-xs md:text-sm'>ADDRESS</label>
          <div className='relative flex pt-1'>
            <input
              className='w-full rounded-[3px] bg-alto/[13%] h-10 focus:outline-none p-2'
              readOnly
              value={account}
            />
            <div className=' cursor-pointer flex absolute text-white right-3  p-2 rounded-[5px] top-2  md:top-2 '>
              <BiCopy />
            </div>
          </div>
        </div>
        <div>
          <label className='font-bold text-xs md:text-sm'>AUTHCODE</label>
          <div className='relative flex pt-1'>
            <input
              value={authcode}
              className='w-full rounded-[3px] bg-alto/[13%] h-10 focus:outline-none p-2'
              readOnly
            />
            <div className=' cursor-pointer flex absolute text-white right-3  p-2 rounded-[5px] top-2  md:top-2 '>
              <MdEdit />
            </div>
          </div>
        </div>
        {/* <div className="pt-5">
          <label className="font-bold text-xs md:text-sm">TELEGRAM NAME</label>
          <div className="relative flex pt-1">
            <input
              placeholder="-"
              className="w-full rounded-[3px] bg-alto/[13%] h-10 focus:outline-none p-2"
            />
            <div className=" text-xs cursor-pointer font-semibold flex items-center gap-1 absolute text-white right-3 bg-[#54a9eb] p-2 rounded-[5px]  top-2  md:top-2 ">
              <BiLogoTelegram className="text-base" /> Connect My Telegram
            </div>
          </div>
        </div> */}
        {/* <div className="pt-5">
          <label className="font-bold text-xs md:text-sm">EMAIL</label>
          <div className="relative flex pt-1">
            <input
              placeholder="-"
              className="w-full rounded-[3px] bg-alto/[13%] h-10 focus:outline-none p-2"
            />
          </div>
        </div>
        <div className="pt-5">
          <label className="font-bold text-xs md:text-sm">
            SELF-EXCLUSION PERIOD
          </label>
          <div className="relative flex pt-1">
            <input
              placeholder="Here you can setup self-exclusion period."
              className="w-full rounded-[3px] bg-alto/[13%] h-10 focus:outline-none p-2"
            />
            <div className=" cursor-pointer text-xs px-5 font-semibold bg-[#1cab70]  flex items-center  absolute text-white right-3  p-2 rounded-[5px]  top-2  md:top-2 ">
              Set Self-Exclusion Period
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}
export default Profile;
