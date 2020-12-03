---
title: "DynamoDB Basics"
date: "2020-10-23"
---

Amazon DynamoDB is a fully managed proprietary NoSQL database service that supports key-value and document data structures. Although at a first stance it appears simple and easy to use is much to learn underneath the API and in the details of some of the operations.
The operational costs, particularly choosing between *Provisioned* and *On-demand*, is a arduous task comprehending complex calculations. 

Additional, implementing a complex ER model in DynamoDB, or in any-other NoSQL DB can be next to impossible.

### 1. Primary Key
The Primary Key must be a unique value, DynamoDB supports two types of primary keys:

**Partition key**
A simple primary key, composed of one attribute known as the `Partition key`, also known as *HashKey*

**Composite Key**
 Referred to as a `Composite Primary Key`, this type of key is composed of two attributes. The first attribute is the `Partition key`, and the second attribute is the `Sort key`, also know as *Range Key*. In a composite key the hash key can be the same for multiple values but the combination must be an unique value.
 
<img  src="https://public.kitboga.net/www/dynamo/dynamodb-partition-key.gif"  alt="dynamo db keys"  width="350"/>


See also:
[Choosing the Right DynamoDB Partition Key](https://aws.amazon.com/blogs/database/choosing-the-right-dynamodb-partition-key/)

### 2. Basic operations
**Put, Get, Delete**
DynamoDB provides four operations for basic create, read, update, and delete (CRUD) functionality:
-   `PutItem`  — Create an item.    
-   `GetItem`  — Read an item.
-   `UpdateItem`  — Update an item.
-   `DeleteItem`  — Delete an item.

In addition to the four basic CRUD operations, DynamoDB also provides the following:
-   `BatchGetItem`  — Read up to 100 items from one or more tables.    
-   `BatchWriteItem`  — Create or delete up to 25 items in one or more tables.

### 3. Queries and Scans
Query and Scan are similar operations with substantial differences

**Query**
- search only primary key values
- conditions expression limits data retrieved and cost
- optimized for speed and only marginally slower than a get operation
- read units consumed depend on the total size of all the items returned.
- can return values ordered by sort key

**Scan**
- parses all items in table 
- significant slower than queries
- a scan operation can consume all read units, it can slow down other operations
- doesn't sort values

Both operations support pagination.

Queries should be used as default as they're more performant and cost-effective and scans only invoked in exceptional cases, operation than cannot rely in a query. 

See Also:
[DynamoDB: Understanding Query and Scan Operations](http://techtraits.com/cloud/nosql/2012/06/28/Amazon-DynamoDB-Understanding-Query-and-Scan-operations.html)

### 4. Query
Run a query through the values of Primary Key or Index Keys.
- Supports a `KeyConditionExpression` that limits the data retrieved by the operation but which condition can only contains fields from the key
- Can have a `FilterExpression` that filters the data fetched from the query, the filter condition can contain any field, however this filter has no impact in reducing the cost of the operation.
- By default values are returned by the order of Sort Key when of the type numeric

**KeyConditionExpression**
This a mandatory field, this condition can only contain the attributes that correspond to the Primary Key or the Index Key.

Conditions expression:
`Partition Key` - equal/not equal
`Sort Key` - equal/not equal/ less than/greater than/IN

All the keys must be included in the condition, if a `Sort Key` exist it must be included in the condition along with the `Partition Key`.

If the Sort key corresponds to a attribute from a numeric data type the values are returned by the order of that attribute, even if the key is not included in the query.

**FilterExpression**
The filter expression can contain  values that don't belong to the key, this selection occurs after the values are retrieved. Contrary to what happens with `KeyConditionExpression` it doesn't reduce the cost of the query when limiting the data retrieved by the operation.

The major with issue with queries is that they're limited to Primary Keys conditions, to query other fields rather than the ones from the Table's Primary Key its necessary to create a Index (LSI or GSI), one for each field.

```javascript
 KeyConditionExpression: '#key = :keyvalue ',
  FilterExpression: "#field = :fieldvalue",
  ExpressionAttributeNames: { '#key': key,"#field":field},
  ExpressionAttributeValues: { ':keyvalue': keyvalue,':fieldvalue':fieldvalue }
```
Mind that `KeyConditionExpression` is mandatory, you cannot have a Query operation with just the `FilterExpression`, for this purpose one has to use a Scan.

See also:
[Querying on Multiple Attributes in Amazon DynamoDB](https://aws.amazon.com/blogs/database/querying-on-multiple-attributes-in-amazon-dynamodb/)

### 5. Scan
Retrieves all items from the table, the operation can be more expensive than a query so that the last is preferred. **It supports pagination but it doesn't order the return values.**

**FilterExpression**
Filter expression can have any field.

```javascript
  FilterExpression: "#key = :value",
  ExpressionAttributeNames: { '#key': key},
  ExpressionAttributeValues: { ':value': value}
```

### Indexes
By default queries are tangled with the Primary key, the only way of create a query without relying on the Primary Key is to create an Index, there are two types:

**Local Secondary Index (LSI)**
If one want to run a query using the same partition key but a different sort key a LSI can be specified at table creation table. LSI are costless but the query is still limited to the same `Hash Key`

**Global Secondary Index (GSI)**
To use query a different Partition key (`Hash Key` and `Sort Key`) a GSI must be created (can be after table creation), however this index comes at a cost because it requires provisioned throughput.
And since each field to be queried require a new GSI this can end up with having several GSI that will increase cost and data access layer complexity

https://docs.amazonaws.cn/en_us/amazondynamodb/latest/developerguide/SecondaryIndexes.html

### 6. Resources

[AWS DynamoDB developer guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)

[AWS DynamoDB Javascript Client](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html)


> V0.2 
> 23/10/2020
