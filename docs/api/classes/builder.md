# Class: Builder

Generate .ghinfo files with repo, npm package and media information

## Table of contents

### Constructors

- [constructor](builder.md#constructor)

### Methods

- [build](builder.md#build)
- [generate](builder.md#generate)

## Constructors

### constructor

\+ **new Builder**(`dir`: *string*, `type`: *string*): [*Builder*](builder.md)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`dir` | *string* | Directory with media files   |
`type` | *string* | Repository content type    |

**Returns:** [*Builder*](builder.md)

## Methods

### build

▸ **build**(`paths`: *string*[], `pkg`: PackageJson, `repo`: *string*): IGitHubInfo

Build .ghinfo file structure

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`paths` | *string*[] | media file paths   |
`pkg` | PackageJson | package.json content   |
`repo` | *string* | repository name   |

**Returns:** IGitHubInfo

.ghinfo content

___

### generate

▸ **generate**(): *Promise*<void\>

create or rewrite .ghinfo file

**Returns:** *Promise*<void\>
