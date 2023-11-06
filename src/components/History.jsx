import { ethers } from 'ethers'

function History({ transactions }) {
  // Transaction Types 1 => Deposit,2 => Withdraw,3 => Winner,4 => Refferal Winner,5 => Loser
  const getDate = (time) => {
    const timestampInSeconds = ethers.utils.formatUnits(time, 0)
    const date = new Date(timestampInSeconds * 1000)
    const formattedDateTime = date.toLocaleString()
    return formattedDateTime
  }

  const getDesc = (transtype) => {
    if (transtype == 1) {
      return 'Deposit'
    } else if (transtype == 2) {
      return 'Withdraw'
    } else if (transtype == 3) {
      return 'Won Bet'
    } else if (transtype == 4) {
      return 'Refferal Winner'
    } else if (transtype == 5) {
      return 'Lost Bet'
    }
  }
  console.log(transactions)
  return (
    <>
      <div className='max-w-[1024px] px-4 m-auto'>
        <div className='py-14 text-center'>
          <h1 className='text-5xl font-semibold text-white'>History</h1>
        </div>
        <div className=' w-auto overflow-scroll md:overflow-hidden flex justify-center  border border-white/[70%] text-white rounded-[5px]'>
          <table className='w-full'>
            <thead className='bg-rhino'>
              <tr className='text-justify'>
                <th className='py-3 pl-[69px]'>Date</th>
                <th className='py-3 pl-[69px]'>Amount</th>
                <th className='py-3  pl-[69px]'>Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trans) => {
                const transtype = ethers.utils.formatUnits(trans[0], 0)
                return (
                  <tr className=' text-sm sm:text-lg font-medium border-b '>
                    <td className='py-[10px] pl-[69px]'>{getDate(trans[2])}</td>
                    <td
                      className={
                        transtype == 1 || transtype == 3 || transtype == 4
                          ? 'text-screamin pl-[69px]'
                          : 'text-[#FF2D2D] pl-[69px]'
                      }
                    >
                      {ethers.utils.formatUnits(trans[1], 18)}
                    </td>
                    <td className='pl-[69px]'>{getDesc(transtype)}</td>
                  </tr>
                )
              })}

              {/* <tr className=' text-sm sm:text-lg  font-medium border-b '>
                <td className='py-[10px] pl-[69px]'>10/08/2023</td>
                <td className='text-screamin pl-[69px]'>+10,000</td>
                <td className='pl-[69px]'>Transfer To Lottery Original</td>
              </tr>
              <tr className=' text-sm sm:text-lg  font-medium border-b '>
                <td className='py-[10px] pl-[69px]'>10/08/2023</td>
                <td className='text-[#FF2D2D] pl-[69px]'>+10,000</td>
                <td className='pl-[69px]'>Transfer To Lottery Original</td>
              </tr>
              <tr className=' text-sm sm:text-lg font-medium border-b '>
                <td className='py-[10px] pl-[69px]'>10/08/2023</td>
                <td className='text-screamin pl-[69px]'>+10,000</td>
                <td className='pl-[69px]'>Transfer To Lottery Original</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
export default History
