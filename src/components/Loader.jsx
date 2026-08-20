import Image from "next/image";

export default function Loader() {
  return (
    <div className="     flex items-center justify-center">
      <Image
        src="/loader.png"
        alt="Loading"
        width={300}
        height={300}
        className="animate-spin [animation-duration:2s]"
      />
    </div>
  );
}
