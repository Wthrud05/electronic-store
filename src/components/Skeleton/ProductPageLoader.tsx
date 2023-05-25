import React from 'react'
import ContentLoader from 'react-content-loader'

const ProductPageLoader = () => {
  return (
    <ContentLoader
      style={{ marginTop: '40px' }}
      speed={2}
      width={950}
      height={550}
      viewBox="0 0 950 550"
      backgroundColor="#f2f2f2"
      foregroundColor="#fff1f1"
    >
      <rect x="0" y="0" rx="15" ry="15" width="550" height="550" />
      <rect x="590" y="0" rx="11" ry="11" width="350" height="50" />
      <rect x="590" y="70" rx="0" ry="0" width="350" height="2" />
      <rect x="590" y="100" rx="10" ry="10" width="350" height="50" />
      <rect x="590" y="170" rx="0" ry="0" width="350" height="2" />
      <rect x="590" y="200" rx="10" ry="10" width="350" height="50" />
      <rect x="590" y="280" rx="0" ry="0" width="350" height="2" />
      <circle cx="630" cy="350" r="40" />
      <circle cx="730" cy="350" r="40" />
      <rect x="590" y="410" rx="0" ry="0" width="350" height="2" />
      <rect x="590" y="490" rx="10" ry="10" width="220" height="60" />
    </ContentLoader>
  )
}

export default ProductPageLoader
