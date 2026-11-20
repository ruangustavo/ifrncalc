const SCALE = 0.76
const VIEW = { x: -24, y: -176, width: 230, height: 200 }
const BODY = "M-9 -150H9V-28Q6.75 -20 4.5 -28Q0 -19 -4.5 -28Q-6.75 -20 -9 -28Z"
const SHADOW_HALF_WIDTHS = [12, 9.5, 7, 4.5]

export function ChalkPencil() {
  return (
    <svg
      width={VIEW.width * SCALE}
      height={VIEW.height * SCALE}
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`}
      style={{
        left: VIEW.x * SCALE,
        top: VIEW.y * SCALE,
        transformOrigin: `${-VIEW.x * SCALE}px ${-VIEW.y * SCALE}px`,
      }}
      className="absolute overflow-visible"
    >
      <defs>
        <linearGradient id="chalk-pencil-wood" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#f8e6c0" />
          <stop offset="0.5" stopColor="#e7c68e" />
          <stop offset="1" stopColor="#b48a52" />
        </linearGradient>
        <linearGradient id="chalk-pencil-lead" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#7b827e" />
          <stop offset="0.45" stopColor="#2f3432" />
          <stop offset="1" stopColor="#121413" />
        </linearGradient>
        <linearGradient id="chalk-pencil-metal" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#8a958f" />
          <stop offset="0.24" stopColor="#f6f9f7" />
          <stop offset="0.52" stopColor="#b3bdb7" />
          <stop offset="0.82" stopColor="#77827c" />
          <stop offset="1" stopColor="#525c56" />
        </linearGradient>
        <linearGradient id="chalk-pencil-eraser" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#ffad99" />
          <stop offset="0.45" stopColor="#f2795a" />
          <stop offset="1" stopColor="#b54730" />
        </linearGradient>
        <linearGradient id="chalk-pencil-shadow" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.17" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <clipPath id="chalk-pencil-body">
          <path d={BODY} />
        </clipPath>
      </defs>

      <g transform="rotate(61)" fill="url(#chalk-pencil-shadow)">
        {SHADOW_HALF_WIDTHS.map((half) => (
          <path key={half} d={`M0 0L${-half} -28V-178H${half}V-28Z`} />
        ))}
      </g>

      <g transform="rotate(35)">
        <path
          d="M-9 -164V-178C-9 -187 9 -187 9 -178V-164Z"
          fill="url(#chalk-pencil-eraser)"
        />
        <path d="M-9 -30H9V-28L0 0L-9 -28Z" fill="url(#chalk-pencil-wood)" />
        <path
          d="M-2.9 -9Q0 -7.4 2.9 -9L0.5 -0.4Q0 0.3 -0.5 -0.4Z"
          fill="url(#chalk-pencil-lead)"
        />
        <g clipPath="url(#chalk-pencil-body)">
          <rect x="-9" y="-150" width="18" height="132" fill="#f4cb3c" />
          <rect x="-9" y="-150" width="18" height="10" fill="#8fe35a" />
          <rect
            x="-9"
            y="-150"
            width="4.5"
            height="132"
            fill="#fff"
            opacity="0.34"
          />
          <rect
            x="4.5"
            y="-150"
            width="4.5"
            height="132"
            fill="#000"
            opacity="0.2"
          />
          <rect
            x="-4.5"
            y="-150"
            width="1.1"
            height="132"
            fill="#fff"
            opacity="0.5"
          />
          <rect
            x="4.5"
            y="-150"
            width="0.8"
            height="132"
            fill="#000"
            opacity="0.14"
          />
        </g>
        <path
          d="M-9.7 -166V-150Q0 -146.4 9.7 -150V-166Q0 -162.4 -9.7 -166Z"
          fill="url(#chalk-pencil-metal)"
        />
        <path
          d="M-9.7 -161Q0 -157.4 9.7 -161M-9.7 -155.5Q0 -151.9 9.7 -155.5"
          fill="none"
          stroke="#3f4843"
          strokeOpacity="0.45"
          strokeWidth="0.9"
        />
        <path
          d="M-9.7 -159.9Q0 -156.3 9.7 -159.9M-9.7 -154.4Q0 -150.8 9.7 -154.4"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.35"
          strokeWidth="0.6"
        />
      </g>
    </svg>
  )
}
