import Users from "../../components/Users/Users";

export default async function Page() {
  return (
    <>
      <p className="text-center font-bold text-3xl py-5">List of all users!</p>
      <div className="grid justify-center mt-10 space-y-5">
        <Users />
      </div>
    </>
  );
}
