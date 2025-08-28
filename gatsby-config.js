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
            title: 'Storage Solutions',
            path: '/getting_started/storage_solutions'
          },
          {
            title: 'Technical Usage Notes',
            path: '/getting_started/usage'
          }
        ]
      },
      {
        title: 'Guides',
        path: '/guides/',
        header: true,
        pages: [
          {
            title: 'Using the InDesign API',
            path: '/guides/index.md'
          }
        ]
      }
    ]
  },
  plugins: [`@adobe/gatsby-theme-aio`]
};
