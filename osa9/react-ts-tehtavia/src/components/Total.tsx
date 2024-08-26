interface CoursePart {
  name: string;
  exerciseCount: number;  
}
    
interface ContentProps {
  courseParts: CoursePart[];
}

const Total = (props: ContentProps) => {
  const totalExercises: number = props.courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
  return (
    <p>
      Number of exercises {totalExercises}
    </p>
  )
}

export default Total;