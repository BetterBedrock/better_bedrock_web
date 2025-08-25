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
|**401** | Not verified for download |  -  |
|**404** | File not found or does not exist on the server |  -  |

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

let file: string; //Download ID to generate (default to undefined)

const { status, data } = await apiInstance.downloadControllerGenerate(
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**string**] | Download ID to generate | defaults to undefined|


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
|**201** | Download record created. |  -  |
|**404** | Requested file not found. |  -  |

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
|**200** | Download verified successfully |  -  |
|**401** | The voucher does not exist |  -  |
|**403** | This voucher allows you to download only better bedrock content |  -  |
|**404** | Download record not found for this IP or file not found |  -  |
|**410** | The voucher has either expired or already been used |  -  |
|**502** | Failed to verify with Linkvertise gateway |  -  |
|**503** | Linkvertise service unavailable |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

