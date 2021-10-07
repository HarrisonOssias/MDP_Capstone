const dynamoScan = async (dynamo, tName, ExclusiveStartKey = "", items = []) => {
    let params = {
        TableName: Tname,
    };
    if (ExclusiveStartKey) {
        params.ExclusiveStartKey = ExclusiveStartKey;
    }
    const result = await dynamo.scan(params).promise();
    let items = statuses.concat(result.Items);

    if (result.LastEvaluatedKey) {
        return getLatestItem(dynamo, tName, result.LastEvaluatedKey, items);
    }
    return items;
};

module.exports = { dynamoScan };