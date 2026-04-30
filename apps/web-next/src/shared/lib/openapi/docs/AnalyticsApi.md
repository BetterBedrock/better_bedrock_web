# AnalyticsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**analyticsControllerAnalytics**](#analyticscontrolleranalytics) | **GET** /analytics | |
|[**analyticsControllerLiveCount**](#analyticscontrollerlivecount) | **GET** /analytics/live | |
|[**analyticsControllerPing**](#analyticscontrollerping) | **GET** /analytics/ping/{id} | |
|[**analyticsControllerUser**](#analyticscontrolleruser) | **GET** /analytics/user/{id} | |

# **analyticsControllerAnalytics**
> Array<AnalyticsDto> analyticsControllerAnalytics()


### Example

```typescript
import {
    AnalyticsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

const { status, data } = await apiInstance.analyticsControllerAnalytics();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<AnalyticsDto>**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **analyticsControllerLiveCount**
> LiveCountDto analyticsControllerLiveCount()


### Example

```typescript
import {
    AnalyticsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

const { status, data } = await apiInstance.analyticsControllerLiveCount();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**LiveCountDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **analyticsControllerPing**
> analyticsControllerPing()


### Example

```typescript
import {
    AnalyticsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

let id: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.analyticsControllerPing(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | (optional) defaults to undefined|


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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **analyticsControllerUser**
> Array<AnalyticsDto> analyticsControllerUser()


### Example

```typescript
import {
    AnalyticsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.analyticsControllerUser(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Array<AnalyticsDto>**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

