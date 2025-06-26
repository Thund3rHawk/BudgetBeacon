# BudgetBeacon
BudgetBeacon is an AI-powered expense prediction and budgeting platform built with Bun, Express, MindsDB, and PostgreSQL. It enables users to create a knowledge base using AI models, predict expenses without writing SQL, and gain actionable insights with minimal setup.

---

## Features

- ✅ **AI Knowledge Base**: Create and manage a knowledge base using advanced AI models.
- ✅ **Natural Language Predictions**: Predict and analyze expenses without writing complex queries.
- ✅ **KB Indexing**: Efficiently index your knowledge base for fast retrieval and predictions.
- ✅ **AI Tables Integration**: Seamlessly integrate AI tables for enhanced data intelligence.
- ✅ **MindsDB Jobs**: Leverage MindsDB jobs for automated predictions and background tasks.
- ✅ **AI Agent Integration**: Create, interact with, and manage AI agents through dedicated API routes for enhanced automation and insights.
- ✅ **Metadata Columns**: Utilize metadata columns for enriched data context and analytics.

---

## API Endpoints
<details>
<summary>See All Endpoints</summary>

| Method | Endpoint                              | Description                                         |
|--------|---------------------------------------|-----------------------------------------------------|
| GET    | `/createDB`                           | Create a new database                               |
| POST   | `/enterdata`                          | Enter data into the database                        |
| GET    | `/checkData`                          | Retrieve all data from the database                 |
| GET    | `/deleteTable`                        | Delete a table from the database                    |
| GET    | `/minds/connectToPstgres`             | Connect MindsDB to PostgreSQL                       |
| GET    | `/minds/createAITables`               | Create AI tables in MindsDB                         |
| GET    | `/minds/createJob`                    | Create a new MindsDB job                            |
| GET    | `/minds/deleteJob`                    | Delete a MindsDB job                                |
| GET    | `/kb/create`                          | Create a new AI-powered knowledge base              |
| POST   | `/kb/enterdata`                       | Enter data into the knowledge base                  |
| GET    | `/kb/copyDataFromDB`                  | Copy data from the database to the knowledge base   |
| GET    | `/kb/getAllData`                      | Retrieve all data from the knowledge base           |
| POST   | `/kb/getFromPrompt`                   | Query the knowledge base using a custom prompt      |
| GET    | `/kb/createIndex`                     | Create an index for the knowledge base              |
| GET    | `/kb/delete`                          | Delete a knowledge base                             |
| GET    | `/agent/create`                       | Create a new AI agent                               |
| POST   | `/agent/ask`                          | Ask a question to the AI agent                      |
| GET    | `/agent/delete`                       | Delete an AI agent                                  |

</details>

---

## Setup Guide

1. **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/budgetbeacon.git
    cd budgetbeacon
    ```

2. **Start MindsDB with Docker**
    ```bash
    docker pull mindsdb/mindsdb
    docker run -p 47334:47334 mindsdb/mindsdb
    ```
    > MindsDB will be available at `http://localhost:47334`.

3. **Configure Environment Variables**
    - Create a `.env` file in the project root:
      ```
      MINDSDB_ENDPOINT=http://localhost:47334
      POSTGRES_URL=postgresql://user:password@localhost:5432/yourdb
      ```
    - Replace the values with your actual PostgreSQL credentials.

4. **Install Dependencies**
    ```bash
    bun install
    ```

5. **Run the Project**
    ```bash
    bun dev
    ```
    > The base API endpoint will be `http://localhost:{port}/api/v1/`.

---

## License

This project is licensed under the MIT License.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

