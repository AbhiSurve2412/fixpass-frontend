import { Unit } from '../models/unit.model';

export const engineeringUnits: Unit[] = [
  {
    unitId: 'DBMS-U1',
    subjectId: '310241',
    name: 'Unit I - Introduction to Database Management Systems and ER Model',
    description: `Introduction to DBMS: Advantages, characteristics, and architecture of DBMS. 
Data models, schemas, instances, and data independence. Database users and DBA. 
Entity–Relationship (ER) model: entities, attributes, relationships, constraints, keys, ER diagrams, and generalization–specialization.`,
  },
  {
    unitId: 'DBMS-U2',
    subjectId: '310241',
    name: 'Unit II - SQL and PL/SQL',
    description: `SQL: Data Definition Language (DDL), Data Manipulation Language (DML), 
Data Control Language (DCL), and Transaction Control Language (TCL). 
SQL queries using JOIN, subqueries, aggregate functions, and views. 
PL/SQL: Cursors, triggers, stored procedures, and exception handling.`,
  },
  {
    unitId: 'DBMS-U3',
    subjectId: '310241',
    name: 'Unit III - Relational Database Design',
    description: `Relational model concepts: attributes, tuples, domains, and keys. 
Integrity constraints: domain, entity, referential, and key constraints. 
Functional dependencies, closure of attributes, canonical cover. 
Normalization: 1NF, 2NF, 3NF, BCNF, and multi-valued dependencies (4NF).`,
  },
  {
    unitId: 'DBMS-U4',
    subjectId: '310241',
    name: 'Unit IV - Database Transaction Management',
    description: `Transaction concept: ACID properties, transaction states, and concurrency issues. 
Concurrency control: locking mechanisms, timestamp ordering, and deadlock handling. 
Database recovery: log-based recovery, checkpoint, and shadow paging.`,
  },
  {
    unitId: 'DBMS-U5',
    subjectId: '310241',
    name: 'Unit V - NoSQL Databases',
    description: `Introduction to NoSQL: need, characteristics, and comparison with relational databases. 
Types of NoSQL databases: key-value, document, column-family, and graph databases. 
Case studies: MongoDB and Cassandra — CRUD operations and indexing.`,
  },
  {
    unitId: 'DBMS-U6',
    subjectId: '310241',
    name: 'Unit VI - Advances in Databases',
    description: `Data Warehousing and Data Mining: concepts, architecture, and applications. 
Distributed and parallel databases: concepts and design issues. 
Introduction to Big Data and NewSQL databases. Overview of database security and privacy.`,
  },
];
