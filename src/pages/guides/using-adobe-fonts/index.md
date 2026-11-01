---
title: Using Adobe Fonts with InDesign API
description: Use fonts from the Adobe Fonts Free library with InDesign API without uploading or hosting font files.
keywords:
  - Adobe InDesign API
  - Adobe Fonts
  - fonts
  - missing fonts
  - missingFontStrategy
  - Admin Console
  - product profile
  - custom fonts
hideBreadcrumbNav: true
---

# Using Adobe Fonts with InDesign API

InDesign API supports rendering documents that use fonts from the Adobe Fonts Free library. Fonts used in your InDesign documents are resolved automatically through your Adobe entitlement, so you do not need to upload or host those font files yourself.

<InlineAlert variant="info" slots="text" />

**Note:** This feature supports only fonts in the [Adobe Fonts Free library](https://fonts.adobe.com/fonts?library=basic). To use any other font, provide the font file as an asset using a pre-signed URL.

## Prerequisites

- A valid Firefly Services API key and access token. See [Authentication](../../getting-started/index.md).
- An Adobe entitlement that includes Adobe Fonts access.
- A font from the [Adobe Fonts Free library](https://fonts.adobe.com/fonts?library=basic).
- A Fonts product profile configured in the Adobe Admin Console and added to your credential in the Adobe Developer Console.


## Admin Console setup

Before you can use fonts from the Free library of Adobe Fonts in API calls, your organization must have a Fonts service enabled on a product profile in the Adobe Admin Console, and that profile must be associated with your API credential.

### Step 1: Create a product profile with Fonts enabled

1. Sign in to the [Adobe Admin Console](https://adminconsole.adobe.com/).
2. Go to **Products** and select **Firefly Creative Production for Enterprise**.
3. Click **New profile** and follow the setup steps.
4. On the **Enable services** step, ensure the **Fonts** toggle is turned on.
5. Click **Save**.

For detailed instructions on creating product profiles, see [Create product profiles](https://helpx.adobe.com/business/enterprise/products-entitlements/manage-product-profiles/create-product-profiles.html).

### Step 2: Add the product profile to your project in Developer Console

1. Sign in to the [Adobe Developer Console](https://developer.adobe.com/console).
2. Open your project. You will land on the project overview page showing your products and credentials.
3. Under **Products & services**, click the **InDesign API - Firefly Services** title to open the API detail page.
4. On the API detail page, click **Edit product profiles**.
5. Add the Fonts-enabled profile you created in Step 1 and save.

Once the profile is linked to your project, API calls made with that credential will have access to the fonts in the Adobe Fonts Free library.

## How it works

When InDesign API opens a document, it looks for every font used in the document. Fonts that are not supplied as assets (for example, in a `Document Fonts` folder or a configured font directory) are resolved through Adobe Fonts at processing time. No font file URL is required.

Only fonts from the [Adobe Fonts Free library](https://fonts.adobe.com/fonts?library=basic) can be resolved. If a font cannot be resolved because it is not in the Adobe Fonts Free library, or because it is not provided as input asset, the job will either fail or fallback to a default font, depending on your `missingFontStrategy` setting.

## Request structure

No additional parameters are needed to use Adobe Fonts. Use the `generalSettings.fonts` object in `params` to control how missing fonts are handled.

```json
{
  "assets": [
    {
      "source": {
        "url": "<PRE-SIGNED URL FOR DOCUMENT>"
      },
      "destination": "Document.indd"
    }
  ],
  "params": {
    "generalSettings": {
      "fonts": {
        "missingFontStrategy": "fail"
      }
    },
    "targetDocuments": [
      "Document.indd"
    ],
    "outputMediaType": "application/pdf"
  }
}
```

## fonts reference

| Property | Type | Description |
| --- | --- | --- |
| `missingFontStrategy` | string | Strategy to use when a font cannot be found. One of `fallback` or `fail`. Defaults to `fallback`. |


## Submitting a request

Submit the job:

```curl
curl -X POST "https://indesign.adobe.io/v3/create-rendition" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "assets": [
      {
        "source": {
          "url": "<PRE-SIGNED URL FOR DOCUMENT>"
        },
        "destination": "Document.indd"
      }
    ],
    "params": {
      "targetDocuments": [
        "Document.indd"
      ],
      "outputMediaType": "application/pdf",
      "generalSettings": {
        "fonts": {
          "missingFontStrategy": "fail"
        }
      }
    }
  }'
```

A successful submission returns a `202` response with a `jobId` and `statusUrl`:

```json
{
  "jobId": "9b9d00c5-8659-4766-8430-ed0a1c9bd87d",
  "statusUrl": "https://indesign.adobe.io/v3/status/9b9d00c5-8659-4766-8430-ed0a1c9bd87d"
}
```


## Error handling

| Scenario | `missingFontStrategy` | Result |
| --- | --- | --- |
| Font is not in the Adobe Fonts Free library and not supplied as an asset | `fallback` | The job completes using a default font. The font is reported under `warnings.missingFonts` in the job status. |
| Font is not in the Adobe Fonts Free library and not supplied as an asset | `fail` | The job fails. |
| Fonts product profile is not added to your credential | `fallback` / `fail` | Adobe Fonts are not used to resolve any missing fonts. |

## Using custom fonts

If you need a font that is not in the Adobe Fonts Free library, including any Adobe Fonts that are in the Paid library, supply it as an asset. The font file must be accessible via a [pre-signed URL](../../getting-started/concepts/index.md#Pre-signed-URLs). Place it in a `Document Fonts` folder parallel to the document so it is found by default.

```json
{
  "assets": [
    {
      "source": {
        "url": "<PRE-SIGNED URL FOR DOCUMENT>"
      },
      "destination": "Document.indd"
    },
    {
      "source": {
        "url": "<PRE-SIGNED URL FOR FONT FILE>"
      },
      "destination": "Document Fonts/CustomFont-Regular.otf"
    }
  ]
}
```

For more details, see [Using custom fonts](../../getting-started/concepts/index.md#using-custom-fonts).
