import { clsx } from "clsx"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-lg bg-neutral-200",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
