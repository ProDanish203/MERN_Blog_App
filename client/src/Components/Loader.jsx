import React from 'react'

export const Loader = ({ dark }) => {
  return (
    <>
    <div className={`${!dark ? "lds-ellipsis" : "lds-ellipsis dark"} `}><div></div><div></div><div></div><div></div></div>
    </>
  )
}
