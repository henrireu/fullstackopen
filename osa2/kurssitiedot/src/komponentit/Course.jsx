const Course = ({ course }) => {
    return (
      <div>
        <Header name = {course.name} />
        <Content parts = {course.parts} />
        <Total parts = {course.parts} />
    </div>
    )
  }
  
  const Total = ({parts}) => {
    const yhteenlaskettu = parts.reduce((summa, part) => {
      return summa + part.exercises;
    }, 0);
    return <h4>total of {yhteenlaskettu} exercises</h4>
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    )
  }
  
  
  
  const Part = ({part}) => <p>{part.name} {part.exercises}</p>
  
  const Header = ({ name }) => <h1>{name}</h1>

  export default Course