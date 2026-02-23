---
title: PDF to InDesign Conversion Notes
description: Notes and limitations for converting PDFs to editable InDesign files.
keywords:
  - Adobe InDesign API
  - PDF to InDesign
  - PDF conversion
  - INDD
  - IDML
  - limitations
  - conversion notes
hideBreadcrumbNav: true
---

# PDF to InDesign conversion notes

## Points to note

- Convert multiple PDFs from any source, including files created in Illustrator, Photoshop, Express, Microsoft Word, Excel, PowerPoint, Apple Numbers, Canva, and more.
- Preserve rich formatting such as strikethrough, superscript and subscript, baseline shift, underline, tables, special characters, hyperlinks, nested lists, spot colors, and gradients.
- Create Paragraph and Character Styles automatically during PDF-to-InDesign conversion. This will not work if InDesign detects more than 80 unique styles during the PDF-to-InDesign conversion process.
- Retain advanced PDF effects, including drop shadows from InDesign, with full or partial support for object opacity, blending modes, and optimized multi-frame text.
- Group related paragraphs into a single text frame for cleaner layouts.
- Use **Preserve InDesign Editing Capabilities** when exporting PDFs from InDesign to accurately recreate the original InDesign file.

## Limitations

- Supports only PDFs up to **200 pages** and **150 MB**.
- Does not support scanned, OCR-based, password-protected, corrupted, or malformed PDFs, especially those created from unreliable sources.
- The API does not support documents that use advanced bullets, numbering, or complex table features.

## Reference

- Consult [Convert PDFs to InDesign Documents](https://helpx.adobe.com/indesign/using/convert-pdf-to-indesign-file.html) for converting PDFs to InDesign in the desktop workflow

