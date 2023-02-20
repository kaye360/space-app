

export default function Loader() {

    const cellGenerator = Array(36).fill(false)

    return (
        <div className="absolute inset-0 bg-[#080b12] z-[9999] grid place-items-center animate-loader pointer-events-none">

            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 animate-loader-grid">
                { cellGenerator.map( () => <GridCell /> )}
            </div>

            <div className="text-6xl font-space animate-pulse animate-loading-text">
                Loading...
            </div>
        </div>
    )
}




function GridCell() {
    return (
        <div className="border border-gray-600"></div>
    )
}