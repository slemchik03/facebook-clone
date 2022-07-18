import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import Layout from "../components/Layout";
import { NextCustomPage } from "../utils/types/NextCustomPage";

const ProtectedPageError: NextCustomPage = () => {
    return (
        <div className="flex text-center flex-col justify-center items-center min-h-screen">
            <p className="font-extrabold text-transparent 
            text-3xl bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-500 pt-5">Sorry but you don`t have accses to this page.</p>
            <Link href={"/"}>
                <a className="text-d-none p-2 rounded-lg 
                bg-cyan-500 font-mono text-white mt-4 
                hover:bg-cyan-400 transition-all">Return to login page.</a>
            </Link>
        </div>
    )
}

ProtectedPageError.access = "public"
ProtectedPageError.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default ProtectedPageError

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    return {
        props: {
            session,
        }
    }

}