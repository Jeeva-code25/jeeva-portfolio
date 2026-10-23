import type { Project, ProjectGroup, ProjectImage } from "@/types/portfolio";

function desktopShot(
  file: string,
  alt: string,
  sourceUrl?: string,
  caption?: string,
): ProjectImage {
  return {
    src: `/images/projects/${file}.webp`,
    alt,
    width: 1280,
    height: 800,
    device: "desktop",
    sourceUrl,
    caption,
  };
}

function mobileShot(file: string, alt: string, caption: string, height = 974): ProjectImage {
  return {
    src: `/images/projects/${file}.webp`,
    alt,
    width: 460,
    height,
    device: "mobile",
    caption,
  };
}

const fixerflipMobile: ProjectImage[] = [
  mobileShot("fixerflip-home", "FixerFlip home screen with portfolio summary and deal of the day", "Home"),
  mobileShot("fixerflip-find-fixers", "FixerFlip Find Fixer Deals listing with a property result", "Find Fixers"),
  mobileShot("fixerflip-property-analysis", "FixerFlip property page with ROI breakdown", "Property analysis", 1319),
  mobileShot("fixerflip-map-view", "FixerFlip map view with property price markers", "Map view"),
  mobileShot("fixerflip-ai-renovation", "FixerFlip New AI Renovation image selection screen", "AI renovation"),
  mobileShot("fixerflip-ai-confirm", "FixerFlip confirmation dialog before using AI credits", "Credit confirmation"),
  mobileShot("fixerflip-ai-credits", "FixerFlip AI Credits balance and credit pack purchase screen", "AI credits"),
  mobileShot("fixerflip-network", "FixerFlip Network screen for finding contractors, agents, lenders, and architects", "Network"),
];

export const projectGroups: Record<
  ProjectGroup,
  { label: string; eyebrow: string; description: string }
> = {
  apzzo: {
    label: "Apzzo Technologies",
    eyebrow: "Professional · Apzzo",
    description:
      "Mobile apps, web apps, and product suites built with the Apzzo team.",
  },
  corsosoft: {
    label: "Corsosoft Technologies",
    eyebrow: "Professional · Corsosoft",
    description:
      "Feature work and maintenance on existing systems and websites.",
  },
  personal: {
    label: "Personal projects",
    eyebrow: "Personal",
    description:
      "A full-stack MERN blog, frontend builds — several made before joining Corsosoft Technologies — and native Android apps backed by Firebase.",
  },
};

export const projects: Project[] = [
  {
    slug: "fixerflip",
    title: "FixerFlip",
    group: "apzzo",
    category: "Mobile & web app",
    summary:
      "Real-estate investing app for finding fixer properties, analysing deals, and planning renovations — on Android, iOS, and the web from a shared Expo codebase.",
    overview:
      "FixerFlip was delivered through Apzzo Technologies. It runs as a mobile app on Google Play and the App Store and as a web app, built from a shared Expo-based codebase. I worked on the product as part of the team rather than building it alone.",
    role: "Developer — React Native & Expo",
    contributions: [
      "Built and refined interface screens in React Native and Expo.",
      "Integrated APIs and authentication with Auth0 / OAuth.",
      "Worked on subscription and payment flows with RevenueCat and Stripe.",
      "Wired push notifications with Firebase Cloud Messaging, plus analytics integrations and Mapbox maps.",
      "Fixed bugs and handled application release tasks for the app stores.",
    ],
    technologies: [
      "React Native",
      "Expo",
      "Auth0 / OAuth",
      "Firebase Cloud Messaging",
      "RevenueCat",
      "Stripe",
      "Mapbox",
      "Analytics",
    ],
    links: [
      { label: "Web app", href: "https://app.fixerflip.ai/", kind: "live" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.mycompany.fixerflip",
        kind: "play",
      },
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/fixerflip/id6764062931",
        kind: "appstore",
      },
    ],
    preview: { type: "screenshot", image: fixerflipMobile[0] },
    gallery: [
      ...fixerflipMobile,
      desktopShot(
        "fixerflip-web-welcome",
        "FixerFlip web app public welcome page",
        "https://app.fixerflip.ai/",
        "Web app — public welcome page",
      ),
    ],
    status: "Live on Google Play, App Store, and web",
    featured: true,
  },
  {
    slug: "pointerup",
    title: "PointerUp — Product Suite",
    group: "apzzo",
    category: "E-commerce platform",
    summary:
      "Apzzo's own product family: an e-commerce platform with storefront and admin web apps, Grow for marketing campaigns, and Social for bringing social platforms together.",
    overview:
      "PointerUp is a product suite built at Apzzo Technologies. It is team work, not a personal project. The suite has three related experiences: E-commerce, Grow, and Social.",
    contributions: [
      "Contributed to PointerUp product development as part of the Apzzo engineering team.",
    ],
    technologies: [],
    links: [{ label: "PointerUp app", href: "https://app.pointerup.com/", kind: "live" }],
    preview: {
      type: "screenshot",
      image: desktopShot(
        "pointerup-store-freshgreen",
        "Fresh Green grocery storefront running on PointerUp e-commerce",
        "https://www.freshgreen.in/",
      ),
    },
    subProducts: [
      {
        name: "E-commerce",
        summary:
          "An e-commerce web application for merchant storefronts, managed through a separate admin web application.",
        preview: {
          type: "screenshot",
          image: desktopShot(
            "pointerup-store-garmentnest",
            "GarmentNest fashion storefront running on PointerUp e-commerce",
            "https://www.garmentnest.in/",
            "GarmentNest — a merchant storefront on PointerUp",
          ),
        },
        links: [{ label: "PointerUp app", href: "https://app.pointerup.com/", kind: "live" }],
      },
      {
        name: "Grow",
        summary:
          "A marketing product for building campaigns and sending campaign messages to customers.",
        preview: {
          type: "screenshot",
          image: {
            src: "/images/projects/pointerup-grow-dashboard.webp",
            alt: "PointerUp Grow revenue analytics dashboard with revenue by channel, orders, customers, and a channel-wise revenue chart",
            width: 1014,
            height: 487,
            device: "desktop",
            sourceUrl: "https://app.pointerup.com/",
          },
        },
      },
      {
        name: "Social",
        summary:
          "A social media integration product intended to bring social platforms together in one place.",
        preview: {
          type: "illustration",
          kind: "social",
          device: "desktop",
          label: "Illustrative social workspace",
        },
      },
    ],
    examples: {
      title: "Live storefronts on PointerUp",
      intro:
        "These public merchant stores load their catalogue from PointerUp's e-commerce services. They show the platform in production; the individual storefront designs are not attributed to me.",
      sites: [
        {
          name: "GarmentNest",
          type: "Fashion",
          href: "https://www.garmentnest.in/",
          image: desktopShot(
            "pointerup-store-garmentnest",
            "GarmentNest fashion storefront home page",
            "https://www.garmentnest.in/",
          ),
        },
        {
          name: "Beauty Love",
          type: "Skincare & cosmetics",
          href: "https://www.beautylove.in/",
          image: desktopShot(
            "pointerup-store-beautylove",
            "Beauty Love skincare storefront home page",
            "https://www.beautylove.in/",
          ),
        },
        {
          name: "Fresh Green",
          type: "Grocery",
          href: "https://www.freshgreen.in/",
          image: desktopShot(
            "pointerup-store-freshgreen",
            "Fresh Green grocery storefront home page",
            "https://www.freshgreen.in/",
          ),
        },
        {
          name: "Meli and Mom",
          type: "Kids' learning products",
          href: "https://www.meliandmom.com/",
          image: desktopShot(
            "pointerup-store-meliandmom",
            "Meli and Mom kids learning products storefront home page",
            "https://www.meliandmom.com/",
          ),
        },
      ],
    },
    featured: true,
  },
  {
    slug: "monito",
    title: "Monito",
    group: "apzzo",
    category: "Pet store web app",
    summary:
      "A pet store front end in Next.js and TypeScript with product listings, product details, cart, sign-in with OTP, and customer account pages, wired to a REST API.",
    overview:
      "A frontend demo project with REST API integration that I built at Apzzo Technologies. It uses the Next.js Pages Router with TypeScript, Material UI, and Tailwind CSS, and loads products, carts, and user data from the public Fake Store API.",
    contributions: [
      "Built the home page, product listing, and product detail pages with Swiper image carousels.",
      "Integrated a REST API for products, carts, and users, with shared state in React Context.",
      "Built login, registration, and OTP verification screens.",
      "Built account pages for profile, orders, addresses, wishlist, and notifications.",
    ],
    technologies: ["Next.js", "TypeScript", "Material UI", "Tailwind CSS", "Swiper", "REST APIs"],
    links: [
      { label: "Live demo", href: "https://monito-demo-project.netlify.app/", kind: "live" },
      { label: "Repository", href: "https://github.com/Jeeva-code25/monito", kind: "repo" },
    ],
    preview: {
      type: "screenshot",
      image: desktopShot(
        "monito-home",
        "Monito pet store home page with a hero banner and new pets section",
        "https://monito-demo-project.netlify.app/",
      ),
    },
    context: "Frontend demo project built at Apzzo Technologies",
  },
  {
    slug: "schoolpanda-super-admin",
    title: "SchoolPanda — Super Admin",
    group: "corsosoft",
    category: "Admin interface",
    summary:
      "React work on the Super Admin interface of SchoolPanda, a school management platform — admin pages, tables, and API-driven CRUD workflows.",
    overview:
      "SchoolPanda is a school management platform. My contribution was limited to its Super Admin interface: I did not build the whole platform. The Super Admin interface is private, so the preview here is an illustration rather than a screenshot.",
    role: "Frontend developer — Super Admin",
    contributions: [
      "Developed Super Admin pages in React.js using RSuite UI components.",
      "Integrated backend APIs with Axios.",
      "Built administration tables and CRUD workflows.",
    ],
    technologies: ["React.js", "RSuite", "Axios", "REST APIs"],
    links: [{ label: "SchoolPanda website", href: "https://scoolpanda.com/", kind: "live" }],
    preview: {
      type: "illustration",
      kind: "school-admin",
      device: "desktop",
      label: "Illustrative Super Admin view",
    },
    gallery: [
      desktopShot(
        "schoolpanda-public-site",
        "SchoolPanda public marketing website home page",
        "https://scoolpanda.com/",
        "Public SchoolPanda website — shown for context, not the Super Admin interface",
      ),
    ],
  },
  {
    slug: "transport-management-system",
    title: "Transport Management System",
    group: "corsosoft",
    category: "Logistics web app",
    summary:
      "A logistics and transport management website where I fixed bugs and added new pages to the existing system.",
    overview:
      "An existing logistics and transport management web application built with PHP and CodeIgniter on MySQL. The system is private, so the preview is an illustration of a logistics dashboard, not a screenshot.",
    contributions: [
      "Fixed bugs in the existing CodeIgniter application.",
      "Added new pages backed by MySQL data.",
    ],
    technologies: ["PHP", "CodeIgniter", "MySQL"],
    links: [],
    preview: {
      type: "illustration",
      kind: "logistics",
      device: "desktop",
      label: "Illustrative logistics dashboard",
    },
  },
  {
    slug: "wordpress-maintenance",
    title: "WordPress Website Maintenance",
    group: "corsosoft",
    category: "Maintenance & enhancement",
    summary:
      "Maintenance and enhancement of two existing WordPress websites — Bakers Foods India and MakersHub — fixing bugs and adding pages.",
    overview:
      "Both websites already existed when I worked on them. My work was maintenance and enhancement: fixing bugs and adding pages, not building the sites from scratch.",
    contributions: [
      "Fixed bugs on existing WordPress websites.",
      "Added new pages to both websites.",
    ],
    technologies: ["WordPress"],
    links: [
      { label: "Bakers Foods India", href: "https://bakersfoodsindia.com/", kind: "live" },
      { label: "MakersHub", href: "https://makershub.co.in/", kind: "live" },
    ],
    preview: {
      type: "screenshot",
      image: desktopShot(
        "makershub-home",
        "MakersHub STREAM education website home page",
        "https://makershub.co.in/",
      ),
    },
    gallery: [
      desktopShot(
        "makershub-home",
        "MakersHub STREAM education website home page",
        "https://makershub.co.in/",
        "MakersHub",
      ),
      desktopShot(
        "bakers-foods-home",
        "Bakers Foods India website home page",
        "https://bakersfoodsindia.com/",
        "Bakers Foods India",
      ),
    ],
    featured: true,
  },
  {
    slug: "celestial-dine",
    title: "Celestial Dine",
    group: "personal",
    category: "Restaurant website",
    summary:
      "A restaurant website with home, menu, about, and contact pages, menu cards, reviews, and a table-booking section.",
    overview:
      "A multi-page React site built with Vite, React Router, and React Bootstrap, deployed to GitHub Pages.",
    contributions: [
      "Built reusable components for the banner, menu cards, offerings, reviews, and footer.",
      "Set up client-side routing between the home, menu, about, and contact pages.",
    ],
    technologies: ["React", "Vite", "React Router", "React Bootstrap"],
    links: [
      { label: "Live demo", href: "https://jeeva-code25.github.io/celestial-dine/", kind: "live" },
      { label: "Repository", href: "https://github.com/Jeeva-code25/celestial-dine", kind: "repo" },
    ],
    preview: {
      type: "screenshot",
      image: desktopShot(
        "celestial-dine-home",
        "Celestial Dine restaurant website hero with Book A Table and Explore Menu actions",
        "https://jeeva-code25.github.io/celestial-dine/",
      ),
    },
    context: "Built before joining Corsosoft Technologies",
    featured: true,
  },
  {
    slug: "bull-eye",
    title: "Bull Eye",
    group: "personal",
    category: "Trading dashboard UI",
    summary:
      "A crypto copy-trading dashboard design built in React, with overview and performance panels, a traded-pairs chart, a trader profile card, and open-position details.",
    overview:
      "A frontend UI build created with Create React App, using React Bootstrap for layout and MUI X Charts for the pie and line charts. The data shown is static sample data.",
    contributions: [
      "Built the navigation bar, banner, and dashboard card layout with React Bootstrap.",
      "Built overview and performance panels with time-range filters (24H, 7D, 30D, 1Y).",
      "Added a traded-pairs pie chart and a performance line chart with MUI X Charts.",
      "Built the trader profile card and the current-position details panel.",
    ],
    technologies: ["React", "React Bootstrap", "MUI X Charts", "Bootstrap Icons"],
    links: [
      {
        label: "Live demo",
        href: "https://jeeva-code25.github.io/crypto-trade-app-design/",
        kind: "live",
      },
      {
        label: "Repository",
        href: "https://github.com/Jeeva-code25/crypto-trade-app-design",
        kind: "repo",
      },
    ],
    preview: {
      type: "screenshot",
      image: desktopShot(
        "bull-eye-dashboard",
        "Bull Eye trading dashboard with overview, traded pairs chart, and trader profile panels",
        "https://jeeva-code25.github.io/crypto-trade-app-design/",
      ),
    },
  },
  {
    slug: "pizza-shop",
    title: "Pizza Shop",
    group: "personal",
    category: "Restaurant website",
    summary:
      "A pizza restaurant front end with a hero carousel, menu and pick-of-the-week sections, reviews, and a slide-out cart panel.",
    overview:
      "A Create React App project styled with React Bootstrap, Bootstrap Icons, and Sass.",
    contributions: [
      "Built the carousel banner, menu cards, and pick-of-the-week sections.",
      "Added an off-canvas cart panel using React Bootstrap.",
    ],
    technologies: ["React", "React Bootstrap", "Bootstrap Icons", "Sass"],
    links: [
      { label: "Live demo", href: "https://jeeva-code25.github.io/pizza-shop/", kind: "live" },
      { label: "Repository", href: "https://github.com/Jeeva-code25/pizza-shop", kind: "repo" },
    ],
    preview: {
      type: "screenshot",
      image: desktopShot(
        "pizza-shop-home",
        "Pizza Shop website with navigation, cart badge, and pizza carousel",
        "https://jeeva-code25.github.io/pizza-shop/",
      ),
    },
    context: "Built before joining Corsosoft Technologies",
  },
  {
    slug: "tic-tac-toe",
    title: "Tic Tac Toe",
    group: "personal",
    category: "Browser game",
    summary:
      "A two-player Tic Tac Toe game in React with win detection, board locking after a win, and reset.",
    overview: "A small Create React App project focused on component state and game logic.",
    contributions: [
      "Implemented turn handling and win checks across rows, columns, and diagonals.",
      "Locked the board after a win and added a reset action.",
    ],
    technologies: ["React"],
    links: [
      { label: "Live demo", href: "https://jeeva-code25.github.io/tic-tac-toe/", kind: "live" },
      { label: "Repository", href: "https://github.com/Jeeva-code25/tic-tac-toe", kind: "repo" },
    ],
    preview: {
      type: "screenshot",
      image: desktopShot(
        "tic-tac-toe-board",
        "Tic Tac Toe game board mid-game with X and O moves",
        "https://jeeva-code25.github.io/tic-tac-toe/",
      ),
    },
    context: "Built before joining Corsosoft Technologies",
  },
  {
    slug: "quiz-app",
    title: "Quiz App",
    group: "personal",
    category: "Web app",
    summary:
      "A multiple-choice quiz that steps through questions, tracks the score, and shows a result with a reset option.",
    overview: "A React app built with Vite, with questions stored in a local data module.",
    contributions: [
      "Built question navigation, answer selection, and score tracking.",
      "Added the result screen with a reset action.",
    ],
    technologies: ["React", "Vite"],
    links: [
      { label: "Live demo", href: "https://jeeva-code25.github.io/quiz-app/", kind: "live" },
      { label: "Repository", href: "https://github.com/Jeeva-code25/quiz-app", kind: "repo" },
    ],
    preview: {
      type: "screenshot",
      image: desktopShot(
        "quiz-app-question",
        "Quiz App showing the first of five multiple-choice questions",
        "https://jeeva-code25.github.io/quiz-app/",
      ),
    },
    context: "Built before joining Corsosoft Technologies",
  },
  {
    slug: "mern-blog",
    title: "MERN Blog",
    group: "personal",
    category: "Full-stack web app",
    summary:
      "A full-stack blogging app with user registration and login, a React and Redux Toolkit client, and an Express and MongoDB API.",
    overview:
      "The client uses React, Redux Toolkit, React Router, Axios, and React Bootstrap. The separate server uses Express, Mongoose, and JWT-based authentication. Content sits behind sign-in, so the screenshot shows the public login screen.",
    contributions: [
      "Built the React client with Redux Toolkit state and Axios API calls.",
      "Built the Express API with Mongoose models and JWT authentication.",
    ],
    technologies: ["React", "Redux Toolkit", "Axios", "Express.js", "MongoDB", "JWT"],
    links: [
      { label: "Live site", href: "https://blogs-jeeva-code25.netlify.app/", kind: "live" },
      { label: "Client repo", href: "https://github.com/Jeeva-code25/blogs", kind: "repo" },
      { label: "Server repo", href: "https://github.com/Jeeva-code25/blogs-server", kind: "repo" },
    ],
    preview: {
      type: "screenshot",
      image: desktopShot(
        "mern-blog-sign-in",
        "MERN Blog login screen",
        "https://blogs-jeeva-code25.netlify.app/",
      ),
    },
  },
  {
    slug: "android-shopping-app",
    title: "Narumanam Shopping App",
    group: "personal",
    category: "Android app",
    summary:
      "A native Android shopping app in Kotlin and Jetpack Compose with buyer and seller flows, OTP sign-in, cart, orders, and addresses — backed by Firebase.",
    overview:
      "Built with Kotlin and Jetpack Compose, using Compose navigation graphs for buyer, seller, and account screens. Firebase handles authentication and data directly from the app, so there is no separate backend server.",
    contributions: [
      "Built sign-up, login, and OTP verification screens with Firebase Authentication.",
      "Built buyer screens for cart, orders, and saved addresses, plus seller product and offer management.",
      "Stored and synced app data with Firebase instead of a custom backend.",
    ],
    technologies: ["Kotlin", "Jetpack Compose", "Firebase"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Jeeva-code25/Shopping-App-using-Kotlin-with-Jetpack-Compose",
        kind: "repo",
      },
    ],
    preview: {
      type: "screenshot",
      image: mobileShot(
        "narumanam-login",
        "Narumanam app sign-in screen with a mobile number field",
        "Sign in",
        968,
      ),
    },
  },
  {
    slug: "android-quiz-app",
    title: "PrepGenius Quiz App",
    group: "personal",
    category: "Android app",
    summary:
      "An Android quiz app in Kotlin and Jetpack Compose with registration, subject-wise quizzes, instructions, and a scorecard.",
    overview:
      "Built with Kotlin and Jetpack Compose, with navigation graphs separating onboarding from the quiz flow. No screenshots are published, so the preview is illustrative.",
    contributions: [
      "Built login, registration, and subject selection screens.",
      "Built the quiz flow with instructions and a scorecard screen.",
    ],
    technologies: ["Kotlin", "Jetpack Compose", "Firebase"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Jeeva-code25/QUIZ-App-using-Jetpack-with-kotlin-Projects",
        kind: "repo",
      },
    ],
    preview: {
      type: "illustration",
      kind: "android-quiz",
      device: "mobile",
      label: "Illustrative app screen",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function hasScreenshot(project: Project): boolean {
  return project.preview.type === "screenshot";
}

/** Projects with real screenshots first; illustration-only projects last. */
export function getProjectsByGroup(group: ProjectGroup): Project[] {
  const inGroup = projects.filter((project) => project.group === group);
  return [...inGroup.filter(hasScreenshot), ...inGroup.filter((project) => !hasScreenshot(project))];
}

/** Home page personal picks, in order: API-integrated, frontend, mobile. */
const homePersonalSlugs = ["mern-blog", "celestial-dine", "android-shopping-app"];

export function getHomePersonalProjects(): Project[] {
  return homePersonalSlugs
    .map(getProjectBySlug)
    .filter((project): project is Project => project !== undefined && hasScreenshot(project));
}

/** Illustration-only projects never appear on the home page. */
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured && hasScreenshot(project));
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
