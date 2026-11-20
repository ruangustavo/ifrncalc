export function StatusBar() {
  return (
    <div className="flex h-[54px] items-end justify-between bg-chrome px-8 pb-2.5 text-chrome-foreground">
      <span className="w-[54px] text-center text-[17px] leading-none font-semibold tracking-tight">
        9:41
      </span>
      <span className="flex items-center gap-1.5">
        <svg viewBox="0 0 18 12" className="h-3 w-[18px]" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 16 12" className="h-3 w-4" fill="currentColor">
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8 .5 10.2 10.2 0 0 0 .8 3.4L2 4.6a8.5 8.5 0 0 1 6-2.4Z" />
          <path d="M8 5.6c1.4 0 2.6.5 3.6 1.4l1.2-1.2A6.8 6.8 0 0 0 8 3.9a6.8 6.8 0 0 0-4.8 1.9L4.4 7c1-.9 2.2-1.4 3.6-1.4Z" />
          <path d="M8 9c.5 0 1 .2 1.3.5L8 11.5 6.7 9.5c.3-.3.8-.5 1.3-.5Z" />
        </svg>
        <span className="relative flex h-[13px] w-[27px] items-center rounded-[4px] border border-current/40 p-[1.5px]">
          <span className="h-full w-[80%] rounded-[2px] bg-current" />
          <span className="absolute top-1/2 -right-[3.5px] h-1 w-[1.5px] -translate-y-1/2 rounded-r-sm bg-current/40" />
        </span>
      </span>
    </div>
  )
}
