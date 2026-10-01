import Header from "./Header";
import Footer from "./Footer";
import InfoModal from "./InfoModal";

export default function WebLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <InfoModal />
        </div>
    );
}
