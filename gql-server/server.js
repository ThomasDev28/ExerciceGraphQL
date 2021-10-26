/* eslint-disable no-script-url */
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        courseTitle(title: String): [Course]
    },
    type Mutation {
        createCourse(title: String, author: String, description: String, topic: String, url: String): [Course]
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

const coursesData = [
  {
    id: 1,
    title: "The Complete Node.js Developer Course",
    author: "Andrew Mead, Rob Percival",
    description:
      "Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs/",
  },
  {
    id: 2,
    title: "Node.js, Express & MongoDB Dev to Deployment",
    author: "Brad Traversy",
    description:
      "Learn by example building & deploying real-world Node.js applications from absolute scratch",
    topic: "Node.js",
    url: "https://codingthesmartway.com/courses/nodejs-express-mongodb/",
  },
  {
    id: 3,
    title: "JavaScript: Understanding The Weird Parts",
    author: "Anthony Alicea",
    description:
      "An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.",
    topic: "JavaScript",
    url: "https://codingthesmartway.com/courses/understand-javascript/",
  },
];

const getCoursesByTitle = function (args) {
  if (args.title) {
    const title = args.title;
    return coursesData.filter((course) => course.title.includes(title));
  } else {
    return coursesData;
  }
};

const createCourseFunc = (args) => {
  if (!args) {
    throw new Error("No course are created");
  }
  const newCourse = {
    id: 4,
    title: args.title,
    author: args.author,
    description: args.description,
    topic: args.topic,
    url: args.url,
  };
  const finalArray = [...coursesData, newCourse];

  return finalArray;
};

// Root resolver
const root = {
  courseTitle: getCoursesByTitle,
  createCourse: createCourseFunc,
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () =>
  console.log("Express GraphQL Server Now Running On localhost:4000/graphql")
);
