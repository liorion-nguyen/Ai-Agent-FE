interface ImgProps {
  className?: string;
  src: string;
  alt: string;
}

export default function Img({ className, src, alt }: ImgProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}
