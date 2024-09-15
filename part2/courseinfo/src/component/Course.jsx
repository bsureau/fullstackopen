import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {

    const sumUp = () => {
        const sum = course.parts.reduce(
            (accumulator, actual) => accumulator + actual.exercises,
            0
        )
        return sum
    }
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <p>
                <strong>
                    Total of {course.parts.reduce(
                        (accumulator, actual) => accumulator + actual.exercises,
                        0
                    )} exercises
                </strong>
            </p>
        </>
    )
}

export default Course
