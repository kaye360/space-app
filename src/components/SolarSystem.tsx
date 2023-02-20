import { useQuery } from "@tanstack/react-query"
import { createContext, ReactNode } from "react"


interface ISolarSystemProps {
    children : ReactNode
}

const SpaceDataContextDefault: any[] = []

export const SpaceDataContext = createContext(SpaceDataContextDefault)


export default function SolarSystem({children} : ISolarSystemProps){

    async function getSpaceData() {
        const data = await fetch('https://api.le-systeme-solaire.net/rest/bodies/')
        const json = await data.json()
        return json.bodies
    }
  
    const {data, isLoading, isError } = useQuery(['getData'], getSpaceData)

	if(isError) {
		return (
			<div>
				Error loading Space Data
			</div>
		)
	}

	if(isLoading) {
		return (
			<div>
				Loading Space Data
			</div>
		)
	}

    return (
		<SpaceDataContext.Provider value={data}>
        	<div className="relative py-8">
            	{children}
        	</div>
		</SpaceDataContext.Provider>
    )

}

