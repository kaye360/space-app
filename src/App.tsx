import { MouseEventHandler, ReactNode, useState } from "react";
import Planet from "./components/Planet";
import SolarSystem from "./components/SolarSystem";
import bgSpace from "./assets/bg-space-large.jpg"
import Loader from "./components/Loader";

function App() {

	const [currentPlanet, setCurrentPlanet] = useState<number>(0)
	const [planetIsTransitioning, setPlanetIsTransitioning] = useState<boolean>(false)
	const [backgroundPosition, setBackgroundPosition] = useState<number>(0)

	const planetList = [
		{ name: 'Mercury' },
		{ name: 'Venus' },
		{ name: 'Earth' },
		{ name: 'Mars' },
		{ name: 'Jupiter' },
		{ name: 'Saturn' },
		{ name: 'Uranus' },
		{ name: 'Neptune' },
		{ name: 'Pluto' },
	]

	function prevPlanet() {
		if(currentPlanet !== 0) {
			setPlanetIsTransitioning(true)
			setBackgroundPosition(backgroundPosition - 1)
			setTimeout( () => {
				setPlanetIsTransitioning(false)
				setCurrentPlanet(currentPlanet - 1)
			}, 1000)
		}
	}

	function nextPlanet() {
		if(currentPlanet !== planetList.length - 1) {
			setPlanetIsTransitioning(true)
			setBackgroundPosition(backgroundPosition + 1)
			setTimeout( () => {
				setPlanetIsTransitioning(false)
				setCurrentPlanet(currentPlanet + 1)
			}, 1000)
		}
	}

	function moveToPlanet(planetNum : number) {
		setPlanetIsTransitioning(true)
		setBackgroundPosition(planetNum)
		setTimeout( () => {
			setPlanetIsTransitioning(false)
			setCurrentPlanet(planetNum)
		}, 1000)
	}

	const isAtStart = currentPlanet !== 0
	const isAtEnd = currentPlanet !== planetList.length - 1

	return (
		<div className="App relative w-full h-screen max-w-5xl overflow-hidden mx-auto text-gray-200 px-8">

			<Loader />

			<Background backgroundPosition={backgroundPosition} />

			<Header />

			<nav className="absolute inset-8 z-50 pointer-events-none">

				{ isAtStart &&
					<NavBtn onClick={prevPlanet} className="left-0">
						<span className="material-icons md:translate-x-4 scale-[2] md:scale-[4]">
							arrow_back_ios
						</span>
					</NavBtn>
				}

				{ isAtEnd &&
					<NavBtn onClick={nextPlanet} className="right-0">
						<span className="material-icons scale-[2] md:scale-[4]">
							arrow_forward_ios
						</span>
					</NavBtn>
				}
			</nav>

			<SolarSystem>

				<Planet 
					name={planetList[currentPlanet].name} 
					planetList={planetList} 
					currentPlanet={currentPlanet}
					moveToPlanet={moveToPlanet}
					planetIsTransitioning={planetIsTransitioning}
				/>

			</SolarSystem>


		</div>
	)
}




interface INavBtn {
	className? : string,
	onClick? : MouseEventHandler,
	children? : ReactNode
}

function NavBtn({className, onClick, children} : INavBtn) {

	return (
		<button
			onClick={onClick}
			className={`absolute top-[50vh] -translate-y-[50%] bg-transparent opacity-30 hover:opacity-80 p-0 border-none outline-none flex flex-col items-center gap-8 active:border-none active:outline-none focus:outline-none focus:border-none pointer-events-auto ${className} `}
		>

			{children}

		</button>
	)
}




interface IBackground {
	backgroundPosition : number
}

function Background({backgroundPosition} : IBackground) {

	return(
		<div className="absolute inset-0 bg-black bg-opacity-30">
			<img src={bgSpace} 
				className={`absolute left-0 top-[-50vh] min-w-[300vw] min-h-[300vh] object-cover origin-center transition-all duration-[7s]
				${backgroundPosition === 0 ? '' : ''}
				${backgroundPosition === 1 ? '-translate-x-[20vh] rotate-12' : ''}
				${backgroundPosition === 2 ? '-translate-x-[40vh] -translate-y-[20vh] rotate-[33deg]' : ''}
				${backgroundPosition === 3 ? '-translate-x-[50vh] -translate-y-[22vh] rotate-45' : ''}
				${backgroundPosition === 4 ? '-translate-x-[70vh] -translate-y-[50vh] rotate-[33deg]' : ''}
				${backgroundPosition === 5 ? '-translate-x-[130vh] -translate-y-[90vh] rotate-45' : ''}
				${backgroundPosition === 6 ? '-translate-x-[100vh] -translate-y-[100vh] rotate-90' : ''}
				${backgroundPosition === 7 ? '-translate-x-[110vh] -translate-y-[80vh] rotate-[80deg]' : ''}
				${backgroundPosition === 8 ? '-translate-x-[100vh] -translate-y-[60vh] rotate-[60deg]' : ''}
				`} 
			/>
	</div>
	)
}




function Header() {

	return (
		<header className="absolute left-0 right-0 top-0 px-4">

			<h1 className="flex items-center justify-between py-4 w-full text-xl">
				<div className="flex items-center gap-2">
					<span className="material-icons">rocket_launch</span>
					<span className="hidden md:inline">
						Space App
					</span>
				</div>

				<div className="flex items-center gap-2">
					<span className="material-icons">code</span>
					<span className="material-icons">person_outline</span>
				</div>
			</h1>

		</header>
	)
}




export default App
