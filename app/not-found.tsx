export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <p className="text-muted-foreground mb-8">
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      >
        Go Home
      </a>
    </div>
  );
}
