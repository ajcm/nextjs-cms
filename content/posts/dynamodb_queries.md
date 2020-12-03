---
title: "DynamoDB Queries"
date: "2020-10-23"
---

One of the limitation of NoSql is the absence of support for `Inner Joins`  a crucial element in relational databases as it allows for the use of Foreign Keys, Mind that MongoDb appears to have such functionality  `$lookup (aggregation)`

In the case of DynameDB this becomes even a bigger issue because Queries  (the equivalent to Select) only support key expressions using the Primary Keys, neverthless a it can be added a secondary filter with any other attribute.

The query Key Expression `KeyConditionExpression` **must contain** the partition key in a equal/not equal condition and case if it's used an condtional expression for the sort key.

Ordering the return elements can be troublesome as only one sort key is supported by query

### Example: Simple document
For example to save a documento to a table one can split it in sections, where `document (partition key)` is a document unique id and `section (sort key)` a label for each section. T
A GUID is added to identify each row.

<img  src="https://public.kitboga.net/www/dynamo/dynamo4.png"  alt="dynamo db keys"  width="500"/>

To retrieve a section a Get operation can be used `Get(document,section)`.

However to get all sections for a document ordered by creation time it's necessary to use a global index (Document, CreationTime)

*Query Index : Document = ID*

Order of return element can be set with `scanIndexForward`
Pagination uses `limit` and `ExclusiveStartKey` as cursor.
