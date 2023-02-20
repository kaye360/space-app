import { useContext, useEffect } from "react"
import { SpaceDataContext } from "./SolarSystem"
import imgMercury from "../assets/mercury.png"
import imgVenus from "../assets/venus.png"
import imgEarth from "../assets/earth.png"
import imgMars from "../assets/mars.png"
import imgJupiter from "../assets/jupiter.png"
import imgSaturn from "../assets/saturn.png"
import imgUranus from "../assets/uranus.png"
import imgNeptune from "../assets/neptune.png"
import imgPluto from "../assets/pluto.png"

interface IPlanetProps {
    name : string,
    planetList: {name : string}[],
    currentPlanet : number,
    moveToPlanet : Function,
    planetIsTransitioning : boolean
}

interface IplanetAPI {
    aphelion : number,
    avgTemp : number,
    bodyType : string,
    density : number,
    englishName : string,
    gravity : number,
    isPlanet : boolean,
    mass : {
        massValue : number
    },
    moons : null | object[],
    perihelion : number
}

interface IplanetImgList {
    [key: string] : string
}



export default function Planet(
    {name, planetList, currentPlanet, moveToPlanet, planetIsTransitioning} : IPlanetProps
) {

    const data = useContext(SpaceDataContext)

    let planet: IplanetAPI = data.filter( body => body.englishName === name )[0]

    const headingStyle = {
        transform : `translateX(${-currentPlanet * 11.4 + 45}%)`
    }

    const planetImgList : IplanetImgList = {
        Mercury : imgMercury,
        Venus : imgVenus,
        Earth : imgEarth,
        Mars : imgMars,
        Jupiter : imgJupiter,
        Saturn : imgSaturn,
        Uranus : imgUranus,
        Neptune : imgNeptune,
        Pluto : imgPluto
    }

    useEffect( () => {
        const img = document.querySelector('#planetIMG') as HTMLImageElement
        img.classList.remove('animate-planet-in')
        setTimeout( () => {
            img.classList.add('animate-planet-in')
        }, 200)
    },[name]) 


    return (
        <section className="w-full h-screen flex flex-col items-center justify-evenly" >

            <h2 className="flex gap-0 md:gap-8 items-center md:[&>*]:w-[200px] min-h-[3rem] text-2xl font-space transition-all duration-500" style={headingStyle}>

                { planetList.map( (planet, index) => (

                    <span key={planet.name}
                        onClick={ () => moveToPlanet(index)}
                        className={` 
                            ${planet.name === name
                                ? 'text-5xl bg-gray-900 bg-opacity-40 opacity-100'
                                : 'opacity-30'
                            } inline-block p-4 rounded-lg relative z-50 transition-all duration-500 text-center cursor-pointer`}
                    >
                        {planet.name}
                    </span>

                ))}
            </h2>

            <div className="px-8 md:px-0">
                <img 
                    src={planetImgList[name]} 
                    alt={name} 
                    id="planetIMG"
                    className={`max-h-[50vh] opacity-0 aspect-square ${planetIsTransitioning ? 'animate-planet-out' : 'animate-planet-in'}`} 
                />
            </div>

            <div className="md:flex md:gap-8 rounded-xl p-4 md:p-8 bg-gray-900 bg-opacity-80">
                <p>
                    Aphelion: {planet.aphelion}
                </p>
                
                <p>
                    Perihelion: {planet.perihelion}
                </p>

                <p>
                    Gravity: {planet.gravity}
                </p>

                <p>
                    Average Temp: {planet.avgTemp}
                </p>

                <p>
                    Mass: {planet.mass.massValue}
                </p>

                <p>
                    Moons: {Array.isArray(planet.moons) ? (
                        planet.moons.length
                    ) : (
                        '0'
                    )}
                </p>
            </div>
            
        </section>
    )
}