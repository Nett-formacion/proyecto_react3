import Tabla from "@/Components/Tabla.jsx";
import Layout from "@/Layouts/Layout.jsx";
export default function Index({tabla, campos, filas}){
    console.log(`nombre de tabla ${tabla}`);
    console.log(`Campos  ${campos}`);
    console.log(`Filas  ${filas}`);
    return(
        <Layout>
            <Tabla campos={campos} filas={filas} nombre={tabla} />
        </Layout>
    );
}
