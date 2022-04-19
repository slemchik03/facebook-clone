import { collection } from "firebase/firestore"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { Spinner } from "../components/Spinner"
import { UserItem } from "../components/Users/UserItem"
import { firestore } from "../firebase"
import { useInfinityData } from "../utils/hooks/useInfinityData"


function Users() {
    const { realtimeData: users, loading } = useInfinityData({
        collectionRef: collection(firestore, "users"),
        dataLimit: 10,
        orderParams: ["name", "desc"]
    })

    return (
        <div className="text-center">
            <h1 className="font-extrabold text-transparent 
            text-3xl bg-clip-text bg-gradient-to-r 
            from-green-400 to-blue-500 pt-5">List of all users!</h1>
            <div className="grid grid-flow-row mx-auto max-w-3xl mt-10 space-y-5">
                {
                    users.map((user, i) => {
                        const userItem = {
                            name: user.data().name,
                            img: user.data().img,
                            email: user.data().email
                        }
                        return <UserItem key={i} {...userItem} />
                    })
                }
                {
                    loading && (
                        <div className="flex justify-center">
                            <Spinner />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

Users.auth = {
    access: "protected"
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    return {
        props: {
            session,
        }
    }

}

export default Users