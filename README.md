# BudgetBuddy

## Overview
**BudgetBuddy** is an expense tracking web application that allows users to set and adjust their budget goals. Users can input their expenses, which will be tracked and displayed through a graph, showing their progress toward their monthly budget limit. The app includes features for entering expenses via a form, searching past purchases, and categorizing expenses to maintain an organized record of financial transactions.

## Features
- Set and adjust budget goals
- Track expenses and view progress via a graphical display
- Enter expenses through a form
- Search past purchases
- Categorize expenses for organized financial management

## Tech Stack
**Back-end:** Express.js, Node.js, Microsoft SQL Database  
**Front-end:** React.js

## Installation and Setup

### Prerequisites
1. **Microsoft SQL Server**: Download and install the free Developer edition [here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).
2. **SQL Server 2022 Manager**: Install for Windows, Linux, or Docker containers.

### Steps to Replicate the Project
1. **Setup SQL Server Database**:
    - Open SQL Server 2022 Manager and create a new query.
    - Copy and paste the code from `Database-structure-SQL/budget_structure.sql` and execute the query to create the `BUDGET` database.

2. **Clone the Repository**:
    ```bash
    git clone https://github.com/JennMena/CS35LProject
    cd CS35LProject
    ```

3. **Configure Database Credentials**:
    - Modify `constant.js` to include your database information and credentials.

4. **Setup Backend**:
    ```bash
    cd Backend
    npm install
    nodemon ./src/app.js
    ```

5. **Setup Frontend**:
    ```bash
    cd ../Frontend
    npm install
    npm start
    ```

## Usage
Once the setup is complete, the project should be fully connected and operational. Create your user account and start managing your expenses!


