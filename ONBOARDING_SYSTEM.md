# Onboarding System Documentation

The VMotiv Notes application includes a comprehensive onboarding flow for new users to set up their profile, preferences, and learn about the key features.

## Architecture Overview

### Types (`types/index.ts`)
- `OnboardingStep`: Union type for the four onboarding steps ('welcome', 'profile', 'preferences', 'confirmation')
- `OnboardingData`: Interface containing user data collected during onboarding (name, school, summary mode, notifications)
- `TourTooltip`: Interface defining tooltip structure for interactive tours

### Core Hook (`hooks/useOnboarding.ts`)
The main hook that manages:
- Onboarding state and step navigation
- localStorage persistence for completion status and user data
- Syncing with the existing `useUserSettings` hook for data consistency
- Methods for navigation, completion, and resuming onboarding

Storage keys:
- `vmotiv-onboarding-complete`: Boolean flag for completion status
- `vmotiv-onboarding-data`: JSON string of collected user data

### Components (`components/onboarding/`)

#### SetupWizard.tsx
Main wizard component that:
- Renders the appropriate step based on current state
- Displays progress indicators and step navigation
- Handles step transitions with validation

#### Individual Step Components
- **WelcomeHero.tsx**: Introduction screen with feature highlights
- **ProfileStep.tsx**: Collects name and school information with validation
- **PreferenceStep.tsx**: Sets summary mode (9th-grade/SAT) and notification preferences
- **ConfirmationStep.tsx**: Reviews collected data and completes setup

#### Tour Components
- **TourOverlay.tsx**: Interactive tooltip overlay that highlights UI elements
- **TooltipCoachMarks.tsx**: Manages tour state, auto-starts for new users, and tracks completion

### Pages
- **`app/onboarding/page.tsx`**: Main onboarding page that integrates the wizard and handles redirects

### Integration Points

#### Home Page (`app/page.tsx`)
- Includes `TooltipCoachMarks` for first-time user tours
- Adds `data-tour` attributes to key elements (upload, library)

#### Sidebar (`components/Sidebar.tsx`)
- Shows "Complete Setup" pill when onboarding is incomplete
- Includes tour data attributes for Settings link
- Allows resuming onboarding from the sidebar

#### Settings Page (`app/settings/page.tsx`)
- Automatically displays data synced from onboarding
- Uses existing `useUserSettings` hook for consistency

## User Flow

1. **First Visit**: New users see the onboarding flow or can navigate to `/onboarding`
2. **Welcome Step**: Introduction to VMotiv Notes features
3. **Profile Step**: Enter name and school (required fields)
4. **Preferences Step**: Choose summary mode and notification settings
5. **Confirmation Step**: Review settings and complete setup
6. **Post-Onboarding**: Redirected to `/upload` with tour auto-starting
7. **Tour**: Interactive tooltips highlight key features (upload, library, settings)
8. **Resume**: Users can resume incomplete onboarding via sidebar pill

## Data Persistence

- All onboarding data is stored in localStorage for immediate access
- Data is automatically synced with the user settings store
- Completion flag prevents re-triggering onboarding
- Tour completion is tracked separately to avoid repetition

## Customization

### Adding New Steps
1. Update `OnboardingStep` type in `types/index.ts`
2. Add step to `STEPS` array in `SetupWizard.tsx`
3. Create new step component following existing patterns
4. Update step titles and navigation logic

### Modifying Tour
1. Edit `DEFAULT_TOOLTIPS` in `TooltipCoachMarks.tsx`
2. Add `data-tour` attributes to target elements
3. Adjust positioning and content as needed

### Styling
All components use the existing design system:
- Tailwind CSS classes following project conventions
- shadcn/ui components for consistency
- Responsive design with mobile support

## Testing

The onboarding system can be tested by:
1. Clearing localStorage to simulate first-time user
2. Navigating to `/onboarding` directly
3. Testing each step's validation and navigation
4. Verifying data sync with settings page
5. Testing tour overlay functionality
6. Checking resume functionality from sidebar

## Accessibility

- All form inputs have proper labels and semantic HTML
- Keyboard navigation supported throughout the flow
- Screen reader friendly with appropriate ARIA labels
- High contrast and readable font sizes maintained