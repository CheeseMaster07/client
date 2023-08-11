import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';

import { useDispatch } from 'react-redux';

import { getCoordinates } from '../../../../../actions/chart';

export default function BarChart({ data, options }) {
  const dispatch = useDispatch()
  const chartRef = useRef(null); // To hold the chart instance

  useEffect(() => {
    const ctx = document.getElementById('myChart');

    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy the previous chart instance
    }

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });

    // Attach the event listener to the chartRef.current element
    chartRef.current.canvas.addEventListener('mousemove', (e) => {
      mousemoveHandler(chartRef.current, e)
    });

    // Return a cleanup function to destroy the chart and remove the event listener
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        // chartRef.current.canvas.removeEventListener('mousemove', mousemoveHandler);
      }
    };
  }, [data, options]); // Dependency array ensures effect runs when data or options change



  function mousemoveHandler(chart, mousemove) {
    const { data, scales: { x, y1, y2, y3, y4, y5 } } = chart
    const xCoor = mousemove.offsetX
    const y1Coor = mousemove.offsetY
    // dispatch(getCoordinates({
    //   x: data.labels[x.getValueForPixel(xCoor)],
    //   y1: y1.getValueForPixel(y1Coor),
    //   y2: y2.getValueForPixel(y1Coor),
    //   y3: y3.getValueForPixel(y1Coor),
    //   y4: y4.getValueForPixel(y1Coor),
    //   y5: y5.getValueForPixel(y1Coor),

    // }))


  }

  return (
    <canvas id="myChart"></canvas>
  );
}
