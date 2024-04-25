import HeaderLayout from "@/Layouts/HeaderLayout.jsx";
import NavLayout from "@/Layouts/NavLayout.jsx";
import MainLayout from "@/Layouts/MainLayout.jsx";
import FooterLayout from "@/Layouts/FooterLayout.jsx";
export default function  Layout({children}){
    return(
        <>
            <HeaderLayout />
            <NavLayout />
            <MainLayout>
                {children}
            </MainLayout>
            <FooterLayout />
        </>

    );
}
