import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class Database extends cdk.Construct {
  public readonly mainTable: dynamodb.Table;
  public readonly auditTrailTable: dynamodb.Table;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    const mainTable = new dynamodb.Table(scope, "MainTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
      partitionKey: {
        name: "pk",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "sk",
        type: dynamodb.AttributeType.STRING,
      },
    });

    mainTable.addGlobalSecondaryIndex({
      indexName: "byType",
      projectionType: dynamodb.ProjectionType.ALL,
      partitionKey: {
        name: "type",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "sk",
        type: dynamodb.AttributeType.STRING,
      },
    });

    mainTable.addGlobalSecondaryIndex({
      indexName: "byParentDashboard",
      projectionType: dynamodb.ProjectionType.ALL,
      partitionKey: {
        name: "parentDashboardId",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "version",
        type: dynamodb.AttributeType.NUMBER,
      },
    });

    mainTable.addGlobalSecondaryIndex({
      indexName: "byTopicArea",
      projectionType: dynamodb.ProjectionType.ALL,
      partitionKey: {
        name: "topicAreaId",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "pk",
        type: dynamodb.AttributeType.STRING,
      },
    });

    mainTable.addGlobalSecondaryIndex({
      indexName: "byFriendlyURL",
      projectionType: dynamodb.ProjectionType.ALL,
      partitionKey: {
        name: "friendlyURL",
        type: dynamodb.AttributeType.STRING,
      },
    });

    const auditTrailTable = new dynamodb.Table(scope, "AuditTrail", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "pk",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "sk",
        type: dynamodb.AttributeType.STRING,
      },
    });

    this.mainTable = mainTable;
    this.auditTrailTable = auditTrailTable;
  }
}
