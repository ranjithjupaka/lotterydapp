import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useEffect, useState } from 'react'
import AnimatedNumbers from 'react-animated-numbers'
import LossModal from '../common/LossModal'
import WonModal from '../common/WonModal'
import { toast } from 'react-toastify'
import { LotteryContext } from '../contexts/LotteryContext'

function InstructionsModal({ isOpenI, closeModalI }) {
  return (
    <>
      <div>
        <Transition appear show={isOpenI} as={Fragment}>
          <Dialog as='div' className='relative z-10' onClose={closeModalI}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-rhino p-2 text-left align-middle shadow-xl transition-all text-white'>
                    <div className='flex flex-col items-center justify-evenly py-5 '>
                      <h1 className='font-bold text-xs md:text-sm'>
                        🎲 How to Play:
                      </h1>
                      <ol className='pl-4 mt-4'>
                        <li>1️⃣ Pick your lucky number from 0 to 9.</li>
                        <li>2️⃣ Place your bet (minimum 3, maximum 999).</li>
                        <li>
                          3️⃣ Our smart contract works its magic and conjures up
                          a random number between 0 and 9.
                        </li>
                        <li>
                          4️⃣ If your chosen number matches the magical one,
                          you'll win a whopping 10 TIMES your bet!
                        </li>
                        <li className='mt-3 mb-3'>
                          But wait, there's more:
                          <ul className=' pl-4'>
                            <li>
                              🔥 If your numbers don't sync up, fear not! Your
                              bet joins the ever-growing Jackpot.
                            </li>
                            <li>
                              💰 The house takes winner only a tiny 3% cut.
                            </li>
                            <li>
                              💥 The house guarantees to cover losses up to the
                              Jackpot's maximum value.
                            </li>
                          </ul>
                        </li>
                        <li>
                          Get ready for some high-stakes, heart-pounding fun
                          with DigitDash! 🚀
                        </li>
                        <li className='mt-2'>
                          You can Play on Telegram using your authcode from
                          clicking on below link :
                          <a href='https://t.me/betdappbot' target='_blank'>
                            https://t.me/betdappbot
                          </a>
                        </li>
                      </ol>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  )
}
export default InstructionsModal
