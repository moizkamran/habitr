// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@mantine/dates/styles.css';
import '@mantine/spotlight/styles.css';
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider
  theme={{
    headings: {
      // properties for all headings
      fontWeight: 700,
      fontFamily: "Outfit, sans-serif",
    },

    components: {
      Text: {
        styles: {
          root: { fontSize: 20, fontFamily: "Outfit, sans-serif", },
        },
      },

      Button: {
        styles: {
          root: {
            // properties for all buttons
            fontFamily: "Outfit, sans-serif",
            fontWeight: 400,
            color: "black",
            borderRadius: 35,
            borderWidth: 1,
            borderColor: "black",
            backgroundColor: "white",
            transition:
              "background-color 0.3s ease-in-out, color 0.3s ease-in-out, transform 0.3s ease-in-out",
            "&:hover": {
              color: "white",
              backgroundColor: "black",
              transform: "scale(0.9)",
            },
          },
        },
      },
    },
  }}
  >
    <App />
  </MantineProvider>
)
