import {redirect} from "next/navigation";
import {getSession, login} from "@/app/login/auth/lib";

export default async function Page() {
    const session = await getSession();
    if (session) {
        redirect("/player");
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-offWhite relative">
            <div
                className="bg-white shadow-md rounded-lg p-8 max-w-md w-full border border-blue-200 transition duration-500 ease-in-out "
            >
                <h2 className="text-center text-2xl font-semibold text-hpDarkBlue mb-6">
                    Login
                </h2>
                <form
                    action={async (formData) => {
                        'use server';
                        try {
                            await login(formData);
                            redirect("/");
                        } catch (err) {
                            console.log(err);
                        }
                    }}
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Username"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-purple-200"
                        />
                    </div>
                    <div className="mb-4">
                        <div className="relative">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-black focus:ring-purple-200"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        <a
                            href="/register"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            Register
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}