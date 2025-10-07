/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || '/firefly-services/docs/indesign-apis/',
  siteMetadata: {
    pages: [
      {
        title: 'All Firefly Services',
        path: 'https://developer.adobe.com/firefly-services/docs/guides/?aio_internal'
      },
      {
        title: 'About InDesign API',
        path: '/'
      },
      {
        title: 'Getting Started',
        path: '/getting_started/'
      },
      {
        title: 'Guides',
        path: '/guides/'
      },
      {
        title: 'API Reference',
        path: '/api/'
      },
    ],
    subPages: [
      {
        title: 'Getting Started',
        path: '/getting_started/',
        header: true,
        pages: [
          {
            title: 'Authentication',
            path: '/getting_started/'
          },
          {
            title: 'Technical Usage Notes',
            path: '/getting_started/usage'
          }
        ]
      },
      {
        title: 'Learn More',
        path: '/getting_started/concepts',
        header: true,
        pages: [
          {
            title: 'InDesign Concepts',
            path: '/getting_started/concepts'
          },
          {
            title: 'Changelog',
            path: '/getting_started/changelog/'
          }
        ]
      },
      {
        title: 'Guides',
        path: '/guides/',
        header: true,
        pages: [
          {
            title: 'Logging',
            path: '/guides/logging/'
          },
          {
            title: 'Working with Custom Scripts API',
            path: '/guides/working-with-custom-scripts-api/'
          },
          {
            title: 'Working with Data Merge API',
            path: '/guides/working-with-datamerge-api/'
          },
          {
            title: 'Working with Rendition API',
            path: '/guides/working-with-rendition-api/'
          },
          {
            title: 'Writing Scripts for Custom Scripts API',
            path: '/guides/writing-scripts-for-custom-scripts-api/'
          }
        ]
      }
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`]
};
