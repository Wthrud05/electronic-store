import React from 'react'
import ContentLoader from 'react-content-loader'

const CartPageLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={1260}
      height={410}
      viewBox="0 0 1260 410"
      backgroundColor="#f2f2f2"
      foregroundColor="#fff1f1"
    >
      <rect x="148" y="91" rx="0" ry="0" width="27" height="1" />
      <rect x="270" y="225" rx="0" ry="0" width="2" height="17" />
      <rect x="0" y="0" rx="10" ry="10" width="1260" height="126" />
      <rect x="353" y="101" rx="0" ry="0" width="300" height="1" />
      <rect x="0" y="135" rx="10" ry="10" width="1260" height="126" />
      <rect x="0" y="270" rx="10" ry="10" width="1260" height="126" />
    </ContentLoader>
  )
}

export default CartPageLoader
