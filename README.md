🤖 AI Customer Support Chatbot with NLP
📝 Overview
This project is an AI-powered customer support chatbot that uses Natural Language Processing (NLP) to understand and respond to user queries. The system features:

💬 Conversational AI chatbot with semantic understanding

📁 File upload and analysis (PDF, DOCX, PPTX, TXT, CSV)

🔐 User authentication system

🌐 Wikipedia integration for general knowledge questions

🧠 Text summarization and keyword extraction

📊 Usage analytics dashboard

✨ Features
🧠 Intelligent Chatbot: Understands user intent using NLP and provides relevant responses

📂 Document Processing: Extracts and analyzes text from various file formats

🔐 User Authentication: Secure login/signup system with password hashing

🗃️ Knowledge Base: Predefined responses for common support questions

🌐 Wikipedia Integration: Fallback to Wikipedia for general knowledge questions

📝 Text Analysis: Provides summaries, keywords, and statistics for uploaded documents

⚙️ Prerequisites
Before running the application, ensure you have the following installed:

🐍 Python 3.8+

📦 pip (Python package manager)

🗃️ SQLite (for database)

The following Python packages (will be installed via requirements.txt):

🧪 Flask

👤 Flask-Login

🗄️ Flask-SQLAlchemy

🗣️ NLTK

🧬 spaCy

📄 pdfminer.six

📝 python-pptx

📃 python-docx

🧠 sentence-transformers

🌐 wikipedia-api

🧾 sumy

🛠️ Installation
1️⃣ Clone the repository:
bash
Copy
Edit
git clone https://github.com/yourusername/ai-customer-support.git
cd ai-customer-support
2️⃣ Create and activate a virtual environment:
bash
Copy
Edit
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
3️⃣ Install the required packages:
bash
Copy
Edit
pip install -r requirements.txt
4️⃣ Download NLTK data and spaCy model:
bash
Copy
Edit
python -m nltk.downloader punkt stopwords
python -m spacy download en_core_web_sm
5️⃣ Initialize the database:
bash
Copy
Edit
python create_db.py
🚀 Running the Application
Start the Flask development server:

bash
Copy
Edit
python app.py
Then open your web browser and go to:
🌐 http://localhost:5000

🧑‍💻 Usage
🏠 Home Page: Overview of the system features

✍️ Sign Up: Create a new account

🔐 Login: Access authenticated features

💬 Chatbot: Interact with the AI support assistant

📤 File Upload: Upload and analyze documents

📈 Analytics: View usage statistics (authenticated users)

ℹ️ About: Learn more about the system

📧 Contact: Get in touch with support

📄 File Upload Support
Supports the following file formats:

📕 PDF (.pdf)

📄 Word Documents (.docx)

📊 PowerPoint (.pptx)

📃 Plain Text (.txt)

🧾 CSV (.csv)

⚙️ Configuration
Customize by setting environment variables:

🔑 SECRET_KEY: Flask secret key for session security

🛢️ SQLALCHEMY_DATABASE_URI: Database connection string

📂 UPLOAD_FOLDER: Path for file uploads

Default configuration is located in app.py.

🛠️ Troubleshooting
❌ Missing Dependencies: Run pip install -r requirements.txt

📦 NLTK Data: Run python -m nltk.downloader punkt stopwords

🧬 spaCy Model: Run python -m spacy download en_core_web_sm

🗃️ Database Issues: Delete db.sqlite and rerun python create_db.py

📁 File Uploads: Ensure the upload directory exists and has proper permissions

