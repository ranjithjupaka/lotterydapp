import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import UserLogo from '../assets/images/UserLogo.png'
import History from '../assets/images/History.png'
import LogOut from '../assets/images/Log Out.png'
import Referral from '../assets/images/Referral.png'
import Profile from '../assets/images/Profile.png'
import { LotteryContext } from '../contexts/LotteryContext'
const DropValue = [
  {
    imgUrl: Profile,
    btntitle: 'Profile',
    path: '/Profile',
  },
  {
    imgUrl: History,
    btntitle: 'History',
    path: '/history',
  },
  {
    imgUrl: Referral,
    btntitle: 'Referral',
    path: '/referralprogram',
  },
  {
    imgUrl: LogOut,
    btntitle: 'LogOut',
    path: '/',
  },
]
function DropDown({ disconnectAccount, username }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    console.log('username loaded', username)
  }, [username])

  return (
    <>
      <div className='text-right'>
        <Menu as='div' className='relative inline-block text-left'>
          <div onClick={() => setOpen(!open)}>
            <Menu.Button className='inline-flex w-full justify-center    px-4 py-2 text-sm font-medium text-white gap-2  items-center '>
              <div>
                <img src={UserLogo} alt='' />
              </div>
              <span className='text-lg font-semibold'>{username}</span>
              {open ? (
                <ChevronUpIcon
                  className='ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100'
                  aria-hidden='true'
                />
              ) : (
                <ChevronDownIcon
                  className='ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100'
                  aria-hidden='true'
                />
              )}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-[5px] bg-rhino shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {DropValue.map((val, ind) => {
                return (
                  <>
                    <div className='pl-[15px] py-[10px] '>
                      <Menu.Item key={ind}>
                        {({ active }) => (
                          <div className='flex items-center gap-2'>
                            <img
                              src={val.imgUrl}
                              alt=''
                              className='w-[17px] flex'
                            />
                            <button
                              className={`${
                                active ? ' text-white' : 'text-white'
                              }  flex w-full items-center font-semibold  text-sm`}
                              onClick={() => {
                                val.btntitle == 'LogOut'
                                  ? disconnectAccount()
                                  : window.location.replace(val.path)
                              }}
                            >
                              {val.btntitle}
                            </button>
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  </>
                )
              })}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  )
}
export default DropDown;
