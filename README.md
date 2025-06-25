# BudgetBeacon
BudgetBeacon is an AI-powered expense prediction and budgeting platform built with Bun, Express, MindsDB, and PostgreSQL. It enables users to create a knowledge base using AI models, predict expenses without writing SQL, and gain actionable insights with minimal setup.

---

## 🚀 Features

- ✅ **AI Knowledge Base**: Create and manage a knowledge base using advanced AI models.
- ✅ **Natural Language Predictions**: Predict and analyze expenses without writing complex queries.
- ✅ **KB Indexing**: Efficiently index your knowledge base for fast retrieval and predictions.
- ✅ **AI Tables Integration**: Seamlessly integrate AI tables for enhanced data intelligence.
- ✅ **MindsDB Jobs**: Leverage MindsDB jobs for automated predictions and background tasks.
- ✅ **Metadata Columns**: Utilize metadata columns for enriched data context and analytics.

---

## 🛣️ API Endpoints

| Method | Endpoint                | Description                                 |
|--------|------------------------|---------------------------------------------|
| POST   | `/kb/create`           | Create a new AI-powered knowledge base      |
| POST   | `/kb/predict`          | Predict data using the knowledge base       |
| GET    | `/kb/index`            | Retrieve the knowledge base index           |
| POST   | `/ai-table/create`     | Create and integrate a new AI table         |
| GET    | `/jobs`                | List all MindsDB jobs                       |
| GET    | `/metadata/columns`    | Get metadata columns for your tables        |

---

## ⚙️ Setup Guide

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

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

