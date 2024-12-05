export default function Profile({params}:any) {
    return(
        <div className="min-h-screen flex justify-center items-center">
            <h1>Profile</h1>
            <p className="text-sm bg-yellow-300 max-w-screen-md">
                <span className="text-black">
                    Username: {params.username}
                </span>
            </p>
        </div>
    )
}