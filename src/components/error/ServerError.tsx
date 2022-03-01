import astronaut from "../../lotties/astronaut.json";
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from "react-router-dom";

export const ServerError = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="h-screen flex flex-col text-size-lg items-center justify-center">
                <p className="dark:text-gray-100 text-bold text-2xl text-center	mx-2">Oops an error occured on our end. We'll look into it!</p>
                <Player src="https://assets8.lottiefiles.com/packages/lf20_9tvcldy3.json" style={{ height: "500px" }} controls={true} loop={true} autoplay={true} />
                <button onClick={() => navigate("/")} className="inline-flex items-center py-2  px-3 text-sm font-medium text-center text-white rounded-lg hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Go back
                </button>
            </div>

        </>
    )
}
