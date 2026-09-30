import Header from "./Header";


export default function WebLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1 p-4">{children}</main>
          
        </div>
    );
}