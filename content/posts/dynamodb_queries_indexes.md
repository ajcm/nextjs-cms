---
title: "DynamoDB Queries Index"
date: "2020-11-05"
---


### Example Indexation Table
To be abe to query a document by different fields it's necessary to create as many GSI indexes, which costs depends on the size of the elements.

In order to simplify and optimize query operation the data can be splitted between a index and a data table.

The Index table would have a partition key `Scope` to split the data between partitions and a unique id as `GUID` as Sort key.

The `GUID` would be use as a single partition key in a data table.
 
<img  src="https://public.kitboga.net/www/dynamo/dynamo5.png"  alt="dynamo db keys"  width="550"/>


#### Queries
To query each key independently  GSI must be created for each one.

*ex:
GSI: Index (Key1-Order1)*

Allows to query Key1 and sort results by Order1

To add query by more than two keys, a second key can be added to a filter expression in the query.

However this strategy will require the creation of as many GSI as the number of attributes that need to be queried.
