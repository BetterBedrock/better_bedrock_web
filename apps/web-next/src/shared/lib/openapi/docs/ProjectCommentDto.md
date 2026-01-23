# ProjectCommentDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**author** | [**ProjectCommentDtoAuthor**](ProjectCommentDtoAuthor.md) |  | [default to undefined]
**replies** | [**Array&lt;ProjectCommentDto&gt;**](ProjectCommentDto.md) |  | [optional] [default to undefined]
**id** | **string** |  | [default to undefined]
**content** | **string** |  | [default to undefined]
**authorId** | **string** |  | [default to undefined]
**projectId** | **string** |  | [default to undefined]
**parentId** | **string** |  | [default to undefined]
**pinned** | **boolean** |  | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**deleted** | **boolean** |  | [default to undefined]
**deletedAt** | **string** |  | [default to undefined]

## Example

```typescript
import { ProjectCommentDto } from './api';

const instance: ProjectCommentDto = {
    author,
    replies,
    id,
    content,
    authorId,
    projectId,
    parentId,
    pinned,
    createdAt,
    deleted,
    deletedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
