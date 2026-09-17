# Oluwanifemi Oladimeji - Portfolio Website

## Overview

This is a personal portfolio website for Oluwanifemi Oladimeji, built as a single-page application (SPA) using vanilla HTML, CSS, and JavaScript. The portfolio showcases sections including Home, About, Projects, Videos, Code, Services, and Contact. The website features a modern, interactive design with custom cursor effects, smooth scrolling navigation, and a responsive mobile-first layout.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Single-Page Application (SPA) Design**
- The application uses a single HTML page with multiple sections that are navigated via anchor links
- Smooth scrolling behavior is implemented to create seamless transitions between sections
- All interactivity is handled through vanilla JavaScript without any frameworks or build tools

**Navigation System**
- Hamburger menu for mobile devices using a checkbox-based toggle mechanism
- Active section highlighting that updates based on scroll position
- Custom scroll wheel navigation with dot indicators for quick section access
- Menu overlay for mobile devices to improve UX when the menu is open

**Custom UI Components**
- Custom cursor with hover effects and blend modes for visual appeal
- Scroll progress indicator to show page position
- Touch device detection to adapt interactions for mobile users
- Responsive breakpoints for mobile-first design (max-width: 600px)

**Styling Approach**
- CSS-only implementations for interactive elements (checkbox-based menu toggle)
- Google Fonts (Poppins) for typography
- Dark theme with a color scheme based on #1f242d background and blue accent colors
- Box icons and Font Awesome for iconography
- Mix-blend-mode effects for the custom cursor to create visual interest

**Rationale**: The vanilla JavaScript approach was chosen for simplicity and to avoid build tooling complexity. This makes the portfolio lightweight, fast-loading, and easy to deploy on any static hosting platform. The SPA pattern provides a modern user experience while maintaining simplicity in the codebase.

**Pros**:
- No build process required
- Fast load times
- Easy to maintain and deploy
- Works on any web server

**Cons**:
- Limited scalability for complex features
- Manual DOM manipulation can become verbose
- No component reusability patterns

### File Structure

**Core Files**
- `index.html` - Main HTML structure with navigation and section markers
- `style.css` - Complete styling including responsive design and custom cursor
- `script.js` - Interactive behaviors including smooth scrolling, active nav highlighting, and mobile menu

**Assets Directory**
- `attached_assets/` - Contains duplicate/backup versions of core files and package configuration
- Image assets referenced (e.g., `minato_normal_select.png` for favicon)

**Incomplete Implementation Note**: Both `script.js` and the attached assets version contain incomplete code (menu overlay click handler is cut off), suggesting the repository may be in active development.

### Responsive Design Strategy

**Mobile-First Approach**
- Touch device detection to apply specific styling classes
- Hamburger menu that overlays the main content on mobile
- Flexible layouts using media queries
- Font size and layout adjustments for screens under 600px

**Desktop Enhancements**
- Custom cursor effects (disabled on touch devices)
- Full navigation bar visible at all times
- Enhanced scroll-based interactions

## External Dependencies

### Third-Party Libraries

**CSS Libraries**
1. **Boxicons v2.1.4** (`https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css`)
   - Purpose: Icon library for UI elements
   - Delivery: CDN

2. **Font Awesome v6.4.0** (`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`)
   - Purpose: Icon library for menu icons (hamburger, close button)
   - Delivery: CDN

3. **Google Fonts - Poppins** (`https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap`)
   - Purpose: Typography across the entire site
   - Weights used: 300, 400, 500, 600, 700, 800, 900
   - Delivery: CDN

### External Services

No external APIs, backend services, or databases are currently integrated. The portfolio is completely static and client-side rendered.

### Package Management

The repository includes a minimal `package.json` configuration:
- Project name: "my-v0-project"
- Version: 0.1.0
- No dependencies listed
- Single build script that echoes "no build script"

This suggests the project may have been initialized with a package manager but doesn't actually require npm/Node.js for operation. The website can be served directly from the HTML file without any build process.