import { Colors, moderateScale } from '@/Theme'
import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = ({ size = 24, color = Colors.black }) => (
  <Svg
    width={moderateScale(size)}
    height={moderateScale(size)}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M3.25 4a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 .75.75v3.19l3.427-3.427A1.75 1.75 0 0 1 11.164 17h9.586a.25.25 0 0 0 .25-.25V4.25a.25.25 0 0 0-.25-.25H3.25zm-1.75.25c0-.966.784-1.75 1.75-1.75h17.5c.966 0 1.75.784 1.75 1.75v12.5a1.75 1.75 0 0 1-1.75 1.75h-9.586a.25.25 0 0 0-.177.073l-3.5 3.5A1.457 1.457 0 0 1 5 21.043V18.5H3.25a1.75 1.75 0 0 1-1.75-1.75V4.25zM12 6a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4A.75.75 0 0 1 12 6zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
    />
  </Svg>
)

export default SvgComponent
