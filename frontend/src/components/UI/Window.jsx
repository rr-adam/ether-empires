function Window({ children }) {

  return (
    <>
      <div className='bg-base-300 w-full h-full border border-slate-600 rounded-lg shadow-lg overflow-y-auto overflow-x-hidden break-words'>
        {children}
      </div>
    </>
  );
}

export default Window;