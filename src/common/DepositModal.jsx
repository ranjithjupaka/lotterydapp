import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useEffect, useState } from 'react'
import AnimatedNumbers from 'react-animated-numbers'
import LossModal from '../common/LossModal'
import WonModal from '../common/WonModal'
import { toast } from 'react-toastify'
import { LotteryContext } from '../contexts/LotteryContext'

function DepositModal({ isOpenD, closeModalD, depositFunds }) {
  const [isamount, setIsAmount] = useState(null)

  const handleInputamount = (e) => {
    setIsAmount(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (isamount > 0) {
      console.log('deposit')
      depositFunds(isamount)
      closeModalD()
    } else {
      toast('Deposit amount should be greater than 0')
    }
  }

  return (
    <>
      <div>
        <Transition appear show={isOpenD} as={Fragment}>
          <Dialog as='div' className='relative z-10' onClose={closeModalD}>
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
                      <h1 className='font-bold text-xs md:text-sm'>Deposit</h1>
                      <div className='py-5 flex flex-col text-justify'>
                        <label className='font-bold text-xs md:text-sm'>
                          Amount
                        </label>
                        <input
                          placeholder='Amount'
                          type='number'
                          value={isamount}
                          onChange={handleInputamount}
                          className='focus:outline-none p-2 md:w-[20rem]  bg-white/[13%] h-9 rounded-[5px]'
                        />
                      </div>
                    </div>

                    <div className='flex justify-center py-2'>
                      <button
                        className='gradient font-semibold text-xl px-3 py-2 md:w-[20rem] rounded-[5px]'
                        onClick={handleClick}
                        disabled={!isamount}
                      >
                        Submit
                      </button>
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
export default DepositModal
