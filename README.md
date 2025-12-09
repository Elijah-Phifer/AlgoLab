# AlgoLab

An interactive online learning platform for algorithms and data structures featuring block-based coding with Blockly.

## Features

- **Learning Modules**: Interactive modules covering algorithms, data structures, and problem-solving
- **Block-Based Coding**: Visual programming using Blockly - perfect for beginners
- **Code Sandbox**: Experiment with code in a safe environment
- **Progress Tracking**: Save and track your learning progress
- **Modern Tech Stack**: React frontend with .NET backend

## Tech Stack

### Frontend
- React with TypeScript
- Bootstrap 5 & React-Bootstrap for UI
- React Router for navigation
- Blockly for visual programming
- Bootstrap Icons

### Backend
- .NET 10.0 Web API
- RESTful API architecture
- Swagger/OpenAPI documentation
- CORS enabled for local development

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- .NET SDK 10.0
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Elijah-Phifer/AlgoLab.git
cd AlgoLab
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend/AlgoLabAPI
dotnet restore
```

### Running the Application

1. Start the backend API:
```bash
cd backend/AlgoLabAPI
dotnet run
```
The API will be available at `http://localhost:5000`

2. In a new terminal, start the frontend:
```bash
cd frontend
npm start
```
The application will open at `http://localhost:3000`

### API Documentation

When the backend is running in development mode, you can access the Swagger UI at:
`http://localhost:5000/swagger`

## Project Structure

```
AlgoLab/
├── backend/
│   └── AlgoLabAPI/
│       ├── Controllers/      # API controllers
│       ├── Models/           # Data models
│       └── Program.cs        # Application entry point
└── frontend/
    └── src/
        ├── components/       # React components
        ├── services/         # API service layer
        └── types/           # TypeScript type definitions
```

## Available API Endpoints

### Modules
- `GET /api/modules` - Get all learning modules
- `GET /api/modules/{id}` - Get a specific module
- `GET /api/modules/category/{category}` - Get modules by category
- `POST /api/modules` - Create a new module
- `PUT /api/modules/{id}` - Update a module
- `DELETE /api/modules/{id}` - Delete a module

### Progress
- `GET /api/progress/user/{userId}` - Get user's progress
- `GET /api/progress/user/{userId}/module/{moduleId}` - Get progress for a specific module
- `POST /api/progress` - Save progress

### Sandbox
- `POST /api/sandbox/submit` - Submit code from sandbox
- `GET /api/sandbox/user/{userId}` - Get user's submissions
- `GET /api/sandbox/{id}` - Get a specific submission

## Development

### Frontend Development
The frontend uses React with TypeScript and Bootstrap for styling. Key components include:
- **Navigation**: Top navigation bar
- **Home**: Landing page with feature overview
- **ModulesList**: Browse available learning modules
- **ModuleDetail**: View module content with integrated Blockly workspace
- **Sandbox**: Free-form coding environment

### Backend Development
The backend is a .NET Web API with:
- RESTful endpoints for modules, progress, and code submissions
- In-memory data storage (for demo purposes)
- CORS configuration for local development
- Swagger documentation

### Adding New Modules
In a production environment, modules would be stored in a database. Currently, they're defined in `ModulesController.cs`. To add a new module, add it to the `_modules` list in the controller.

## Future Enhancements

- User authentication and authorization
- Database integration (SQL Server/PostgreSQL)
- Code execution and validation
- Achievement system
- Social features (sharing, commenting)
- Mobile responsive design improvements
- Internationalization (i18n)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [Blockly](https://developers.google.com/blockly) - Google's visual programming library
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [.NET](https://dotnet.microsoft.com/) - Free, open-source developer platform