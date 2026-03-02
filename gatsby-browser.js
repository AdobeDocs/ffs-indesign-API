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

/**
 * Header offset to account for fixed navigation bar.
 * Matches the scrollYOffset used in RedoclyAPIBlock component.
 */
const HEADER_OFFSET = 70;

/**
 * Handles hash scrolling for dynamically rendered content (like Redocly API docs).
 * Waits for the target element to appear in the DOM before scrolling.
 */
const scrollToHashElement = (hash, maxAttempts = 50, interval = 100) => {
  if (!hash) return;

  const elementId = hash.replace('#', '');
  let attempts = 0;

  const tryScroll = () => {
    // Try finding element by ID or by data attribute (Redocly uses data-section-id)
    let element = document.getElementById(elementId);
    
    // Redocly might use different selectors for tags/operations
    if (!element) {
      element = document.querySelector(`[data-section-id="${elementId}"]`);
    }
    if (!element) {
      element = document.querySelector(`[id="${elementId}"]`);
    }
    // Try anchor with name attribute
    if (!element) {
      element = document.querySelector(`a[name="${elementId}"]`);
    }

    if (element) {
      // Element found, scroll to it with offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'instant'
      });
      return;
    }

    attempts++;
    if (attempts < maxAttempts) {
      setTimeout(tryScroll, interval);
    }
  };

  // Start trying after a short delay to let initial render begin
  setTimeout(tryScroll, 200);
};

/**
 * Gatsby Browser API: Called when the user changes routes.
 */
export const onRouteUpdate = ({ location }) => {
  // Only handle hash navigation on the API page
  if (location.pathname.includes('/api') && location.hash) {
    scrollToHashElement(location.hash);
  }
};

/**
 * Gatsby Browser API: Called when the initial page load happens.
 */
export const onInitialClientRender = () => {
  // Handle hash on initial page load
  if (window.location.pathname.includes('/api') && window.location.hash) {
    scrollToHashElement(window.location.hash);
  }
};
