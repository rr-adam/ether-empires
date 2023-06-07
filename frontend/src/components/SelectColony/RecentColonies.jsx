function RecentColonies({ recentColonies, handleSelectColony }) {
  return (
    <>
      {recentColonies.map((colony) => {
        return (
          <>
            <p className='text-sm link link-primary' onClick={() => { handleSelectColony(colony) }}>{colony}</p>
          </>
        )
      })}
    </>
  );
}

export default RecentColonies;