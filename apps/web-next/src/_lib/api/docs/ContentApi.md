# ContentApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**contentControllerDownloads**](#contentcontrollerdownloads) | **GET** /content/downloads | |

# **contentControllerDownloads**
> DownloadsDto contentControllerDownloads()


### Example

```typescript
import {
    ContentApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ContentApi(configuration);

const { status, data } = await apiInstance.contentControllerDownloads();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**DownloadsDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of available downloads |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

