# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authControllerAuthenticate**](#authcontrollerauthenticate) | **GET** /auth/me | |
|[**authControllerGoogleAuthorize**](#authcontrollergoogleauthorize) | **POST** /auth/google | |

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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerGoogleAuthorize**
> JwtTokenDto authControllerGoogleAuthorize(authorizeDto)


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

const { status, data } = await apiInstance.authControllerGoogleAuthorize(
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
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

