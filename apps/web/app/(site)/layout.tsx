import NavMain from "@/components/layout/nav/nav-main";
import Footer from "@/components/layout/footer/footer";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className="sticky top-0">
                <NavMain />
            </header>
            {children}
            <footer>
                <Footer />
            </footer>
        </>
    )
}