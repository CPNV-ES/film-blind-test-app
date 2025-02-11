# EXTERNAL-SOURCE-LOAD-DATALAKE

## Description

The aim is to offer a service to act as a loader within an ELT and thus use a service to push data into a cloud provider such as S3.
---

## Getting Started

### Prerequisites

List all dependencies and their version needed by the project as :
* Nodejs version v22.11.0 or later [official doc](https://nodejs.org/fr)
* Npm version 11.1.0 or later [official doc](https://docs.npmjs.com/about-npm)
* Git version 2.47.1 or later [official doc](https://git-scm.com/)

---

### Configuration

#### Production environment

Copy and modify the .env file.
````shell
cp .env.example .env
````

Install all dependencies 
````shell
npm install --production
````

Build for production
````shell
npm run 
````

Preview the site.
````shell
npm run preview
````

The server is running on : [http://localhost:4173/](http://localhost:4173/)
---

#### Development environment

Copy and modify the .env file.
````shell
cp .env.example .env
````

Install all dependencies
````shell
npm install
````

Build for production
````shell
npm run dev
````

The server is running on : [http://localhost:5173/](http://localhost:5173/)

## Directory structure

````shell
├───public                  # Static files
├───src                     # Source code
│   ├───assets              # App-specific resources
│   ├───components          # Reusable UI components
│   ├───models              # Data models
│   ├───pages               # Page views
│   ├───services            # Business logic, APIs
│   ├───main.py             # Main Python file (if full-stack)
│   ├───app.css             # Global styles
│   ├───app.tsx             # Root component
│   ├───index.css           # Global CSS
│   ├───main.tsx            # React entry point
│   ├───vite-env.d.ts       # Vite types
├───eslint.config.js        # Linting config
├───index.html              # HTML entry point
├───.env.example            # Env variables template
├───package.json            # Dependencies & scripts
├───package-lock.json       # Lockfile
├───README.md               # Project documentation
├───tsconfig.app.json       # App-specific TS config
├───tsconfig.json           # Global TS config
├───tsconfig.node.json      # Node.js TS config
└───vite.config.ts          # Vite config      
````

## Collaborate

* Workflow
    * [Gitflow](https://www.atlassian.com/fr/git/tutorials/comparing-workflows/gitflow-workflow#:~:text=Gitflow%20est%20l'un%20des,les%20hotfix%20vers%20la%20production.)
    * [How to commit](https://www.conventionalcommits.org/en/v1.0.0/)
    * [How to use your workflow](https://nvie.com/posts/a-successful-git-branching-model/)

    * Propose a new feature in [Github issues](https://github.com/CPNV-ES-BI1-SBB/EXTERNAL-SOURCE-LOAD-DATALAKE/issues)
    * Pull requests are open to merge in the develop branch.
    * Release on the main branch we use GitFlow and not with GitHub release.
    * Issues are added to the [github issues page](https://github.com/CPNV-ES-BI1-SBB/EXTERNAL-SOURCE-LOAD-DATALAKE/issues)

### Commits
* [How to commit](https://www.conventionalcommits.org/en/v1.0.0/)
```shell
<type>(<scope>): <subject>
```

- **build**: Changes that affect the build system or external dependencies (e.g., npm, make, etc.).
- **ci**: Changes related to integration or configuration files and scripts (e.g., Travis, Ansible, BrowserStack, etc.).
- **feat**: Adding a new feature.
- **fix**: Bug fixes.
- **perf**: Performance improvements.
- **refactor**: Modifications that neither add a new feature nor improve performance.
- **style**: Changes that do not affect functionality or semantics (e.g., indentation, formatting, adding spaces, renaming a variable, etc.).
- **docs**: Writing or updating documentation.
- **test**: Adding or modifying tests.

examples :
```shell
feat(MyClass): add a button in the ...
````
```shell
feat(example.js): change name into username
````

---

## License
The project is released under a [MIT license](https://mit-license.org/)

---

## Contact
* If needed you can create an issue on GitHub we will try to respond as quickly as possible.
