import React from "react";
import { useJsonDataset } from "../hooks";
import { ChartWidget, ChartType } from "../models";
import LineChartPreview from "../components/LineChartPreview";
import ColumnChartPreview from "../components/ColumnChartPreview";
import BarChartPreview from "../components/BarChartPreview";
import PartWholeChartPreview from "../components/PartWholeChartPreview";

interface Props {
  widget: ChartWidget;
}

function ChartWidgetComponent(props: Props) {
  const { content } = props.widget;
  const { json } = useJsonDataset(content.s3Key.json);

  if (!json || json.length === 0) {
    return null;
  }

  const keys = Object.keys(json[0] as Array<string>);
  switch (content.chartType) {
    case ChartType.LineChart:
      return (
        <LineChartPreview
          title={props.widget.showTitle ? content.title : ""}
          summary={content.summary}
          summaryBelow={content.summaryBelow}
          lines={keys}
          data={json}
        />
      );

    case ChartType.ColumnChart:
      return (
        <ColumnChartPreview
          title={props.widget.showTitle ? content.title : ""}
          summary={content.summary}
          summaryBelow={content.summaryBelow}
          columns={keys}
          data={json}
        />
      );

    case ChartType.BarChart:
      return (
        <BarChartPreview
          title={props.widget.showTitle ? content.title : ""}
          summary={content.summary}
          summaryBelow={content.summaryBelow}
          bars={keys}
          data={json}
        />
      );

    case ChartType.PartWholeChart:
      return (
        <PartWholeChartPreview
          title={props.widget.showTitle ? content.title : ""}
          summary={content.summary}
          summaryBelow={content.summaryBelow}
          parts={keys}
          data={json}
        />
      );

    default:
      return null;
  }
}

export default ChartWidgetComponent;
