export default function Video() {
    return (
        <div className="relative w-full bg-black overflow-hidden h-fit overflow-hidden">
            <video
                preload="auto"
                autoPlay
                muted
                loop
                className="w-screen"
            >
                <source src="/video/fixtunemotors.mp4" type="video/mp4" />
            </video>
        </div>

    )
}