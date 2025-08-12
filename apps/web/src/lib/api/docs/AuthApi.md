# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authControllerAdminAuthenticate**](#authcontrolleradminauthenticate) | **GET** /auth/admin | |
|[**authControllerAuthenticate**](#authcontrollerauthenticate) | **GET** /auth | |
|[**authControllerAuthorize**](#authcontrollerauthorize) | **POST** /auth | |

# **authControllerAdminAuthenticate**
> authControllerAdminAuthenticate()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.authControllerAdminAuthenticate();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully authenticated |  -  |
|**401** | Could not authenticate |  -  |
|**500** | Secret for admin panel is not set |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerAuthenticate**
> UserDto authControllerAuthenticate()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.authControllerAuthenticate();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully authenticated |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerAuthorize**
> JwtTokenDto authControllerAuthorize(authorizeDto)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    AuthorizeDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let authorizeDto: AuthorizeDto; //

const { status, data } = await apiInstance.authControllerAuthorize(
    authorizeDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authorizeDto** | **AuthorizeDto**|  | |


### Return type

**JwtTokenDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successfully authorized connection with account  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

