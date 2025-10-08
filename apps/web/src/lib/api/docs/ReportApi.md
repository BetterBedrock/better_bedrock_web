# ReportApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**reportControllerFetchReports**](#reportcontrollerfetchreports) | **GET** /report | |
|[**reportControllerReopenReport**](#reportcontrollerreopenreport) | **PATCH** /report/reopen/{id} | |
|[**reportControllerReportProject**](#reportcontrollerreportproject) | **POST** /report/project/{id} | |
|[**reportControllerReportUser**](#reportcontrollerreportuser) | **POST** /report/user/{id} | |
|[**reportControllerResolveReport**](#reportcontrollerresolvereport) | **PATCH** /report/resolve/{id} | |

# **reportControllerFetchReports**
> Array<ReportDto> reportControllerFetchReports()


### Example

```typescript
import {
    ReportApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReportApi(configuration);

const { status, data } = await apiInstance.reportControllerFetchReports();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ReportDto>**

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

# **reportControllerReopenReport**
> ReportDto reportControllerReopenReport()


### Example

```typescript
import {
    ReportApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReportApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.reportControllerReopenReport(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ReportDto**

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

# **reportControllerReportProject**
> reportControllerReportProject(reportProjectBodyDto)


### Example

```typescript
import {
    ReportApi,
    Configuration,
    ReportProjectBodyDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ReportApi(configuration);

let id: string; // (default to undefined)
let reportProjectBodyDto: ReportProjectBodyDto; //

const { status, data } = await apiInstance.reportControllerReportProject(
    id,
    reportProjectBodyDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reportProjectBodyDto** | **ReportProjectBodyDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **reportControllerReportUser**
> reportControllerReportUser(reportProjectBodyDto)


### Example

```typescript
import {
    ReportApi,
    Configuration,
    ReportProjectBodyDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ReportApi(configuration);

let id: string; // (default to undefined)
let reportProjectBodyDto: ReportProjectBodyDto; //

const { status, data } = await apiInstance.reportControllerReportUser(
    id,
    reportProjectBodyDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reportProjectBodyDto** | **ReportProjectBodyDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **reportControllerResolveReport**
> ReportDto reportControllerResolveReport()


### Example

```typescript
import {
    ReportApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReportApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.reportControllerResolveReport(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ReportDto**

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

