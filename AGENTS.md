# AGENTS.md

This file contains the instructions and context that all AI coding agents must follow when working on the LIVING SPACE project.

Read this file before making any changes to the codebase.

---

# 1. PROJECT OVERVIEW

## Project Name

**LIVING SPACE**

## Purpose

LIVING SPACE is a property website being developed for a real estate/property company.

The website's primary purpose is **property discovery and lead generation**.

A user should be able to:

1. Open the website.
2. Browse available properties.
3. Search or filter properties.
4. Open a property's details.
5. Review the property's information and images.
6. Express interest in the property.
7. Submit their contact information.
8. Allow LIVING SPACE to contact them.

The core user journey is:

**Discover → Browse → View Property → Enquire → Contact**

Do not turn the project into a complex marketplace unless explicitly instructed.

---

# 2. DEVELOPMENT PHILOSOPHY

The project should prioritize:

* Simplicity
* Professionalism
* Trust
* Usability
* Performance
* Mobile responsiveness
* Maintainability
* Clear user flows

The website represents a real business, so avoid experimental UI or unnecessary technical complexity.

Every feature should have a clear purpose.

Do not add features merely because they are technically interesting.

---

# 3. IMPORTANT AGENT RULES

Before modifying anything:

1. Read this file.
2. Inspect the existing project structure.
3. Inspect the relevant source files.
4. Understand how the existing implementation works.
5. Identify dependencies between the requested change and existing functionality.
6. Make the smallest reasonable change that solves the task.

Do not:

* Rewrite working code unnecessarily.
* Delete existing functionality without explicit instruction.
* Replace the project's architecture without a reason.
* Introduce unnecessary dependencies.
* Change APIs without checking their consumers.
* Invent business requirements.
* Hardcode secrets.
* Modify unrelated files without a reason.

Preserve existing functionality unless the task explicitly requires changing it.

---

# 4. TECH STACK

Use the technologies already present in the repository.

The intended stack is:

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express

### Database

* MongoDB
* MongoDB Atlas

### Version Control

* Git
* GitHub

Do not introduce another framework or replace an existing technology unless explicitly requested or there is a strong technical reason.

Before adding a dependency, check whether the existing stack can accomplish the task without it.

---

# 5. PROJECT STRUCTURE

The project may evolve over time.

Preferred structure:

```text
/
├── client/                 # Frontend application
├── server/                 # Backend application
├── docs/                   # Technical/product documentation
├── AGENTS.md               # AI agent instructions
├── README.md               # Human-facing project documentation
├── .gitignore
└── .env                    # Local environment variables
```

Do not force this structure if the repository already uses a different valid structure.

Follow the existing project's conventions.

---

# 6. PRODUCT STRUCTURE

The website should generally contain the following areas.

## Homepage

The homepage should communicate:

* What LIVING SPACE does
* Available/featured properties
* Relevant locations
* A clear way to browse properties
* A clear way to contact the company

The homepage should not overwhelm the user.

---

## Property Listing

Users should be able to browse available properties.

Property cards should provide the most important information at a glance, such as:

* Property image
* Property title
* Location
* Price
* Property type
* BHK/rooms where applicable
* Area
* Availability/status

A property card should provide a clear action such as:

**View Details**

---

## Property Details

The property details page should provide more complete information.

Depending on the property, this may include:

* Property title
* Images/gallery
* Location
* Price
* Property type
* BHK
* Bathrooms
* Area
* Amenities
* Description
* Availability
* Other relevant property information

The page must provide a clear enquiry/contact action.

Example:

**I'm Interested**

or

**Enquire Now**

---

## Enquiry Flow

The enquiry flow should be simple.

A user may provide:

* Name
* Phone number
* Email
* Property
* Message

The property being enquired about must be identifiable.

After successful submission, clearly communicate that the enquiry was received.

The UI must also handle:

* Loading state
* Validation errors
* Submission errors
* Successful submission

---

# 7. PROPERTY DATA

Every property must have a unique identifier.

Use the format:

```text
LS-001
LS-002
LS-003
```

Example:

```json
{
  "propertyId": "LS-001",
  "title": "3 BHK Premium Apartment",
  "location": "Dwarka, Delhi",
  "type": "Apartment",
  "bhk": 3,
  "area": 1450,
  "price": 12500000,
  "status": "available"
}
```

Do not use the property title as the unique identifier.

Possible property statuses:

```text
available
sold
rented
unavailable
```

The UI must not incorrectly represent unavailable properties as available.

---

# 8. ENQUIRY DATA

An enquiry should reference the property using its unique property ID.

Example:

```json
{
  "name": "Example User",
  "phone": "XXXXXXXXXX",
  "email": "example@email.com",
  "propertyId": "LS-001",
  "message": "I am interested in viewing this property."
}
```

The backend must validate submitted data.

Never rely exclusively on frontend validation.

Treat all user-submitted data as untrusted input.

---

# 9. FRONTEND RULES

## Components

Use reusable components where appropriate.

Avoid:

* Huge monolithic components
* Duplicated UI code
* Unnecessary abstraction
* Components that contain unrelated responsibilities

Use descriptive names.

Examples:

```text
Navbar
PropertyCard
PropertyGrid
PropertyDetails
PropertyGallery
EnquiryForm
Footer
```

Follow the naming conventions already used by the project.

---

## Styling

The visual identity should feel:

* Modern
* Professional
* Clean
* Trustworthy
* Spacious
* Easy to navigate

Prioritize the property itself rather than decorative effects.

Avoid excessive:

* Gradients
* Animations
* Glassmorphism
* Floating elements
* Decorative effects
* Unnecessary transitions

Animations should have a purpose.

---

## Responsive Design

The website must work properly on:

* Mobile
* Tablet
* Laptop
* Desktop

Do not design only for desktop.

Check layouts for narrow screens whenever modifying UI.

---

# 10. FORMS

Forms must provide clear feedback.

Every important form should account for:

```text
Idle
↓
User enters information
↓
Validation
↓
Submitting
↓
Success / Error
```

Validation messages should be understandable to normal users.

Do not expose internal errors, stack traces, database errors, or sensitive information to users.

---

# 11. BACKEND RULES

Backend code should:

* Validate requests.
* Handle errors.
* Use appropriate HTTP status codes.
* Keep API responses predictable.
* Avoid exposing sensitive information.
* Keep database logic organized.
* Avoid unnecessary database queries.
* Sanitize/validate user input appropriately.

Do not trust values supplied by the frontend.

---

# 12. API RULES

Keep API behavior consistent.

When modifying an endpoint:

1. Find all frontend/backend consumers.
2. Check existing request formats.
3. Check existing response formats.
4. Update consumers if necessary.
5. Do not silently break existing functionality.

Prefer clear REST-style endpoints where appropriate.

Example:

```text
GET    /api/properties
GET    /api/properties/:propertyId
POST   /api/enquiries
```

The exact API structure should follow the implementation already present in the repository.

---

# 13. DATABASE RULES

MongoDB is the intended database.

Database schemas should be designed around the actual business requirements.

Avoid storing duplicated information when it is unnecessary.

Property IDs must remain stable.

Do not casually rename database fields because doing so may break existing data or API consumers.

If a schema change is necessary, inspect the impact before implementing it.

---

# 14. SECURITY

Never commit secrets.

Never place secrets directly in source code.

Do not commit:

```text
.env
API keys
Database credentials
Passwords
Private tokens
Authentication secrets
```

Use environment variables.

Frontend code must never contain server-side secrets.

Do not expose MongoDB credentials or other backend configuration to the client.

---

# 15. USER DATA

Enquiries contain user-provided contact information.

Handle this data carefully.

Do not:

* Log unnecessary personal information.
* Expose enquiry information through public endpoints.
* Return private enquiry data to unauthorized clients.
* Put personal information into frontend source code.

Only collect information that is actually required for the enquiry process.

---

# 16. IMAGES

Property images are an important part of the product.

Images should:

* Load efficiently.
* Maintain appropriate aspect ratios.
* Work on mobile.
* Have useful alt text where appropriate.
* Avoid unnecessarily large files when possible.

Do not permanently hardcode temporary development images into the production property data unless explicitly intended.

---

# 17. ACCESSIBILITY

Use semantic HTML where possible.

Important requirements include:

* Meaningful button labels
* Form labels
* Keyboard accessibility
* Useful image alt text
* Sufficient readable contrast
* Visible focus states
* Logical heading hierarchy

Do not use a `<div>` as a button when a real `<button>` is appropriate.

---

# 18. PERFORMANCE

Avoid unnecessary performance problems.

When implementing features:

* Avoid unnecessary re-renders.
* Avoid unnecessarily large dependencies.
* Optimize large images where practical.
* Avoid making duplicate API requests.
* Do not fetch data repeatedly when it can reasonably be reused.

Do not prematurely optimize simple code.

Correctness and maintainability come first.

---

# 19. ERROR HANDLING

Never allow avoidable errors to silently fail.

Frontend should provide user-friendly error messages.

Backend should provide useful developer-facing errors without exposing sensitive internals.

When debugging:

* Identify the actual root cause.
* Fix the underlying issue.
* Do not hide errors simply to make the UI appear functional.

---

# 20. GIT

Keep commits focused.

Preferred commit style:

```text
feat: add property detail page
feat: add enquiry form
feat: add property filtering
fix: validate enquiry phone number
fix: handle unavailable properties
refactor: extract property card component
style: improve mobile property layout
```

Do not commit:

* Secrets
* Temporary files
* Debug files
* Unnecessary generated files
* Local environment configuration

Do not rewrite Git history unless explicitly requested.

---

# 21. TESTING AND VERIFICATION

After making changes:

1. Run the relevant tests.
2. Run the frontend build if applicable.
3. Check for lint/type errors if configured.
4. Check the affected user flow.
5. Check that existing functionality still works.
6. Review the final diff.

Do not claim a task is complete if the implementation has known errors.

If something could not be tested, explicitly state what could not be verified.

---

# 22. AGENT COMMUNICATION

When completing a task, report:

### Changes Made

Briefly describe what was changed.

### Files Changed

List important files modified.

### Verification

Mention tests, builds, or other checks performed.

### Remaining Issues

Mention anything that still needs attention.

Do not provide unnecessary commentary.

---

# 23. HANDLING AMBIGUOUS REQUESTS

If the requested change is small and the intended behavior is obvious, implement it.

If ambiguity could affect:

* Database structure
* Security
* API compatibility
* Existing functionality
* Major UI architecture
* Business logic

ask for clarification before making a major change.

Do not invent business rules.

When possible, choose the smallest reversible implementation.

---

# 24. CURRENT PROJECT STATE

This section should be updated as development progresses.

## Completed

* [ ] Project setup
* [ ] Homepage
* [ ] Navigation
* [ ] Property listing
* [ ] Property cards
* [ ] Property search/filter
* [ ] Property details
* [ ] Property gallery
* [ ] Enquiry form
* [ ] Backend API
* [ ] MongoDB integration
* [ ] Admin dashboard
* [ ] Property management
* [ ] Enquiry management
* [ ] Production deployment

## Current Task

Update this section whenever the primary development task changes.

```text
Supabase Auth setup and the initial admin login flow are complete.
```

---

# 25. IMPORTANT ARCHITECTURAL DECISIONS

Record decisions here that future agents should not reverse without a reason.

Current decisions:

* The product is primarily a property discovery and lead-generation website.
* Property IDs use the `LS-XXX` format.
* Enquiries reference properties using `propertyId`.
* Property availability is represented using a status field.
* Frontend and backend should remain logically separated.
* Sensitive configuration must use environment variables.
* Existing architecture should be preserved unless a change is explicitly required.

Add important decisions here as the project evolves.

---

# 26. SOURCE OF TRUTH

When information conflicts:

1. Explicit user instructions for the current task take priority.
2. Existing working code should be preserved unless the current task requires modification.
3. This `AGENTS.md` provides project-wide development rules.
4. Other project documentation provides deeper technical details.
5. Do not assume undocumented behavior is required.

When making a significant architectural decision, document it so future agents do not have to rediscover it.

---

# 27. FINAL RULE

**Build what was requested, preserve what already works, keep the implementation simple, and leave the codebase in a better state than you found it.**
