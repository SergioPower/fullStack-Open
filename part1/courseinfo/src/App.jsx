const Header = ({ course }) => {
	return (
		<>
			<h1>{course}</h1>
		</>
	)
}

const Part = props => {
	return (
		<div>
			<p>
				{props.part} {props.excercises}
			</p>
		</div>
	)
}

const Content = props => {
	return (
		<div>
			<Part
				part={props.part1}
				excercises={props.excercises1}
			/>
			<Part
				part={props.part2}
				excercises={props.excercises2}
			/>
			<Part
				part={props.part3}
				excercises={props.excercises3}
			/>
		</div>
	)
}

const Total = props => {
	return (
		<div>
			<p>
				Number of excercises{' '}
				{props.excercises1 + props.excercises2 + props.excercises3}
			</p>
		</div>
	)
}

const App = () => {
	const course = 'Half Sack application development'
	const part1 = 'Fundamentals od React'
	const excercises1 = 10
	const part2 = 'Using props to pass data'
	const excercises2 = 7
	const part3 = 'State od a component'
	const excercises3 = 14

	return (
		<div>
			<Header course={course} />
			<Content
				part1={part1}
				excercises1={excercises1}
				part2={part2}
				excercises2={excercises2}
				part3={part3}
				excercises3={excercises3}
			/>
			<Total
				excercises1={excercises1}
				excercises2={excercises2}
				excercises3={excercises3}
			/>
		</div>
	)
}

export default App
