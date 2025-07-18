# Orchestration Library Front

A modern Angular 20 web application built with Nx workspace, Tailwind CSS, and Spartan UI components. This project provides a user interface for container orchestration and Kubernetes monitoring.

## Technology Stack

### Frontend Framework
- **Angular 20**: Modern web framework with standalone components, signals, and improved performance
- **TypeScript**: Strongly-typed programming language for better code quality

### Development Tools
- **Nx**: Smart, extensible build framework for monorepos
- **ESLint**: Code quality and style enforcement
- **Jest**: Unit testing framework
- **Cypress**: End-to-end testing framework

### UI Framework
- **Tailwind CSS**: Utility-first CSS framework
- **Spartan UI**: Component library based on Tailwind CSS with 44+ components
- **Lucide Icons**: Modern SVG icon library

### State Management
- **Angular Signals**: Reactive state management
- **RxJS**: Reactive programming library

### Internationalization
- **Transloco**: Internationalization library with runtime language switching

### Performance Optimization
- **SSR (Server-Side Rendering)**: For improved performance and SEO
- **Lazy Loading**: On-demand module loading
- **Angular Optimization**: Production build optimizations

## Project Structure

The project follows a modular architecture with clear separation of concerns:

### Root Structure

- `libs/ui`: Shared UI components and Spartan UI integration
- `public`: Static assets (images, icons, fonts)
- `src`: Application source code
- `i18n`: Internationalization files
- `docker`: Docker configuration files

### Source Code Structure (`src/app`)

#### Core

- `core/services`: Core services including ApiService, AuthService
- `core/guards`: Route guards for authentication and authorization
- `core/interceptors`: HTTP interceptors for authentication and error handling

#### Shared

- `shared/models`: Data models and interfaces
  - `kubernetes.model.ts`: Kubernetes resource models
  - `alerts.model.ts`: Alert system models
  - `workload-request-decision.model.ts`: Workload decision models
  - `workload-action.model.ts`: Workload action models
  - `api-base.model.ts`: Base API models and interfaces
- `shared/utils`: Utility functions and helpers
- `shared/pipes`: Custom Angular pipes
- `shared/directives`: Custom Angular directives

#### Components

- `components/app-table`: Reusable table component with filtering and pagination
- `components/app-header`: Application header with navigation and user controls
- `components/app-circle-progress`: Circular progress indicator
- `components/app-sidebar`: Application sidebar navigation
- `components/app-card`: Card component for displaying information

#### Layouts

- `layouts/main-layout`: Main application layout with header and sidebar
- `layouts/error-layout`: Layout for error pages

#### Pages

- `pages/cog`: COG system integration
- `pages/k8s`: Kubernetes dashboard
  - `clusters`: Cluster management
  - `pods`: Pod management
  - `nodes`: Node management
- `pages/emdc`: EMDC system integration
  - `workloads/request_decisions`: Workload request decisions
  - `workloads/actions`: Workload actions
  - `alerts`: Alert management
- `pages/error`: Error pages (404, 500)

## Module Structure

The application is organized into several logical modules:

### Core Module

Contains essential services and functionality that the application needs to operate:

- **ApiService**: Unified service for all API operations
- **AuthService**: Handles authentication and authorization
- **ConfigService**: Manages application configuration
- **LoggingService**: Centralized logging functionality

### Shared Module

Contains reusable components, directives, pipes, and models used throughout the application:

- **Models**: TypeScript interfaces and types
- **Pipes**: Custom Angular pipes for data transformation
- **Directives**: Custom Angular directives for DOM manipulation
- **Utils**: Utility functions and helpers

### Feature Modules

#### Kubernetes Module

Handles all Kubernetes-related functionality:

- **Clusters Component**: Displays and manages Kubernetes clusters
- **Pods Component**: Displays and manages Kubernetes pods
- **Nodes Component**: Displays and manages Kubernetes nodes

#### EMDC Module

Handles all EMDC-related functionality:

- **Workloads Module**:
  - **Request Decisions Component**: Manages workload request decisions
  - **Actions Component**: Manages workload actions
- **Alerts Component**: Manages alerts and notifications

#### COG Module

Handles all COG-related functionality:

- **COG Component**: Integrates with the COG system

## API Architecture

The project features a refactored API layer with specialized services for better maintainability and type safety:

### API Service

The application uses a single, unified **ApiService** that handles all API operations based on OpenAPI specification:

- **Kubernetes API**: pods, nodes, cluster info, token management
- **Tuning Parameters API**: parameter optimization operations
- **Workload Request Decision API**: decision management operations
- **Alerts API**: alert creation and retrieval operations
- **Workload Action API**: action tracking and management operations
- **Dummy ACES UI API**: utility operations

### Architecture

**Clean Architecture:**
- ✅ Single unified API service (no inheritance complexity)
- ✅ Methods organized by OpenAPI tags/groups
- ✅ Direct endpoint mapping from OpenAPI specification
- ✅ Built-in loading state management
- ✅ Automatic error handling and token management
- ✅ Backward compatibility aliases for existing code

### Usage

**New API Usage:**
```typescript
import { ApiService } from '@core/services';

export class MyComponent {
  private apiService = inject(ApiService);

  loadData() {
    // Kubernetes operations (direct OpenAPI mapping)
    this.apiService.listPods({ namespace: 'default' }).subscribe(pods => {
      console.log('Pods:', pods);
    });

    // Alert management
    this.apiService.getAlerts({ skip: 0, limit: 10 }).subscribe(alerts => {
      console.log('Alerts:', alerts);
    });

    // Workload operations
    this.apiService.getWorkloadActions({ 
      action_type: 'Create' 
    }).subscribe(actions => {
      console.log('Actions:', actions);
    });

    // Backward compatibility (still works)
    this.apiService.getPods().subscribe(pods => {
      console.log('Legacy method still works:', pods);
    });
  }
}
```

## Getting Started

### Prerequisites

- Node.js (LTS version)
- pnpm package manager

### Installation

```bash
# Install dependencies
pnpm install
```

## Development

```bash
# Start development server
pnpm start
```

The application will be available at `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Building

```bash
# Build the project
pnpm build
```

The build artifacts will be stored in the `dist/` directory.

## Server-Side Rendering

```bash
# Serve the SSR version
pnpm serve:ssr
```

## Testing

```bash
# Run unit tests
pnpm test
```

## Additional Commands

```bash
# Watch mode for development
pnpm watch

# Extract i18n messages
nx extract-i18n
```

## Features

- **Modern Angular Architecture**:
  - Standalone components for better modularity
  - Signal-based state management
  - Lazy loading for improved performance
  - Server-side rendering (SSR) support

- **UI Framework**:
  - Responsive design with Tailwind CSS
  - Spartan UI component library (44+ components)
  - Lucide Icons for modern iconography
  - Accessibility-focused UI components

- **Internationalization**:
  - Multi-language support with Transloco
  - Separate translation files for each language
  - Runtime language switching

- **API Integration**:
  - Unified API service for all backend operations
  - OpenAPI-based method naming and typing
  - Automatic error handling and loading states
  - Token-based authentication

- **Kubernetes Features**:
  - Pod and node management
  - Cluster monitoring
  - Resource tracking
  - Integration with external Kubernetes dashboard

- **Workload Management**:
  - Request decision tracking
  - Action monitoring
  - Resource demand analysis
  - Elastic workload support

- **Alert System**:
  - Real-time alert notifications
  - Alert categorization (Abnormal, Network-Attack, Other)
  - Alert statistics and summaries

## Docker Deployment

This project supports containerization with Docker for easy deployment.

### Building the Docker Image

```bash
# Build the Docker image
docker build -t orchestrator-ui:latest .
```

### Running with Docker

```bash
# Run the container
docker run -p 4000:4000 orchestrator-ui:latest
```

The application will be available at `http://localhost:4000/`.

### Using Docker Compose

```bash
# Start the application with Docker Compose
docker-compose up -d

# Stop the application
docker-compose down
```

## Docker Architecture

The Docker setup uses a multi-stage build process:

1. **Build Stage**: Compiles the Angular application with SSR support
2. **Runtime Stage**: Runs the SSR application using Node.js

The container exposes port 4000 for the Node.js server that handles SSR.

## API Documentation

### Available API Methods (OpenAPI Based)

| Category | Key Methods | Purpose |
|----------|-------------|---------|
| **Kubernetes** | `listPods()`, `listNodes()`, `getClusterInfo()`, `getK8sToken()` | Cluster operations and management |
| **Tuning Parameters** | `createTuningParameter()`, `getTuningParameters()`, `getLatestTuningParameters()` | Parameter optimization |
| **Workload Decisions** | `createWorkloadDecision()`, `getWorkloadDecisions()`, `updateWorkloadDecision()` | Decision tracking and management |
| **Alerts** | `createAlert()`, `getAlerts()` | Alert creation and management |
| **Workload Actions** | `createWorkloadAction()`, `getWorkloadActions()`, `updateWorkloadAction()` | Action tracking and execution |
| **Authentication** | `isAuthenticated()`, `logout()` | Session management |

### API Architecture

**OpenAPI-First Design:**
- ✅ Direct mapping from OpenAPI 3.1 specification
- ✅ Method names match OpenAPI operationIds
- ✅ Request/Response types match OpenAPI schemas
- ✅ Built-in parameter validation
- ✅ Automatic error handling (401, 403, 404, 422, 500)
- ✅ Loading state management (`loading$` observable)

### Backward Compatibility

Legacy method names are preserved as aliases:
```typescript
// New methods (recommended)
apiService.listPods()
apiService.getWorkloadDecisions()

// Legacy methods (still work)
apiService.getPods()
apiService.getPodRequestDecisions()
```

### Usage Guide

- **New Development**: Use OpenAPI-based method names
- **Legacy Code**: Continues to work without changes
- **Type Safety**: Full TypeScript support for all operations
- **Error Handling**: Centralized error management
- **Loading States**: Built-in loading indicators

## Application Routing

The application uses Angular's router with lazy loading for optimal performance:

### Main Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/cog` | `CogComponent` | Integration with COG system |
| `/k8s` | `K8sComponent` | Kubernetes dashboard |
| `/emdc/workloads/request_decisions` | `RequestDecisionsComponent` | Workload request decisions |
| `/emdc/workloads/actions` | `ActionsComponent` | Workload actions |
| `/emdc/alerts` | `AlertsComponent` | Alert management |
| `/error/404` | `NotFoundComponent` | 404 error page |
| `/error/500` | `ServerErrorComponent` | 500 error page |

### Layout Structure

The application uses two main layouts:

1. **MainLayoutComponent**: Used for all main application routes
   - Includes sidebar navigation
   - Responsive design with collapsible sidebar
   - User authentication controls

2. **ErrorLayoutComponent**: Used for error pages
   - Simplified layout for error messages
   - Navigation back to main application

## Data Models

### Kubernetes Models

The application uses strongly-typed interfaces for Kubernetes resources:

- `K8sPod`: Pod information including containers and resources
- `K8sNode`: Node information including capacity and conditions
- `K8sContainer`: Container details including image and state
- `K8sResourceRequirements`: CPU and memory requirements
- `K8sClusterInfo`: Cluster-wide information

### Alert Models

Interfaces for the alert system:

- `AlertType`: Enum for alert categories (Abnormal, Network-Attack, Other)
- `AlertResponse`: Alert details including type and description
- `AlertStatistics`: Counts of alerts by type and status
- `AlertSummary`: Overview of critical, warning, and info alerts

### Workload Models

Interfaces for workload management:

- `WorkloadRequestDecision`: Decision details for workload requests
- `WorkloadAction`: Action details for workload operations
- `ResourceDemandSummary`: Summary of resource demands

## Development Process

### Code Standards

This project follows strict coding standards to ensure maintainability and consistency:

- **TypeScript**: Strict mode enabled
- **ESLint**: Custom ruleset for code quality
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks for code quality checks

### Branching Strategy

- **main**: Production-ready code
- **develop**: Integration branch for feature development
- **feature/***:  Feature branches
- **bugfix/***:  Bug fix branches
- **release/***:  Release preparation branches

### Continuous Integration

The project uses CI/CD pipelines for automated testing and deployment:

- **Unit Tests**: Automated testing with Jest
- **E2E Tests**: Automated testing with Cypress
- **Build Verification**: Ensures production builds are successful
- **Deployment**: Automated deployment to staging and production environments

### Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Learn More

- [Angular Documentation](https://angular.dev/)
- [Nx Documentation](https://nx.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Spartan UI Documentation](https://spartan.ng/)
- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [RxJS Documentation](https://rxjs.dev/)
- [Transloco Documentation](https://ngneat.github.io/transloco/)

## Future Development

The project roadmap includes the following planned enhancements:

### Short-term Goals

- **Performance Optimization**: Further improve application loading and rendering performance
- **Expanded Test Coverage**: Increase unit and e2e test coverage to 80%+
- **Enhanced Accessibility**: Implement WCAG 2.1 AA compliance across all components
- **Additional Kubernetes Features**: Expand Kubernetes management capabilities

### Medium-term Goals

- **Advanced Analytics**: Implement dashboard for system performance metrics
- **Expanded Internationalization**: Add support for additional languages
- **Mobile Optimization**: Enhance mobile user experience
- **Dark Mode**: Implement comprehensive dark mode support

### Long-term Goals

- **AI-assisted Operations**: Implement AI-based recommendations for system optimization
- **Predictive Analytics**: Add predictive capabilities for resource planning
- **Integration Expansion**: Support for additional container orchestration platforms
- **Plugin Architecture**: Develop extensible plugin system for custom functionality
