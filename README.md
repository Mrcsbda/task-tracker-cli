# task tracker cli

A command line task tracker. Add, update and track what you need to do, what
you are working on and what you have finished — stored as plain JSON, no
database and no external dependencies.

Built with TypeScript following clean architecture.

## Requirements

- Node.js 18 or newer
- yarn (or npm)

## Installation

Clone the repository and link the command globally:

```bash
git clone https://github.com/Mrcsbda/task-tracker-cli
cd task-tracker
yarn install
npm link
```

`yarn install` builds the project automatically, and `npm link` registers the
`task-cli` command on your system. From then on it works from any folder:

```bash
task-cli add "buy bread"
```

To remove it: `npm unlink -g task-tracker`.

## Usage

```
task-cli <command> [arguments]
```

| Command                       | What it does                      |
| ----------------------------- | --------------------------------- |
| `add "<description>"`         | Creates a task with status `todo` |
| `update <id> "<description>"` | Changes a task description        |
| `mark-in-progress <id>`       | Sets the status to `in-progress`  |
| `mark-done <id>`              | Sets the status to `done`         |
| `delete <id>`                 | Removes a task permanently        |
| `list`                        | Shows every task                  |
| `list todo`                   | Shows only pending tasks          |
| `list in-progress`            | Shows only tasks in progress      |
| `list done`                   | Shows only finished tasks         |

### Example session

```bash
$ task-cli add "buy bread"
Task added successfully (ID: f6360ebd-0899-4d35-aff9-99955620c08f)

$ task-cli mark-in-progress f6360ebd-0899-4d35-aff9-99955620c08f
Task updated successfully (ID: f6360ebd-0899-4d35-aff9-99955620c08f)

$ task-cli list in-progress
id:f6360ebd-0899-4d35-aff9-99955620c08f createdAt: 2026-09-05 19:22 updatedAt: 2026-09-05 19:41 status:in-progress description: buy bread

$ task-cli mark-done f6360ebd-0899-4d35-aff9-99955620c08f
Task updated successfully (ID: f6360ebd-0899-4d35-aff9-99955620c08f)

$ task-cli delete f6360ebd-0899-4d35-aff9-99955620c08f
Task deleted successfully: "buy bread", (ID: f6360ebd-0899-4d35-aff9-99955620c08f)
```

Quotes are recommended but not required — `task-cli add buy bread` also works,
since the remaining arguments are joined into the description.

### Errors

Every failure prints a single line and exits with code `1`, so the command can
be chained safely in scripts:

```bash
$ task-cli add
description is required

$ task-cli delete missing-id
Task with ID missing-id not found

$ task-cli list pending
status must be one of: todo, in-progress, done
```

## Where the data lives

Tasks are stored in `tasks/tasks.json`, **relative to the folder where you run
the command**. The file and its folder are created on first use.

```json
[
  {
    "id": "f6360ebd-0899-4d35-aff9-99955620c08f",
    "description": "buy bread",
    "status": "todo",
    "createdAt": "2026-09-05T19:22:00.000Z",
    "updatedAt": "2026-09-05T19:22:00.000Z"
  }
]
```

Dates are stored in UTC and displayed in your local timezone. Running the
command from a different folder gives you a separate task list.

## Development

```bash
yarn dev add "buy bread"   # run from source, without building
yarn test                  # run the test suite
yarn typecheck             # type check without emitting
yarn build                 # compile to dist/
yarn start list            # run the compiled output
```

Note that `yarn dev` passes arguments straight through. With npm you need an
extra separator: `npm run dev -- add "buy bread"`.

## Architecture

Three layers, with all dependencies pointing inwards. The domain knows nothing
about the file system or the terminal, which is what makes it possible to swap
the storage or add an HTTP interface without touching the business rules.

```
src/
├── domain/                     # Business rules. Depends on nothing.
│   ├── entities/               # TaskEntity, TaskStatus
│   ├── dtos/                   # Validated command input
│   ├── datasources/            # Storage contract (abstract)
│   ├── repository/             # Repository contract (abstract)
│   └── use-cases/              # One class per action
│
├── infrastructure/             # How data is actually stored.
│   ├── datasources/            # FileSystemDatasource (fs, JSON)
│   └── repositories/           # TaskRepositoryImplementation
│
├── presentation/               # How the user interacts.
│   ├── cli-app.ts              # Parses argv and dispatches
│   ├── commands/               # One class per command
│   └── helpers/                # Output formatting
│
└── app.ts                      # Entry point. Wires everything together.
```

`app.ts` is the only file that knows which concrete implementation is in use.
Switching from JSON to a database means writing a new datasource and changing
one line there.

## Tests

```bash
yarn test
```

63 tests covering the DTO validations, the entity, the file system datasource,
the use cases, the repository wiring and the commands' output. The datasource
tests run against a throwaway directory in the system temp folder, so your own
`tasks/tasks.json` is never touched.
