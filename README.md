# Backend HTML React

## What

POC to demonstrate composable elements on backend to do away with CSR at all and just parse and hydrate what is needed on Client Side

```mermaid
---
title: 10,000 Ft View
---
flowchart LR
    A[Data Domain API] --> B[BFF Content Service]
    C[Host Client App] --> D["Web Browser"]
    B --"ContentType: text/html"--> D
```

## Built using

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
