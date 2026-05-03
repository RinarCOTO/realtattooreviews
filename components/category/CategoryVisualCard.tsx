import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

export default function CategoryVisualCard({ src, alt }: Props) {
  return (
    <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]">
      <div className="aspect-3/4 w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={448}
          height={597}
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 448px"
          loading="eager"
          priority
        />
      </div>
    </div>
  );
}
