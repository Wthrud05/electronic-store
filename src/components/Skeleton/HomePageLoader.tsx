import React from 'react'
import ContentLoader from 'react-content-loader'

const HomePageLoader = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={335}
    viewBox="0 0 300 335"
    backgroundColor="#f2f2f2"
    foregroundColor="#fff1f1"
  >
    <rect x="0" y="215" rx="10" ry="10" width="300" height="38" />
    <rect x="-1" y="5" rx="10" ry="10" width="300" height="200" />
    <rect x="-1" y="268" rx="10" ry="10" width="108" height="22" />
    <rect x="-3" y="301" rx="10" ry="10" width="300" height="30" />
  </ContentLoader>
)

export default HomePageLoader
