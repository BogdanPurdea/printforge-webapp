import { PulseLoader} from "react-spinners";

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <PulseLoader color="#ff9550" size={50} />
        </div>
    )
}