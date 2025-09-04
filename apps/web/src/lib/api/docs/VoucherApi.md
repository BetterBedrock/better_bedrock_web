# VoucherApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**voucherControllerCreate**](#vouchercontrollercreate) | **POST** /voucher | |
|[**voucherControllerUpdate**](#vouchercontrollerupdate) | **PATCH** /voucher/{id} | |
|[**voucherControllerVouchers**](#vouchercontrollervouchers) | **GET** /voucher | |

# **voucherControllerCreate**
> VoucherDto voucherControllerCreate(createVoucher)


### Example

```typescript
import {
    VoucherApi,
    Configuration,
    CreateVoucher
} from './api';

const configuration = new Configuration();
const apiInstance = new VoucherApi(configuration);

let createVoucher: CreateVoucher; //

const { status, data } = await apiInstance.voucherControllerCreate(
    createVoucher
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createVoucher** | **CreateVoucher**|  | |


### Return type

**VoucherDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **voucherControllerUpdate**
> VoucherDto voucherControllerUpdate(updateVoucher)


### Example

```typescript
import {
    VoucherApi,
    Configuration,
    UpdateVoucher
} from './api';

const configuration = new Configuration();
const apiInstance = new VoucherApi(configuration);

let id: string; // (default to undefined)
let updateVoucher: UpdateVoucher; //

const { status, data } = await apiInstance.voucherControllerUpdate(
    id,
    updateVoucher
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateVoucher** | **UpdateVoucher**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**VoucherDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **voucherControllerVouchers**
> Array<VoucherDto> voucherControllerVouchers()


### Example

```typescript
import {
    VoucherApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new VoucherApi(configuration);

const { status, data } = await apiInstance.voucherControllerVouchers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<VoucherDto>**

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

