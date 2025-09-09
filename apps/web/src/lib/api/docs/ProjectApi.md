# ProjectApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**projectControllerCancelSubmission**](#projectcontrollercancelsubmission) | **PATCH** /project/submit/cancel/{id} | |
|[**projectControllerComments**](#projectcontrollercomments) | **GET** /project/comments/{projectId} | |
|[**projectControllerCreate**](#projectcontrollercreate) | **POST** /project | |
|[**projectControllerDecline**](#projectcontrollerdecline) | **PATCH** /project/decline/{id} | |
|[**projectControllerDelete**](#projectcontrollerdelete) | **DELETE** /project/{id} | |
|[**projectControllerDeleteComment**](#projectcontrollerdeletecomment) | **DELETE** /project/comment/{id} | |
|[**projectControllerDeleteProduction**](#projectcontrollerdeleteproduction) | **DELETE** /project/production/{id} | |
|[**projectControllerDeleteRating**](#projectcontrollerdeleterating) | **DELETE** /project/rate/{projectId} | |
|[**projectControllerDraftDetails**](#projectcontrollerdraftdetails) | **GET** /project/draft/{id} | |
|[**projectControllerGetProjectRating**](#projectcontrollergetprojectrating) | **GET** /project/rate/{projectId} | |
|[**projectControllerPostComment**](#projectcontrollerpostcomment) | **POST** /project/comment/{projectId} | |
|[**projectControllerProjectDetails**](#projectcontrollerprojectdetails) | **GET** /project/details/{id} | |
|[**projectControllerPublish**](#projectcontrollerpublish) | **PATCH** /project/publish/{id} | |
|[**projectControllerRateProject**](#projectcontrollerrateproject) | **POST** /project/rate/{projectId}/{rating} | |
|[**projectControllerReplyToComment**](#projectcontrollerreplytocomment) | **POST** /project/comment/{projectId}/reply/{parentId} | |
|[**projectControllerSearch**](#projectcontrollersearch) | **GET** /project | |
|[**projectControllerSubmit**](#projectcontrollersubmit) | **PATCH** /project/submit/{id} | |
|[**projectControllerSubmitted**](#projectcontrollersubmitted) | **GET** /project/submitted | |
|[**projectControllerUpdate**](#projectcontrollerupdate) | **PATCH** /project/{id} | |
|[**projectControllerUploadProjectFile**](#projectcontrolleruploadprojectfile) | **POST** /project/file/{id} | |
|[**projectControllerUserProjects**](#projectcontrolleruserprojects) | **GET** /project/user/{id} | |

# **projectControllerCancelSubmission**
> projectControllerCancelSubmission()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.projectControllerCancelSubmission(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **projectControllerComments**
> Array<ProjectCommentDto> projectControllerComments()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let projectId: string; // (default to undefined)

const { status, data } = await apiInstance.projectControllerComments(
    projectId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|


### Return type

**Array<ProjectCommentDto>**

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

# **projectControllerCreate**
> ProjectDto projectControllerCreate(createProjectBodyDto)


### Example

```typescript
import {
    ProjectApi,
    Configuration,
    CreateProjectBodyDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let createProjectBodyDto: CreateProjectBodyDto; //

const { status, data } = await apiInstance.projectControllerCreate(
    createProjectBodyDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createProjectBodyDto** | **CreateProjectBodyDto**|  | |


### Return type

**ProjectDto**

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

# **projectControllerDecline**
> projectControllerDecline(declineProjectDto)


### Example

```typescript
import {
    ProjectApi,
    Configuration,
    DeclineProjectDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; // (default to undefined)
let declineProjectDto: DeclineProjectDto; //

const { status, data } = await apiInstance.projectControllerDecline(
    id,
    declineProjectDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **declineProjectDto** | **DeclineProjectDto**|  | |
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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **projectControllerDelete**
> projectControllerDelete()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.projectControllerDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **projectControllerDeleteComment**
> projectControllerDeleteComment()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.projectControllerDeleteComment(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **projectControllerDeleteProduction**
> projectControllerDeleteProduction()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.projectControllerDeleteProduction(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **projectControllerDeleteRating**
> ProjectRatingDto projectControllerDeleteRating()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let projectId: string; // (default to undefined)

const { status, data } = await apiInstance.projectControllerDeleteRating(
    projectId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|


### Return type

**ProjectRatingDto**

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

# **projectControllerDraftDetails**
> DetailedProjectDto projectControllerDraftDetails()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.projectControllerDraftDetails(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**DetailedProjectDto**

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

# **projectControllerGetProjectRating**
> ProjectRatingDto projectControllerGetProjectRating()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let projectId: string; // (default to undefined)

const { status, data } = await apiInstance.projectControllerGetProjectRating(
    projectId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|


### Return type

**ProjectRatingDto**

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

# **projectControllerPostComment**
> ProjectCommentDto projectControllerPostComment(postCommentParamsDto)


### Example

```typescript
import {
    ProjectApi,
    Configuration,
    PostCommentParamsDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let projectId: string; // (default to undefined)
let postCommentParamsDto: PostCommentParamsDto; //

const { status, data } = await apiInstance.projectControllerPostComment(
    projectId,
    postCommentParamsDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **postCommentParamsDto** | **PostCommentParamsDto**|  | |
| **projectId** | [**string**] |  | defaults to undefined|


### Return type

**ProjectCommentDto**

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

# **projectControllerProjectDetails**
> DetailedProjectDto projectControllerProjectDetails()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.projectControllerProjectDetails(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**DetailedProjectDto**

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

# **projectControllerPublish**
> projectControllerPublish()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.projectControllerPublish(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **projectControllerRateProject**
> ProjectRatingDto projectControllerRateProject()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let projectId: string; // (default to undefined)
let rating: number; // (default to undefined)

const { status, data } = await apiInstance.projectControllerRateProject(
    projectId,
    rating
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | defaults to undefined|
| **rating** | [**number**] |  | defaults to undefined|


### Return type

**ProjectRatingDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **projectControllerReplyToComment**
> ProjectCommentDto projectControllerReplyToComment(postCommentParamsDto)


### Example

```typescript
import {
    ProjectApi,
    Configuration,
    PostCommentParamsDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let projectId: string; // (default to undefined)
let parentId: string; // (default to undefined)
let postCommentParamsDto: PostCommentParamsDto; //

const { status, data } = await apiInstance.projectControllerReplyToComment(
    projectId,
    parentId,
    postCommentParamsDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **postCommentParamsDto** | **PostCommentParamsDto**|  | |
| **projectId** | [**string**] |  | defaults to undefined|
| **parentId** | [**string**] |  | defaults to undefined|


### Return type

**ProjectCommentDto**

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

# **projectControllerSearch**
> SearchProjectsDto projectControllerSearch()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let type: string; // (optional) (default to undefined)
let text: string; // (optional) (default to undefined)
let page: number; // (optional) (default to 1)

const { status, data } = await apiInstance.projectControllerSearch(
    type,
    text,
    page
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **type** | [**string**] |  | (optional) defaults to undefined|
| **text** | [**string**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to 1|


### Return type

**SearchProjectsDto**

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

# **projectControllerSubmit**
> projectControllerSubmit()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.projectControllerSubmit(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **projectControllerSubmitted**
> Array<SimpleProjectDto> projectControllerSubmitted()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

const { status, data } = await apiInstance.projectControllerSubmitted();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<SimpleProjectDto>**

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

# **projectControllerUpdate**
> ProjectDto projectControllerUpdate(updateProjectDto)


### Example

```typescript
import {
    ProjectApi,
    Configuration,
    UpdateProjectDto
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; // (default to undefined)
let updateProjectDto: UpdateProjectDto; //

const { status, data } = await apiInstance.projectControllerUpdate(
    id,
    updateProjectDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateProjectDto** | **UpdateProjectDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ProjectDto**

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

# **projectControllerUploadProjectFile**
> UploadFileDto projectControllerUploadProjectFile()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; // (default to undefined)
let file: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.projectControllerUploadProjectFile(
    id,
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|
| **file** | [**File**] |  | (optional) defaults to undefined|


### Return type

**UploadFileDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **projectControllerUserProjects**
> Array<SimpleProjectDto> projectControllerUserProjects()


### Example

```typescript
import {
    ProjectApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.projectControllerUserProjects(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Array<SimpleProjectDto>**

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

