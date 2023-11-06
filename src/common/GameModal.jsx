import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from 'react'
import AnimatedNumbers from 'react-animated-numbers'
import LossModal from '../common/LossModal'
import WonModal from '../common/WonModal'
import { toast } from 'react-toastify'
import { LotteryContext } from '../contexts/LotteryContext'

function GameModal({ isOpen, closeModal, playGame, balance }) {
  const [isamount, setIsAmount] = useState(null)
  const [num, setNum] = useState(0)
  const [isnumber, setIsNumber] = useState(null)
  const [shownumber, setShowNumber] = useState(false)
  const [isloss, setIsLoss] = useState(false)
  const [iswon, setIsWon] = useState(false)
  // const { playGame } = useContext(LotteryContext)

  const handleInputamount = (e) => {
    const newamounts = e.target.value
    setShowNumber(false)
    setIsAmount(newamounts)
  }

  const handleInputnumber = (e) => {
    setShowNumber(false)
    const newnumbers = e.target.value
    setIsNumber(newnumbers)
  }

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const handleClick = async () => {
    if (!isnumber || !isamount) {
      toast('Number and Amount both should be present')
    } else if (0 > isnumber || 9 < isnumber) {
      toast('Number should be between 0 and 9')
    } else if (isamount < 3) {
      toast('Min 3 USDT is required to Play')
    } else if (isamount < balance) {
      console.log(balance)
      toast('Insufficient Balance')
    } else if (isnumber >= 0 && 9 >= isnumber && isamount >= 3) {
      console.log('satisfied...')
      const randomnum = await playGame(isamount, isnumber)
      setNum(randomnum)
      console.log(randomnum, isnumber)
      setShowNumber(true)
      
      if (randomnum == null) {
        toast('Random number not picked. Try again later')
      } else if (parseInt(randomnum) === parseInt(isnumber)) {
        setTimeout(() => {
          setIsWon(true)
        }, 5000)
      } else {
        setTimeout(() => {
          setIsLoss(true)
        }, 5000)
      }

      setIsNumber('')
      setIsAmount('')
    }
  }

  const LossModalClose = () => {
    setIsLoss(false)
    setShowNumber(false)
  }

  const WonModalModal = () => {
    setIsWon(false)
    setShowNumber(false)
  }

  return (
    <>
      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                      <div className='py-5 flex flex-col text-justify'>
                        <label className='font-bold text-xs md:text-sm'>
                          Bet Amount (USDT)
                        </label>
                        <input
                          placeholder='Amount'
                          type='number'
                          value={isamount}
                          onChange={handleInputamount}
                          className='focus:outline-none p-2 md:w-[20rem]  bg-white/[13%] h-9 rounded-[5px]'
                        />
                      </div>
                      <div className='flex flex-col text-justify'>
                        <label className='font-bold text-xs md:text-sm'>
                          Pick a Number Between 0 and 9
                        </label>
                        <input
                          placeholder='Number'
                          type='number'
                          value={isnumber}
                          onChange={handleInputnumber}
                          className='focus:outline-none p-2 bg-white/[13%] md:w-[20rem] h-9 rounded-[5px]'
                        />
                      </div>
                    </div>

                    <div className='flex justify-center py-2'>
                      <button
                        className='gradient font-semibold text-xl px-3 py-2 md:w-[20rem] rounded-[5px]'
                        onClick={handleClick}
                        // disabled={!isamount || !isnumber}
                      >
                        Submit
                      </button>
                    </div>
                    <div className='mt-5'>
                      {shownumber && (
                        <>
                          <div className='flex justify-center rounded-[5px] border w-32 m-auto h-fit'>
                            <AnimatedNumbers
                              animateToNumber={num}
                              fontStyle={{ fontSize: 32 }}
                              locale='en-US'
                              configs={[
                                { mass: 1, tension: 220, friction: 100 },
                                { mass: 1, tension: 180, friction: 130 },
                                { mass: 1, tension: 280, friction: 90 },
                                { mass: 1, tension: 180, friction: 135 },
                                { mass: 1, tension: 260, friction: 100 },
                                { mass: 1, tension: 210, friction: 180 },
                              ]}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      {isloss && (
        <LossModal lossopen={isloss} lossclose={LossModalClose} num={num} />
      )}
      {iswon && <WonModal wonopen={iswon} wonclose={WonModalModal} num={num} />}
    </>
  )
}
export default GameModal;
