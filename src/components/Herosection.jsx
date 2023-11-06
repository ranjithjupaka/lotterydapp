import { useContext, useEffect, useState } from 'react'
import bingo from '../assets/images/bingo.png'
import lottery from '../assets/images/lotterylogo.jpg'
import CarousalSlider from '../common/CarousalSlider'
import GameModal from '../common/GameModal'
import { LotteryContext } from '../contexts/LotteryContext'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import InstructionsModal from '../common/InstructionsModal'

const GamesData = [
  {
    image: lottery,
    heading: 'DigitDash',
    title: '10x jackpot',
  },
]
function Herosection({ auth, playGame, setRefferalToken, balance }) {
  let [isOpen, setIsOpen] = useState(false)
  let [isOpenI, setIsOpenI] = useState(false)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const ref = queryParams.get('ref')

  useEffect(() => {
    console.log('ref token', ref)
    setRefferalToken(ref)
  }, [ref])

  function closeModal() {
    setIsOpen(false)
  }

  function closeModalI() {
    setIsOpenI(false)
  }

  function openModal() {
    console.log(balance)
    if (!auth) {
      console.log('here..')
      toast('Authenticate to Play Games')
    } else if (balance < 3) {
      toast('Deposit a min amount of 3 USDT to Play')
    } else if (auth && balance >= 3) {
      setIsOpen(true)
    }
  }

  function openModelI() {
    setIsOpenI(true)
  }

  useEffect(() => {
    console.log('loaded auth', auth)
  }, [auth])

  return (
    <>
      <div className='max-w-[1024px] px-4 m-auto text-white '>
        <CarousalSlider />
        <div className='mt-16'>
          <h1 className='text-3xl'>Available Games</h1>
          <div className='pt-11'>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
              {GamesData.map((value, id) => {
                return (
                  <>
                    <div className=' rounded-[15px]  bg-rhino' key={id}>
                      <img
                        src={value.image}
                        alt=''
                        className=' w-[100%] lg:w-72'
                      />
                      <div className='flex flex-col  items-center py-[5px]'>
                        <span className='text-lg font-semibold'>
                          {value.heading}
                        </span>
                        <span className='text-xs text-sky font-medium'>
                          {value.title}
                        </span>
                      </div>
                      <div className='flex flex-col items-center py-[10px] gap-3'>
                        <button
                          onClick={openModal}
                          className='cursor-pointer font-Montserrat text-base font-semibold px-7 py-[3px]  rounded-[10px] bg-blue'
                        >
                          Play
                        </button>
                        <button
                          onClick={openModelI}
                          className='cursor-pointer font-Montserrat text-base font-semibold px-7 py-[3px]  rounded-[10px] bg-blue'
                        >
                          Instructions
                        </button>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <GameModal
        isOpen={isOpen}
        closeModal={closeModal}
        playGame={playGame}
        balance={balance}
      />
      <InstructionsModal isOpenI={isOpenI} closeModalI={closeModalI} />
    </>
  )
}
export default Herosection
