import Image from "next/image";

interface ErrorComponentProps {
  title?: string;
  message?: string;
}

export default function ErrorComponent({
  title = "Something went wrong",
  message = "We couldn't load the data. Please try again.",
}: ErrorComponentProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <Image src="/error.png" alt="Loading" width={300} height={300} />

      <h2 className="text-2xl font-bold">{title}</h2>

      <p className="text-gray-500">{message}</p>
    </div>
  );
}
