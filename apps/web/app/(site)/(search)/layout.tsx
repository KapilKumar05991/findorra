import Sidebar from "@/components/layout/sidebar/app-sidebar";

import SearchBar from "@/components/layout/search/searchbar";
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SearchBar />
            <main className="container mx-auto flex">
                <Sidebar />
                {children}
            </main>
        </>
    )
}