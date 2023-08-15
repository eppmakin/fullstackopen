const Header = ({ courseName }) => {
return <h1>{courseName}</h1>;
};

const Total = ({ totalExercises }) => {
return <p>total of {totalExercises} exercises</p>;
};

const Part = ({ name, exercises }) => {
return (
    <p>
    {name} {exercises}
    </p>
);
};

const Content = ({ parts }) => {
return (
    <div>
    {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
    </div>
);
};

const Course = ({ course }) => {
const { name, parts } = course;
const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

return (
    <div>
    <Header courseName={name} />
    <Content parts={parts} />
    <Total totalExercises={totalExercises} />
    </div>
);
};

export default Course