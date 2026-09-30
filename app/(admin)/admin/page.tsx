import AdminLayout from "@/src/components/admin/Layout/AdminLayout";
import Dashboard from "@/src/components/admin/dashboard/Dashboard";

export default function dashboard() {
    return (
        <AdminLayout>
            <Dashboard />
        </AdminLayout>
    );
}