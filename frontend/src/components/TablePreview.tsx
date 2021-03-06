import React, { useMemo } from "react";
import MarkdownRender from "./MarkdownRender";
import Table from "./Table";

type Props = {
  title: string;
  summary: string;
  headers: Array<string>;
  data?: Array<object>;
  summaryBelow: boolean;
};

const TablePreview = (props: Props) => {
  const { headers, data, summaryBelow, summary, title } = props;

  return (
    <div className="overflow-hidden">
      <h2 className="margin-left-1 margin-bottom-1">{title}</h2>
      {!summaryBelow && (
        <MarkdownRender
          source={summary}
          className="margin-left-1 margin-top-0 margin-bottom-3 tableSummaryAbove"
        />
      )}
      <Table
        selection="none"
        rows={useMemo(() => data || [], [data])}
        className="margin-left-1"
        initialSortAscending
        columns={useMemo(
          () =>
            headers.map((header, i) => {
              return {
                Header: header,
                id: String(i),
                accessor: header,
                minWidth: 150,
                Cell: (props: any) => {
                  const row = props.row.original;
                  return row[header] || null;
                },
              };
            }),
          [headers]
        )}
      />
      {summaryBelow && (
        <MarkdownRender
          source={summary}
          className="margin-left-1 margin-top-3 margin-bottom-0 tableSummaryBelow"
        />
      )}
    </div>
  );
};

export default TablePreview;
