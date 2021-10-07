const dynamoScan = async (dynamo, tName, FilterExpression = "", ExpressionAttributeValues = "", ExclusiveStartKey = "", items = []) => {
    let params = {
        TableName: tName
    };
    if(FilterExpression && ExpressionAttributeValues) {
        params.FilterExpression = FilterExpression;
        params.ExpressionAttributeValues = ExpressionAttributeValues;
    }
    if (ExclusiveStartKey) {
        params.ExclusiveStartKey = ExclusiveStartKey;
    }
    const result = await dynamo.scan(params).promise();
    items = items.concat(result.Items);

    if (result.LastEvaluatedKey) {
        return getLatestItem(dynamo, tName, FilterExpression, ExpressionAttributeValues, result.LastEvaluatedKey, items);
    }
    return items;
};

module.exports = { dynamoScan };