# DownloadApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**downloadControllerDownload**](#downloadcontrollerdownload) | **GET** /download | |
|[**downloadControllerGenerate**](#downloadcontrollergenerate) | **POST** /download/generate | |
|[**downloadControllerVerify**](#downloadcontrollerverify) | **POST** /download/verify | |

# **downloadControllerDownload**
> File downloadControllerDownload()


### Example

```typescript
import {
    DownloadApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DownloadApi(configuration);

const { status, data } = await apiInstance.downloadControllerDownload();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**File**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/octet-stream


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Binary file stream |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **downloadControllerGenerate**
> downloadControllerGenerate()


### Example

```typescript
import {
    DownloadApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DownloadApi(configuration);

let file: string; //Name of the file user wants to generate download for (default to undefined)

const { status, data } = await apiInstance.downloadControllerGenerate(
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**string**] | Name of the file user wants to generate download for | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **downloadControllerVerify**
> downloadControllerVerify()


### Example

```typescript
import {
    DownloadApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DownloadApi(configuration);

let hash: string; //Hash generated to go through the ads on linkvertise (optional) (default to undefined)
let code: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.downloadControllerVerify(
    hash,
    code
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **hash** | [**string**] | Hash generated to go through the ads on linkvertise | (optional) defaults to undefined|
| **code** | [**string**] |  | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

