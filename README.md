# input-validator

This package validates and cleans up user input especially for Graph QL servers.

## Example

``` javascript
const {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLString
} = require('graphql')
const inputValidator = require('@serohtec/input-validator')

const createUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    email: {
      type: GraphQLString,
      format: 'email',
      maximumLength: 100,
      normalizeFormat: true
    }
  }
})
const inputSchema = inputValidator.createInputSchemaFromInputType(createUserInputType)

const input = {
  email: 'john.doe@company.com'
}  
const {cleanedInput, errors} = inputValidator.validateAndCleanInputUp({input, inputSchema})
```

### Supported fields

The following fields are supported for arrays:
* maximumItems: number
* minimumItems: number
* uniqueItems: boolean

The following fields are supported for numbers:
* minimumValue: number
* maximumValue: number

The following fields are supported for strings:
* countryIsoCodeField: string
* enum: array of valid string values
* format: string
  * email
  * date
  * dateTime
  * mobile
  * iban
  * loginId
  * password
  * postalCode
  * time
  * url
  * vatIdentificationNumber
  * week
* maximumLength: number
* minimumLength: number
* normalizeFormat: boolean
* required: boolean (Will be automatically set for non null fields.)
* toLowerCase: boolean
* toUpperCase: boolean
* trim: boolean
* validateFormat: boolean
