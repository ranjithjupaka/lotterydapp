const Loader = () => (
  <div className='w-[50%]  flex-center h-10'>
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className='animate-spin'
    >
      <div
        className='h-full w-full border-4 border-t-blue-500
       border-b-blue-700 rounded-[50%]'
      ></div>
    </div>
  </div>
)

export default Loader
