import { Header } from "@/components/layout/Header";
import { FooterWrapper } from "@/components/layout/FooterWrapper";
import { WhatsAppButtonWrapper } from "@/components/layout/WhatsAppButtonWrapper";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-16rem)]">{children}</main>
      <FooterWrapper />
      <WhatsAppButtonWrapper />
    </>
  );
}
