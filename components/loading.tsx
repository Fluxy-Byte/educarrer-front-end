"use client"

interface Props {
  loading: boolean,
  message?: string
}

export default function Loading({ loading, message }: Props) {

  if (loading) {
    return (
      <div className="flex fixed items-center bg-neutral-300/60 justify-center w-full h-full top-0 left-0 z-999">
        <div className="text-center">
          <div className="inline-block h-8 w-8 text-black animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-black">{
            message ?? "Carregando..."
          }</p>
        </div>
      </div>
    )
  } else {
    return;
  }
}
