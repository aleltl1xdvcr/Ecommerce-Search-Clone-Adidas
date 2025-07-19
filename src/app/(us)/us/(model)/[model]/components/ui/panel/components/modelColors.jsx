import Image from "next/image";

export default function ModelColors({ data }) {
  return (
    <div
      className="my-9"
    >
      <div
        className="flex flex-col"
      >
        <div>
          <h1>
            Colors available in size 2XL
          </h1>
        </div>
        <div
          className="flex flex-row gap-x-2"
        >
          {
            data?.map((i, index) => (
              <div
                key={index}
                className="flex flex-col"
              >
                <div
                  className="relative h-[80px] w-[80px]"
                >
                  <Image
                    fill
                    objectFit="cover"
                    alt={i.Title}
                    src={i.ModelImage.url}
                  />
                  {
                    index === 0 ?
                      <div
                        className="absolute bottom-0 bg-zinc-800 w-full h-[10px]"
                      >

                      </div>
                      : null
                  }
                </div>
              </div>
            ))
          }
        </div>
        <div>
          <h1>
            {data.Name}
          </h1>
        </div>
      </div>
    </div>
  )
}