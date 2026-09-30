import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Header />
                {children}
            </div>
        </div>
    );
}