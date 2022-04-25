import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      clipPath="url(#a)"
      stroke="#0E4647"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.5 18.333a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666ZM16.667 18.333a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666ZM.833.833h3.334L6.4 11.992a1.667 1.667 0 0 0 1.667 1.341h8.1a1.667 1.667 0 0 0 1.666-1.341L19.168 5H5" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default SvgComponent
