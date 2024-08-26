interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }
  
  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartRequirements extends CoursePartDescription {
    requirements: string[];
    kind: "special"
  }
  
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;
  
interface ContentProps {
  courseParts: CoursePart[];
}
  
const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map(coursePart => (
        <Part key={coursePart.name} {...coursePart} />
      ))}
    </>
  )
}
  
const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return  (
        <div>
          <h4>{props.name} {props.exerciseCount}</h4>
          <p>{props.description}</p>
        </div>
      )
    case "group":
      return (
        <div>
          <h4>{props.name} {props.exerciseCount}</h4>
          <p>project exercises {props.groupProjectCount}</p>
        </div>
      )
    case "background":
      return (
        <div>
          <h4>{props.name} {props.exerciseCount}</h4>
          <p>submit to {props.backgroundMaterial}</p>
        </div>
      )
    case "special": 
      return (
        <div>
          <h4>{props.name} {props.exerciseCount}</h4>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '1px'}}>
            <p>required skills: </p>
            {props.requirements.map(r => (
            <p key={r}>
              {r}
            </p>
            ))}
          </div>
        </div>
      )
    default:
      return assertNever(props);
  }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}
  
export default Content;