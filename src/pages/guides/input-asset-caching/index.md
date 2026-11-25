---
title: Input Asset Caching with InDesign API
description: Learn how input asset caching reuses downloaded assets and how to disable it for a job or organization.
keywords:
  - Adobe InDesign API
  - input assets
  - asset caching
  - assetCache
  - ETag
  - pre-signed URLs
hideBreadcrumbNav: true
---

# Input Asset Caching

Input asset caching lets InDesign API reuse previously downloaded input assets instead of downloading the same asset for every job. This can reduce download latency and network usage when jobs reuse assets such as documents, images, or fonts.

Caching is enabled by default unless disabled for your organization or an individual job. It does not change asset content, asset format, or job output. If caching is unavailable or an asset cannot be safely identified for caching, InDesign API downloads the asset from its source URL.

## How caching settings work together

Organization-level settings take precedence over job-level settings:

- **Organization level:** Your organization can disable caching for all its jobs. Job parameters cannot override an organization-level disablement.
- **Job level:** When your organization allows caching, you can disable it for an individual job by setting `params.generalSettings.assetCache.enabled` to `false`.

In the table below, **Job setting** refers to `params.generalSettings.assetCache.enabled`.

| Organization setting | Job setting | Effective caching behavior |
| --- | --- | --- |
| Disabled | `true`, `false`, or omitted | Disabled |
| Enabled | `false` | Disabled |
| Enabled | `true` or omitted | Enabled |

**Setting `enabled` to `true` does not force caching on.** For example, if caching is disabled for your organization, it remains disabled even when your request includes `"assetCache": { "enabled": true }` inside `params.generalSettings`.

## Control caching for a job

No additional parameters are needed to use caching. To disable caching for a specific job, set `params.generalSettings.assetCache.enabled` to `false` in your request. This setting applies at the job level; you do not need to configure each asset separately.

The following example disables caching for a [Rendition API](../working-with-rendition-api/index.md) request:

```json
{
  "assets": [
    {
      "source": {
        "url": "<PRE-SIGNED URL FOR DOCUMENT>"
      },
      "destination": "document.indd"
    }
  ],
  "params": {
    "generalSettings": {
      "assetCache": {
        "enabled": false
      }
    },
    "targetDocuments": [
      "document.indd"
    ],
    "outputMediaType": "application/pdf"
  }
}
```

Keep the other parameters required by the API you are calling. See the [API reference](../../api/index.md) for request schemas.

### Cache settings

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `params.generalSettings.assetCache.enabled` | boolean | No | `true` | Set to `false` to disable caching for the job. A value of `true` allows caching only when it is also enabled for your organization. |

The `assetCache` object is optional. If `generalSettings`, `assetCache`, or `enabled` is omitted, the job-level setting defaults to `true`. Organization-level disablement still takes precedence.

### Disable caching for your organization

To disable caching for your organization, [submit a support request](https://airtable.com/appu5RTWgdM95jynx/pagyuT1qspNJcPU2E/form) to the InDesign APIs team. This disables caching for all jobs in your organization, and ignores the API attribute `params.generalSettings.assetCache.enabled`. You do not need to update each job request.

## How assets are reused

When caching is enabled, InDesign API identifies each input asset by its ETag, a version identifier provided by your storage service, together with your organization and client application. You do not need to supply an ETag or cache identifier.

- If a matching cached asset is available, the job reuses it.
- If no matching cached asset is available, InDesign API downloads the asset and caches it when eligible.
- If the asset has no usable ETag, InDesign API downloads it without caching.

Caching does not guarantee a cache hit for every asset or job.

## Retention and freshness

Cached assets are retained for no more than **24 hours**. The cache lifetime is the shorter of:

- 24 hours.
- The remaining validity of the asset's pre-signed URL.

For example, if the URL expires in six hours, the cache lifetime is at most six hours. If the URL remains valid for more than 24 hours, the cache lifetime is capped at 24 hours. Assets with already-expired pre-signed URLs are not cached.

When asset content changes and its ETag changes, the service uses a different cache identifier. The updated content is downloaded and cached separately rather than reusing the previous version. Ensure your storage service updates the ETag when you replace asset content.

Continue to provide valid [pre-signed URLs](../../getting-started/concepts/index.md#pre-signed-urls) for your input assets. Caching is not a replacement for maintaining access to the source assets.

## Isolation and data handling

- Cached assets are isolated by organization and client application, using identifiers from the authentication context.
- Identical assets used by different organizations or client applications have different cache identifiers.
- Pre-signed URLs and authentication credentials are not stored in the cache.
- Cached asset files are temporary and are deleted after the retention period.

## Fallback behavior

Cache failures do not fail a job on their own. If the cache is unavailable, or a cached file is missing or unreadable, InDesign API downloads the asset from its source URL. The job still requires a successful download and remains subject to normal asset access and processing errors.

No request changes are needed to use the default caching behavior; set `params.generalSettings.assetCache.enabled` to `false` when a job must always download its assets from their source URLs.
