import React from 'react'
import ContentLoader from 'react-content-loader'

const FavoritePageLoader = () => (
  <ContentLoader
    speed={2}
    width={250}
    height={326}
    viewBox="0 0 250 326"
    backgroundColor="#f2f2f2"
    foregroundColor="#fff1f1"
  >
    <rect x="0" y="0" rx="15" ry="15" width="250" height="326" />
    <rect x="148" y="91" rx="0" ry="0" width="27" height="1" />
  </ContentLoader>
)

export default FavoritePageLoader
