---
title: Changelog - InDesign APIs
description: >-
  Stay updated with the latest features, improvements, and bug fixes for Adobe
  InDesign APIs.
hideBreadcrumbNav: true
keywords:
  - Adobe InDesign API
  - InDesign automation
  - document processing
  - Data Merge API
  - Rendition API
  - Custom Scripts API
  - Remap Links API
  - Convert PDF to InDesign API
  - PDF to InDesign
  - REST API
  - cloud services
  - enterprise solutions
  - design automation
  - creative automation
  - content delivery
  - batch processing
  - InDesign API
og:
  title: Changelog - InDesign APIs
  description: >-
    Stay updated with the latest features, improvements, and bug fixes for Adobe
    InDesign APIs.
twitter:
  card: summary
  title: Changelog - InDesign APIs
  description: >-
    Stay updated with the latest features, improvements, and bug fixes for Adobe
    InDesign APIs.
---

# Changelog

## Overview

This page contains the release notes and version history for Adobe InDesign APIs. Stay updated with the latest features, improvements, and bug fixes.

## August 11, 2026

### New Features

*Advanced Data Merge*

- **Conditional Visibility & Dynamic Styling**: The `POST /v4/merge-data` endpoint now accepts a `rulesFile` parameter, letting a rules JSON file show/hide layers, frames, and placeholders, restyle and recolor content, replace text, and resize or move frames — differently per record. [Learn more about conditional visibility & dynamic styling.][16]
- **Copyfitting**: New `copyfittingSettings` object in `params` automatically reduces font size within defined limits to resolve overset text after a merge. [Learn more about copyfitting.][17]
- **Folder Structure & Zipped Output**: The `POST /v4/merge-data` endpoint supports organizing merge outputs into a folder hierarchy via a `~`-prefixed CSV column, plus optional zipped output using `outputCompressMediaType`. [Learn more about folder structure and zipped output.][18]
- **Pre-signed URL Support in CSV**: A new `preSignedURL` parameter allows image placeholder columns (prefixed with `@`) to contain pre-signed URLs directly in the CSV, fetched during the merge. [Learn more about pre-signed URL support.][19]

## June 2, 2026

### Enhancements

- **Variable File Naming Support in Data Merge API:** The `POST /v3/merge-data` endpoint now supports variable file naming. [Learn more about variable file naming support.][14]
- **Increased Asset Size Limit:** The maximum supported asset size has been increased from 1GB to 2GB, enabling processing of larger InDesign documents and linked assets. [Learn more about file size limits.][15]

## March 18, 2026

### Enhancements

- **API Capability Naming Rules for Custom Scripts:** We have introduced key changes in custom script naming. See [Key Concepts — API Capability Naming Rules][13] for details and examples.

## February 24, 2026

### New Features

*Convert PDF to InDesign API*

- **Convert PDF to InDesign**: New `POST /v3/convert-pdf-to-indesign` endpoint to convert PDFs into editable InDesign (INDD or IDML) documents. [View endpoint documentation][11]. See [PDF to InDesign conversion notes][12] for additoinal notes about the new API.

## February 6, 2026

### Enhancements

- **Multiline records support in DataMerge**: The `POST /v3/merge-data` and `POST /v3/merge-data-tags` endpoints now support and correctly process multiline records. Multiline content can be included by enclosing field values in double quotes (""), and any line breaks within those values will be preserved during processing. [Learn more about multiline support.][9]
- **UTF-8 encoded CSV file support**: The `POST /v3/merge-data` and `POST /v3/merge-data-tags` endpoints now accept and process UTF-8 encoded CSV files, enabling support for special characters such as emojis and international text. [Learn more about UTF-8 support.][10]
- **HTML5 Export using custom scripts**: Using a custom script, users can now export HTML5 pages from InDesign API.

  ```javascript
  doc.html5ExportPreferences.textExportFormat = TextExportFormatEnum.HTML_TAG;
  doc.exportFile(ExportFormat.HTML5, html_File_path);
  ```

## November 20, 2025

### New Features

*Custom Scripts API - New Endpoints*

- **Update Custom Script App Version**: New `PUT /v3/scripts/{script_name}/app-version` endpoint to update InDesign app version configuration for registered scripts. Supports three strategies: latest_version, fixed_major_version, and fixed_major_and_minor_version. [View endpoint documentation][6]
- **Get Available App Versions**: New `GET /v3/app-versions` endpoint to retrieve all available InDesign app versions with their status information. [View endpoint documentation][8]

### Enhancements

- **Specify or Update Custom Script App Version**: The `POST /v3/scripts` endpoint now allow `appVersionStrategy`, `majorAppVersion` and `minorAppVersion` fields in the manifest file to control Indesign app version for new or registered Custom Script.
- **List Custom Scripts Response Enhancement**: The `GET /v3/scripts` endpoint now includes `appVersionStrategy`, `majorAppVersion` and `minorAppVersion` fields in the response, providing information about the InDesign application version requirements for each registered script.
- **Get Custom Script Details Enhancement**: The `GET /v3/scripts/{script_name}` endpoint now also includes the above mentioned version fields.

## November 13, 2025

### New Features

*DocumentInfo API*

- **Get InDesign Document Information**: New `POST /v3/document-info` endpoint to retrieve information about INDD/IDML documents. [View endpoint documentation][7]

## September 3, 2025

### Enhancements

*Data Merge API*

- Now manage hyphenation in merged documents with `hyphenationSettings`. Also, manage exclusion lists and fix break location using `dictionarySettings`. Details are available in [the Data Merge API documentation][4] and [How-to example.][5]

## August 4, 2025

### New features

*Remap Links API*

- Added new `/v3/remap-links` endpoint for remapping file-based links to AEM links.
- Supports batch link remapping operations. Ideal for customers working with AEM using Adobe Asset Link (AAL).
- [Explore the API documentation][1]

*Custom Scripts API enhancements*

- **List Custom Scripts**: New `GET /v3/scripts` endpoint to retrieve all registered scripts.
- **Get Script Details**: New `GET /v3/scripts/{script_name}` endpoint for individual script information.
- **Delete Custom Scripts**: New `DELETE /v3/scripts/{script_name}` endpoint for script deletion management.
- [Explore the API documentation][2]

### Documentation updates

- Added comprehensive [User data handling][3] documentation.
- Enhanced API reference with detailed examples.
- Improved error code documentation and troubleshooting guides.

[//]: # (Links)
[1]: ../../api/index.md
[2]: ../../api/index.md
[3]: ../../getting-started/usage/index.md#user-data-handling
[4]: ../../api/index.md
[5]: ../../guides/working-with-datamerge-api/index.md
[6]: ../../api/index.md
[7]: ../../api/index.md
[8]: ../../api/index.md
[9]: ../../guides/working-with-datamerge-api/index.md#multiline-records-in-data-merge-api
[10]: ../../guides/working-with-datamerge-api/index.md#utf-8-encoded-csv-file-support
[11]: ../../api/index.md
[12]: ../../guides/pdf-to-indesign-conversion-notes/index.md
[13]: ../concepts/index.md#api-capability-naming-rules
[14]: ../../guides/working-with-datamerge-api/index.md#variable-file-naming-support-in-data-merge-api
[15]: ../usage/index.md#file-size-limits
[16]: ../../guides/working-with-advanced-data-merge-api/index.md#conditional-visibility--dynamic-styling
[17]: ../../guides/working-with-advanced-data-merge-api/index.md#copyfitting
[18]: ../../guides/working-with-advanced-data-merge-api/index.md#folder-structure-and-zipped-output
[19]: ../../guides/working-with-advanced-data-merge-api/index.md#pre-signed-url-support
