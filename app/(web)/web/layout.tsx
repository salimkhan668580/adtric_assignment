import WebLayout from "@/src/components/web/Layout/WebLayout";




export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <WebLayout>
        {children}
    </WebLayout>
  
  );
}