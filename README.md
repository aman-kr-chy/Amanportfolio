# Developer Portfolio

A modern, responsive, and professional developer portfolio website built using HTML, CSS, and Vanilla JavaScript.

## Features

- **Dark Theme with Glassmorphism**: Clean and modern aesthetics with a beautiful dark theme and glass-like translucent cards.
- **Fully Responsive**: Adapts seamlessly to all screen sizes including desktops, tablets, and mobile devices.
- **Scroll Animations**: Elements fade in smoothly as you scroll down using the Intersection Observer API.
- **Interactive Navigation**: Sticky header on scroll and active link highlighting.
- **Mobile Menu**: Responsive hamburger menu for smaller screens.
- **Custom Scroll Progress Bar**: A visual indicator at the top showing scroll progress.
- **Mock Contact Form**: Frontend contact form with simulated submission UI/UX.

## Technologies Used

- **HTML5**: Semantic and accessible structure.
- **CSS3**: Custom properties, Flexbox, CSS Grid, animations, and transitions.
- **Vanilla JavaScript**: DOM manipulation, scroll event handling, and interactivity.
- **FontAwesome & Devicon**: Used via CDN for all the technical and UI icons.
- **Google Fonts**: Inter & Fira Code typefaces.

## Project Structure

```text
portfolio/
│
├── index.html       # The main HTML structure
├── style.css        # All styling, variables, and animations
├── script.js        # JavaScript functionality and interactions
├── assets/          # Directory for local images and resume (profile.jpg, resume.pdf)
└── README.md        # Project documentation
```

## Setup & Usage

1. **Clone or Download** the repository.
2. Navigate to the project directory.
3. Open `index.html` directly in your favorite web browser or run it using a local development server (like Live Server extension in VS Code).
4. Update the **placeholder images, text, and project links** to your own personal details.
5. Add your profile picture as `profile.jpg` and your resume as `resume.pdf` in the `assets/` directory.

## Customization

You can easily customize the colors and theme by modifying the CSS variables in the `:root` pseudo-class located at the top of the `style.css` file:

```css
:root {
    --bg-color: #0f172a;       /* Dark background */
    --accent-color: #38bdf8;   /* Primary Accent (Cyan) */
    /* Update other variables as needed */
}
```

## Author

**Aman Kumar**
Full Stack Developer
