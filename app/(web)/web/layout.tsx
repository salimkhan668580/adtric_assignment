import WebLayout from "@/src/components/web/Layout/WebLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <WebLayout>{children}</WebLayout>;
}