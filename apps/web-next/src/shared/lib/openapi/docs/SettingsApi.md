# SettingsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**settingsControllerSettings**](#settingscontrollersettings) | **GET** /settings | |
|[**settingsControllerUpdateSettings**](#settingscontrollerupdatesettings) | **PATCH** /settings | |

# **settingsControllerSettings**
> SettingsDto settingsControllerSettings()


### Example

```typescript
import {
    SettingsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SettingsApi(configuration);

const { status, data } = await apiInstance.settingsControllerSettings();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**SettingsDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **settingsControllerUpdateSettings**
> settingsControllerUpdateSettings(settingsDto)


### Example

```typescript
import {
    SettingsApi,
    Configuration,
    SettingsDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SettingsApi(configuration);

let settingsDto: SettingsDto; //

const { status, data } = await apiInstance.settingsControllerUpdateSettings(
    settingsDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **settingsDto** | **SettingsDto**|  | |


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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

