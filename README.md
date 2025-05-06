# Observation App

This is an Angular 16 application that displays and manages observation data. The application features two main views:

1. Summary View: Displays observation data in a table format
2. Detailed View: Allows viewing and editing individual observations

## Features

- Material Design UI components
- Responsive layout
- Data management through JSON file
- Form validation
- Dynamic form generation based on data structure

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Angular CLI (v16)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd observation-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Navigate to `http://localhost:4200` in your browser

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── summary-view/
│   │   └── detailed-view/
│   │   ├── models/
│   │   └── observation.model.ts
│   │   └── services/
│   │   └── observation.service.ts
│   └── assets/
│       └── data.json
```

## Development

- The application uses Angular Material for UI components
- Data is stored in `src/assets/data.json`
- The service layer handles data operations
- Components are organized by feature

## Building for Production

```bash
ng build --prod
```

## Running Tests

```bash
ng test
```

## License

This project is licensed under the MIT License.
