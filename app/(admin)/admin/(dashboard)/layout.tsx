import AdminLayout from "@/src/components/admin/Layout/AdminLayout";




export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <AdminLayout>
        {children}
    </AdminLayout>
  
  );
}
