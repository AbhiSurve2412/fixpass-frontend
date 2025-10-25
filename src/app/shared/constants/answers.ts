import { Answer } from "../models/answer.model";

export const engineeringQuestionsAnswers: Answer[] = [
    {
      answerId: "DBMS-A1",
      questionId: "DBMS-Q1",
      name: "Compare DBMS and File processing system in terms of data isolation, data redundancy, data inconsistency, and data integrity.",
      description: "This answer explains the differences between DBMS and File Processing Systems with examples and tables.",
      answer: {
        "content": [
          {
            "type": "text",
            "data": "Comparison of DBMS and File Processing System:-"
          },
          {
            "type": "text",
            "data": "The table below compares DBMS and File Processing System in terms of data isolation, redundancy, inconsistency, and integrity."
          },
          {
            "type": "table",
            "data": {
              "headers": ["Parameter", "File Processing System", "DBMS"],
              "rows": [
                ["Data Isolation", "Data is stored in separate files for each application. Accessing related data requires complex programs.", "Data is stored in a centralized database. Multiple applications can access and share data easily."],
                ["Data Redundancy", "High redundancy because the same data may be stored in multiple files.", "Low redundancy as data is centralized and shared across applications."],
                ["Data Inconsistency", "High inconsistency due to duplicate data and lack of proper control.", "Minimal inconsistency because DBMS enforces a single source of truth with constraints and relationships."],
                ["Data Integrity", "Poor integrity; enforcing rules requires manual programming.", "Strong integrity through constraints (e.g., primary keys, foreign keys, validation rules)."]
              ]
            }
          },
          {
            "type": "text",
            "data": "Explanation: In file processing systems, data is scattered across files leading to duplication and inconsistency. DBMS overcomes these problems by centralizing data, enforcing constraints, and providing controlled access, ensuring data integrity and efficiency."
          }
        ]
      }  
    },
    {
      answerId: "DBMS-A3",
      questionId: "DBMS-Q3",
      name: "What is normalization and why is it important in database design?",
      description: "This answer explains normalization, its objectives, and examples of 2NF and 3NF in database design.",
      answer: {
        "content": [
          {
            "type": "header",
            "data": "Normalization Overview"
          },
          {
            "type": "text",
            "data": "Normalization is a systematic process of organizing data in a database to reduce redundancy and improve data integrity. It involves dividing larger tables into smaller ones and defining relationships between them. The most common normal forms are 2NF, 3NF, and BCNF."
          },
          {
            "type": "header",
            "data": "Second Normal Form (2NF)"
          },
          {
            "type": "header",
            "data": "Definition"
          },
          {
            "type": "Olist",
            "data": [
              {
                "text": "A relation is in 2NF if:"
              },
              {
                "text": "It is in First Normal Form (1NF) (i.e., the table has a primary key and no repeating groups or arrays)"
              },
              {
                "text": "All non-prime attributes (attributes that are not part of the primary key) are fully functionally dependent on the entire primary key."
              }
            ]
          },
          {
            "type": "text",
            "data": "A partial dependency exists when a non-prime attribute is dependent on only part of a composite primary key."
          },
          {
            "type": "header",
            "data": "Example"
          },
          {
            "type": "diagram",
            "data": {
              "url": "assets/diagram-2nf-overview.png",
              "description": "2NF Example Table"
            }
          },
          {
            "type": "Ulist",
            "data": [
              {
                "text": "Primary Key: (StudentID, CourseID)"
              },
              {
                "text": "Problem",
                "subpoints": [
                  {
                    "text": "StudentName depends only on StudentID, not the combination of StudentID and CourseID."
                  },
                  {
                    "text": "CourseName depends only on CourseID. This creates redundancy when the same student or course appears in multiple rows."
                  }
                ]
              }
            ]
          },
          {
            "type": "header",
            "data": "Solution"
          },
          {
            "type": "text",
            "data": "Decompose the table into smaller tables to remove partial dependencies:"
          },
          {
            "type": "header",
            "data": "Table 1: Students"
          },
          {
            "type": "diagram",
            "data": {
              "url": "diagram-students.url",
              "description": "Students table"
            }
          },
          {
            "type": "header",
            "data": "Table 2: Courses"
          },
          {
            "type": "diagram",
            "data": {
              "url": "diagram-courses.url",
              "description": "Courses table"
            }
          },
          {
            "type": "header",
            "data": "Table 3: Enrollments"
          },
          {
            "type": "diagram",
            "data": {
              "url": "diagram-enrollments.url",
              "description": "Enrollments table"
            }
          },
          {
            "type": "text",
            "data": "Now, all non-prime attributes (StudentName and CourseName) depend only on the relevant primary key."
          },
          {
            "type": "header",
            "data": "Third Normal Form (3NF)"
          },
          {
            "type": "header",
            "data": "Definition"
          },
          {
            "type": "text",
            "data": "A relation is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on the primary key."
          },
          {
            "type": "header",
            "data": "Example"
          },
          {
            "type": "diagram",
            "data": {
              "url": "diagram-3nf-overview.url",
              "description": "3NF Example Table"
            }
          },
          {
            "type": "Ulist",
            "data": [
              {
                "text": "Primary Key: (StudentID, CourseID)"
              },
              {
                "text": "Problem",
                "subpoints": [
                  {
                    "text": "StudentName depends only on StudentID."
                  },
                  {
                    "text": "DepartmentName depends on DepartmentID, which is linked to StudentID. This creates a transitive dependency."
                  }
                ]
              }
            ]
          },
          {
            "type": "header",
            "data": "Solution"
          },
          {
            "type": "text",
            "data": "Decompose the table to remove transitive dependencies:"
          },
          {
            "type": "header",
            "data": "Table 1: Students"
          },
          {
            "type": "diagram",
            "data": {
              "url": "diagram-3nf-students.url",
              "description": "Students table"
            }
          },
          {
            "type": "header",
            "data": "Table 2: Courses"
          },
          {
            "type": "diagram",
            "data": {
              "url": "diagram-3nf-courses.url",
              "description": "Courses table"
            }
          },
          {
            "type": "header",
            "data": "Table 3: Departments"
          },
          {
            "type": "diagram",
            "data": {
              "url": "diagram-departments.url",
              "description": "Departments table"
            }
          },
          {
            "type": "header",
            "data": "Table 4: Enrollments"
          },
          {
            "type": "diagram",
            "data": {
              "url": "diagram-3nf-enrollments.url",
              "description": "Enrollments table"
            }
          },
          {
            "type": "text",
            "data": "Now, all non-prime attributes depend only on the relevant primary key, and there are no transitive dependencies."
          }
        ]
      }
    }
  ];
  