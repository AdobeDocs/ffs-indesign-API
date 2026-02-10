---
title: Writing Scripts for Custom Scripts API
description: >-
  Writing Scripts for Custom Scripts API. for InDesign automation and document
  processing.
keywords:
  - Adobe InDesign API
  - InDesign automation
  - document processing
  - Data Merge API
  - Rendition API
  - Custom Scripts API
  - Remap Links API
  - REST API
  - cloud services
  - enterprise solutions
  - design automation
  - creative automation
  - content delivery
  - batch processing
og:
  title: Writing Scripts for Custom Scripts API
  description: >-
    Writing Scripts for Custom Scripts API. for InDesign automation and document
    processing.
twitter:
  card: summary
  title: Writing Scripts for Custom Scripts API
  description: >-
    Writing Scripts for Custom Scripts API. for InDesign automation and document
    processing.
---

# Writing Scripts for the Custom Scripts API

Use this document to construct the script files for the Custom Scripts API.

The script's author defines the custom attributes and values for a particular endpoint using *script.js* files in the custom script bundle[1]. Refer to the examples below to construct your scripts.

## Including input in a custom script

### When no input is required

The system, by default, sends a string-type argument named `"params"`, which needs to be parsed inside the script to retrieve the values of the attributes.

In this case the `"params"` attribute will be empty, since the script doesn't need an argument.

```json
{
    "assets": [
        {"path": "doc.indd"},
        {"path": "image.pdf"},
        ...
    ],
    "params": {

    },
    "jobID": "0c531425-bc82-43c0-89b7-0e851cd56061",
    "workingFolder": <Some path>
}
```

### When input is included in the request

The system, by default, sends a string-type argument named `"params"` which also includes input arguments `"arg1"` and `"arg2"`.

To use the argument, `"params"` must be parsed by the script and the value of `arg1` and `arg2` must be extracted.

```json
{
    "assets": [
        {"path":"doc.indd"},
        {"path":"image.pdf"},
        ...
    ],
    "params": {
        "arg1": <data for argument 1>,
        "arg2": <data for argument 2>,
        ...
    },
    "jobID": "0c531425-bc82-43c0-89b7-0e851cd56061",
    "workingFolder": <Some path>
}
```

The existing scripts must be tweaked to accept the arguments correctly:

**Previous existing script**

```javascript
var arg1 = app.scriptArgs.get('argument1')
var arg2 = app.scriptArgs.get('argument2')
// Some processing
```

**New correct script**  

```javascript
var parameters = app.scriptArgs.get('parameters')
var arg1 = parameters['argument1']
var arg2 = parameters['argument2']
// Some processing
```

### Input examples

For example, below is a sample input and sample script code to open a document and close a document:

**Example input request body**
  
  ```json
  {
      "assets": [
          {
              "source": {
                  "storageType": "Azure",
                  "url": "<Pre-signed URL of the document>"
              },
              "destination": "doc.indd"
          }
      ],
      "params": {
          "targetDocument": "doc.indd"
      }
  }
  ```

**Transformed input request sent to the script**
  
```json
{
    "assets": [
        {
            "path": "doc.indd"
        }
    ],
    "params": {
        "targetDocument": "doc.indd"
    },
    "jobID": "0c531425-bc82-43c0-89b7-0e851cd56061",
    "workingFolder": "c:\\baseFolder\\assets"
}
```

**Sample code that takes the input (from above)**
  
```javascript
  
    var input = app.scriptArgs.get('parameters')
    var allParameters = JSON.parse(input)

    // Set the working folder, which manages all the input and output assets.
    var basePath = allParameters["workingFolder"]

    var documentToOpen = allParameters["params"]["targetDocument"]

    documentPath = basePath + "\\" + documentToOpen
    document = app.open(File(documentPath))
    document.close()
```

## Providing output from a custom script

Use the information below to output data, files, or logs correctly from a script.

### If an execution is successful

The attributes below are expected to be returned as a JSON string if the script execution is successful.

<InlineAlert variant="warning" slots="title, text" />

**Caution:**

Anything outside of these attributes might be logged as data to be investigated.

| Attribute | Description | Required |
| --- | --- | --- |
| `dataURL` | A relative path to the JSON data file inside the working folder. When there is no data to send, pass an empty string. | X |
| `status` | Status of the execution. Can be `SUCCESS` or `FAILURE`. | X |
| `assetToBeUploaded` | An array for assets that need to be uploaded. Each asset is an object with a `path` and `data` attribute. The `path` is a relative link for the file to be uploaded. The `data` is the data in dictionary (object) format to be associated with this asset. This can be empty. | X |

```json
{
    "status": "SUCCESS",
    "assetToBeUploaded": [
        {
            "path": <Relative path of the file to be uploaded>,
            "data": <Data associated with this asset>
        }
    ],
    "dataURL": <Relative path of the JSON data file>
}
```

### Output examples

In these examples the data is shared in a JSON file, not directly. This is ideal for cases where the data becomes too big to send back.

**Example without data and without any output file**

This creates an object to be returned when the job is successful. The object should be stringified before returning.
  
```javascript

function GetSuccessReturnObj() {
    var obj = {}
    
    obj.status = 'SUCCESS'
    obj.assetsToBeUploaded = []
    obj.dataURL = ''
    
    return JSON.stringify(obj)

}
```

**Example with data and without any output file**
  
  This creates an object to be returned when the job is successful. Data is written into a JSON file, which should be created in a working folder.
  
  The data in dictionary (object) format is to be returned. The object should be stringified before returning.
  
```javascript
function GetSuccessReturnObj(data) {
  var obj = {}
  
  obj.status = 'SUCCESS'
  obj.assetsToBeUploaded = []
  obj.dataURL = WriteToFile(data)
  
  return JSON.stringify(obj)
}
function WriteToFile ( data ) {
  var newFile
  var fileName = 'data.json'
  var filePath = workingFolder + '\\' + fileName
  newFile = File(filePath)
  newFile.encoding = 'UTF8'
  newFile.open('write')
  newFile.write(JSON.stringify(data))
  newFile.close()
  return filePath  
}
```

**Example with data and with the output file**
  
  This creates an array of assets to be uploaded and sent back to the caller.
  
  - `assetPath`: The path of the file to be uploaded, relative to the working folder.
  - `data`: The data in dictionary (object) format to be associated with this asset. (It's optional).
  
  This data will be provided to the user with an  `ASSET_UPLOAD_COMPLETED`  event.

```javascript

  var assets = []
  var assetToBeUploaded = {}
  
  assetToBeUploaded.path = assetPath
  assetToBeUploaded.data = data //this is optional
  assets.push(assetToBeUploaded)
  
  
  function GetSuccessReturnObj(assets, data) {
    var obj = {}
    obj.status = 'SUCCESS'
    obj.assetsToBeUploaded = assets
    if (data) {
        obj.dataURL = WriteToFile(data)
    } else {
        obj.dataURL = ''
    }
    return JSON.stringify(obj)
}
```

### If an execution fails

When a script execution fails, the following attributes are returned as a JSON string.

| Attribute | Output Request Mapping | Required |
| --- | --- | --- |
| `status` | Status of execution. Will be `SUCCESS` or `FAILURE`. | X |
| `errorCode` | The error code. |  |
| `errorString` | A description of the error. |  |

```json
{
    "status": "FAILURE",
    "errorCode": <Error code>,
    "errorString": <Error Message>,
}
```

Use the code block below as a starting point to create the returned object for failed cases.

- `errorCode`: Error code detail.
- `errorString`: Description about the error.

Returns the object as a JSON string.

```javascript
function GetFailureReturnObj(errorCode, errorString) {
    var obj = {}
    obj.status = 'FAILURE'
    obj.errorCode = errorCode
    obj.errorString = errorString
    return JSON.stringify(obj)
}
```

## Logging

Logging can be important for debugging your own scripts and to keep track of decisions made during a script execution. You can log the data during script execution in two ways: collect logs in an array or log data in the application's log.

### Collect logs in an array

It's possible to collect logs in an array and then dump them with a
function similar to `WriteToFile`.

We've created a UTILS.jsx file that contains reusable utility functions. These functions help maintain clean, modular, and efficient code. Add the relative path to the list of assets to be uploaded. You can use UTILS.jsx functionality or create a similar one for your use case.

```javascript
//Logging Instructions

UTILS.logFilePath='LogFile1.txt'
UTILS.InitiateLogging() // Initialising logging. This will create an empty array to store logs.
UTILS.OpenLogFileHandle() // Opening the file handle to create the log file.
UTILS.AddAssetToBeUploaded(UTILS.logFilePath) // Adding the log file to the list of files to be uploaded.
UTILS.Log('Sample Log 1') // Logging a sample log.
UTILS.Log('Sample Log 2') // Logging a sample log. This automatically writes the log to the file, one line at a time.
```

### Log data in the application's log

Data can be logged in the application's log. Use the script calls below to redirect the provided log to the application's log:

```javascript
    // The following should come in the application log, which can be dumped using generalSettings/appLogs/logsRelativePath
    app.consoleout('Logging in app\'s std::out')
    app.consoleerr('Logging in app\'s std::err')
```

You can dump the application's log into a file by adding the `generalSettings` object, as shown below:

```json
    "params": {
        "targetDocument": "doc.indd",
        "outputPath": "idmlDoc.idml",
        "generalSettings": {
            "appLogs": {
                "logsRelativePath": "appLog.txt"
            }
        }
    }
```

## Sample Scripts

To help you get started with writing custom scripts for the Custom Scripts API, we have created a collection of sample scripts. These scripts demonstrate various use cases and best practices for constructing custom script bundles and handling input/output in your scripts. The repository includes scripts in both Extendscript and UXP formats.

You can find the sample scripts on our GitHub repository: [Sample Scripts for Custom Scripts API](https://github.com/AdobeDocs/indesign-api-docs/tree/main/SampleScripts).

## InDesign Server Scripting API Reference

For comprehensive documentation on all available InDesign Server objects, methods, and properties, refer to the ExtendScript API reference. This resource provides detailed information about the InDesign object model, including:

- **Application**: The root object for accessing InDesign functionality
- **Document**: Methods for creating, opening, and manipulating documents
- **Page and Spread**: Layout and page management
- **TextFrame and Story**: Text content and formatting
- **Graphic and Image**: Working with placed graphics
- **Styles**: Paragraph, character, object, table, and cell styles
- **DataMerge**: Data merge automation objects

[InDesign ExtendScript API Reference (InDesign Server)](https://www.indesignjs.de/extendscriptAPI/indesign-server14/#Application.html)

[1]: ../../getting_started/concepts/index.md#Custom-Script-bundle-structure
