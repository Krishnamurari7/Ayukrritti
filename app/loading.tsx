export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      <p className="mt-4 text-muted-foreground">Loading...</p>
    </div>
  );
}
