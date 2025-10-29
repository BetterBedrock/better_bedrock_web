# CheckoutApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**checkoutControllerActivate**](#checkoutcontrolleractivate) | **GET** /checkout/activate | |
|[**checkoutControllerCreate**](#checkoutcontrollercreate) | **POST** /checkout/create | |
|[**checkoutControllerOffers**](#checkoutcontrolleroffers) | **GET** /checkout/offers | |
|[**checkoutControllerWebhook**](#checkoutcontrollerwebhook) | **POST** /checkout/webhook | |

# **checkoutControllerActivate**
> VoucherDto checkoutControllerActivate()


### Example

```typescript
import {
    CheckoutApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CheckoutApi(configuration);

let checkoutId: string; //Id of the Stripe\'s checkout session (optional) (default to undefined)
let code: string; //Code of a voucher to activate (optional) (default to undefined)

const { status, data } = await apiInstance.checkoutControllerActivate(
    checkoutId,
    code
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **checkoutId** | [**string**] | Id of the Stripe\&#39;s checkout session | (optional) defaults to undefined|
| **code** | [**string**] | Code of a voucher to activate | (optional) defaults to undefined|


### Return type

**VoucherDto**

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

# **checkoutControllerCreate**
> CreateCheckoutSessionResponseDto checkoutControllerCreate()


### Example

```typescript
import {
    CheckoutApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CheckoutApi(configuration);

let priceId: string; //Id of the Stripe\'s price (default to undefined)

const { status, data } = await apiInstance.checkoutControllerCreate(
    priceId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **priceId** | [**string**] | Id of the Stripe\&#39;s price | defaults to undefined|


### Return type

**CreateCheckoutSessionResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **checkoutControllerOffers**
> CheckoutOffersDto checkoutControllerOffers()


### Example

```typescript
import {
    CheckoutApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CheckoutApi(configuration);

const { status, data } = await apiInstance.checkoutControllerOffers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CheckoutOffersDto**

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

# **checkoutControllerWebhook**
> checkoutControllerWebhook()


### Example

```typescript
import {
    CheckoutApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CheckoutApi(configuration);

let stripeSignature: string; // (default to undefined)

const { status, data } = await apiInstance.checkoutControllerWebhook(
    stripeSignature
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **stripeSignature** | [**string**] |  | defaults to undefined|


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

