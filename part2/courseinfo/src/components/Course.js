const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ sum }) => {
  const total = sum.reduce((acc, actual) => acc + actual.exercises, 0);

  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  return (
    <div key={course.id}>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts} />
    </div>
  );
};

export default Course;
