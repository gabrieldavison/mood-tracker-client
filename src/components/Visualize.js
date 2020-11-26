import React, { useEffect, useCallback, useContext, useState } from "react";
import Header from "./Header";
import Nav from "./Nav";
import { VegaLite } from "react-vega";
import client from "../utils/feathers";
import { LoginContext } from "./App";
import { css } from "emotion";

const graphContainer = css`
  width: 100%;
  height: 20rem;
  margin-top: 4rem;
`;

export default function Visualize() {
  const [graphData, setGraphData] = useState();
  const authenticatedUser = useContext(LoginContext);
  const [timeFrame, setTimeFrame] = useState("month");

  const vegaSpec = {
    width: "container",
    height: 400,
    description: "Mood over time",

    config: {
      legend: {
        labelFontSize: 20,
        titleFontSize: 20,
      },
      axis: {
        labelFontSize: 10,
        titleFontSize: 20,
      },
    },

    mark: {
      type: "line",
      point: true,
    },

    encoding: {
      x: { title: "Date", field: "date", type: "temporal", as: "month" },
      y: {
        aggregate: "mean",
        field: "val",
        type: "quantitative",
        title: "Mood",
      },
      color: { field: "label", type: "nominal", title: "" },
    },
    data: { name: "graph" },
  };

  const getGraphData = useCallback(async () => {
    const userID = authenticatedUser.login.user._id;
    const log = client.service("log");
    console.log(userID);

    const rawGraphData = await log.find({
      query: {
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
        userId: userID,
        $select: ["happy", "calm", "createdAt"],
      },
    });
    console.log(rawGraphData);

    const happyData = rawGraphData.data.map((item) => {
      return {
        label: "Happy",
        val: item.happy,
        date: item.createdAt.split("T")[0],
      };
    });

    const calmData = rawGraphData.data.map((item) => {
      return {
        label: "Calm",
        val: item.calm,
        date: item.createdAt.split("T")[0],
      };
    });
    setGraphData({ graph: [...happyData, ...calmData] });
  }, [authenticatedUser.login.user._id]);

  useEffect(() => {
    getGraphData(timeFrame);
  }, [getGraphData, timeFrame]);

  return (
    <>
      <Header />
      <Nav />
      {console.log(graphData)}
      <div className={graphContainer}>
        {graphData ? (
          <VegaLite
            spec={vegaSpec}
            data={graphData}
            style={{ width: "100%" }}
          />
        ) : null}
      </div>
    </>
  );
}
