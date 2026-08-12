export default function NameNotch({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 bg-primary/80 text-white rounded-full h-fit z-50 w-fit py-2 px-8 mx-auto my-2">
      <p className="text-xs flex items-center justify-center font-semibold">{name.toUpperCase()}</p>
    </div>
  );
}
