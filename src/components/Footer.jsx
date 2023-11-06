import { BsTwitter, BsDiscord, BsMedium } from "react-icons/bs";
import { BiLogoTelegram } from "react-icons/bi";
import Logo from '../assets/images/logo2.jpg'
import LanguageDropDown from '../common/LanguageDropDown'

function Footer() {
  return (
    <>
      <div className='bg-black mt-10'>
        <div className='max-w-[1024px] px-4 m-auto'>
          <div className='grid   grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10 border-b  border-ebony text-white'>
            <div className='flex flex-col text-base font-medium'>
              <a
                className='pt-[10px] cursor-pointer'
                href='https://betdapp.gitbook.io/docs/about-bet-dapp'
                target='_blank'
              >
                About BetDapp
              </a>
              <a
                className='pt-[10px] cursor-pointer'
                href='https://betdapp.gitbook.io/docs/responsible-gambling'
                target='_blank'
              >
                Responsible Gambling
              </a>
            </div>
            <div className='flex flex-col text-base font-medium'>
              <a
                className='pt-[10px] cursor-pointer'
                href='https://betdapp.gitbook.io/docs/'
                target='_blank'
              >
                Terms & Conditions
              </a>
              <a
                className='pt-[10px] cursor-pointer'
                href='https://betdapp.gitbook.io/docs/privacy-policy'
                target='_blank'
              >
                Privacy Policy
              </a>
              <a
                className='pt-[10px] cursor-pointer'
                href='https://betdapp.gitbook.io/docs/help-center'
                target='_blank'
              >
                Help Center
              </a>
            </div>
            <div className='flex flex-col text-base font-medium'>
              <span>Follow us</span>
              <div className='flex items-center gap-2 pt-3'>
                <div className='border-2 border-white/[0.2] p-3 rounded-full flex'>
                  <BsTwitter className=' text-2xl flex cursor-pointer' />
                </div>
                <div className='border-2 border-white/[0.2] p-3 rounded-full flex'>
                  <BiLogoTelegram className=' text-2xl flex cursor-pointer' />
                </div>
                <div className='border-2 border-white/[0.2] p-3 rounded-full flex'>
                  <BsDiscord className=' text-2xl flex cursor-pointer' />
                </div>
                <div className='border-2 border-white/[0.2] p-3 rounded-full flex'>
                  <BsMedium className=' text-2xl flex cursor-pointer' />
                </div>
              </div>
            </div>
            <div className='flex justify-center '>
              <LanguageDropDown />
            </div>
          </div>
          <div className='py-10 border-b  border-ebony'>
            <div className='flex justify-center'>
              <div className='flex text-justify gap-4'>
                <img src={Logo} alt='' height={50} width={50} />
                <span className='text-comet pt-2 text-xs'>
                  © BetDapp 2023. All Rights Reserved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer;
