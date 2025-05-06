# Observation App

This is an Angular 16 application that displays and manages observation data. The application features two main views:

1. Summary View: Displays observation data in a table format
2. Detailed View: Allows viewing and editing individual observations

## Features
- Material Design UI components
- Data management through JSON file
- Form validation
- Dynamic form generation based on data structure

## Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── summary-view/
│   │   └── detailed-view/
│   │──────── models/
│   │          └── observation.model.ts
│   │──────── services/
│   │          └── data.service.ts
│   └── assets/
│   |    └── data.json
│    |────────app-routing.module.ts
│    |────────app.component.html
│    |──────── app.component.ts
```

## Development
- The application uses Angular Material for UI components
- Data is stored in `src/assets/data.json`
- The service layer handles data operations
- Components are organized by feature
