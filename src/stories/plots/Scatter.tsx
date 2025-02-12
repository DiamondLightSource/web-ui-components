import React, { useMemo, useCallback, useRef } from "react";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { scaleLinear, scaleLog } from "@visx/scale";
import { withTooltip, Tooltip } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { voronoi } from "@visx/voronoi";
import { GridColumns, GridRows } from "@visx/grid";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { localPoint } from "@visx/event";
import { BasePoint, CompleteScatterPlotOptions, ScatterPlotOptions } from "utils/interfaces";
import { detectZeroCross, mergeDeep, roundTo } from "utils/generic";
import { defaultMargin } from "utils/config/plot";

const x = (d: BasePoint) => d.x;
const y = (d: BasePoint) => d.y;

export type ScatterProps = {
  width?: number;
  height?: number;
  options?: ScatterPlotOptions;
  data: BasePoint[];
  /* Threshold (as a fraction of data range) for eliminating data points */
  decimationThreshold?: number;
  onPointClicked?: (x: number, y: number) => void;
};

const defaultPlotOptions: ScatterPlotOptions = {
  x: { domain: { min: undefined, max: undefined }, log: false, base: 10, precision: 2, label: "" },
  y: { domain: { min: undefined, max: undefined }, log: false, base: 10, precision: 2, label: "" },
  points: { dotRadius: 2 },
};

export const ScatterPlot = withTooltip<ScatterProps, BasePoint>(
  ({
    width = 100,
    height = 100,
    hideTooltip,
    showTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
    options,
    onPointClicked,
    decimationThreshold,
    data,
  }: ScatterProps & WithTooltipProvidedProps<BasePoint>) => {
    const svgRef = useRef<SVGSVGElement>(null);
    // Voronoi neighbour radius
    const neighborRadius = 4;

    const config: CompleteScatterPlotOptions = useMemo(() => {
      const newConfig = mergeDeep(defaultPlotOptions, options ?? {});

      const yValues = data.map((point) => point.y);
      const xValues = data.map((point) => point.x);

      newConfig.x.domain = {
        min: newConfig.x.domain.min ?? Math.min(...xValues),
        max: newConfig.x.domain.max ?? Math.max(...xValues),
      };

      newConfig.y.domain = {
        min: newConfig.y.domain.min ?? Math.min(...yValues),
        max: newConfig.y.domain.max ?? Math.max(...yValues),
      };

      detectZeroCross(newConfig.y);
      detectZeroCross(newConfig.x);

      return newConfig as CompleteScatterPlotOptions;
    }, [data, options]);

    const decimatedData = useMemo(() => {
      if (config.x.domain.max === undefined) {
        return [];
      }

      const boundaryCheckedData = data.filter(
        (d) =>
          config.x.domain.min <= x(d) &&
          config.x.domain.max >= x(d) &&
          config.y.domain.min <= y(d) &&
          config.y.domain.max >= y(d),
      );

      if (!decimationThreshold || !width) {
        return boundaryCheckedData;
      }

      const yThreshold = (config.y.domain.max - config.y.domain.min) * decimationThreshold;
      const xThreshold = (config.x.domain.max - config.x.domain.min) * decimationThreshold;

      // Calculate optimisation lookahead window
      const lookahead = Math.floor(
        boundaryCheckedData.length / width / (config.points.dotRadius * 3),
      );

      if (lookahead === 0) {
        return boundaryCheckedData;
      }

      // Look ahead to the next n points. If any of them is sufficiently close, ignore the current point
      return boundaryCheckedData.filter((p, i) => {
        if (i < lookahead || xThreshold < Math.abs(p.x - data[i - 1].x)) {
          return true;
        }

        for (let j = lookahead; j > 0; j--) {
          if (yThreshold > Math.abs(p.y - boundaryCheckedData[i - j].y)) {
            return false;
          }
        }

        return true;
      });
    }, [data, config, decimationThreshold, width]);

    const xMax = useMemo(() => width - defaultMargin.left - defaultMargin.right, [width]);
    const yMax = useMemo(() => height - defaultMargin.top - defaultMargin.bottom, [height]);

    const xScale = useMemo(() => {
      const xOptions = {
        domain: [config.x.domain.min, config.x.domain.max],
        range: [0, xMax],
      };

      return config.x.log
        ? scaleLog<number>({ ...xOptions, base: config.x.base })
        : scaleLinear<number>(xOptions);
    }, [xMax, config]);

    const yScale = useMemo(() => {
      const yOptions = {
        domain: [config.y.domain.min, config.y.domain.max],
        range: [yMax, 0],
        nice: true,
      };

      return config.y.log
        ? scaleLog<number>({ ...yOptions, base: config.y.base })
        : scaleLinear<number>(yOptions);
    }, [yMax, config]);

    const voronoiLayout = useMemo(
      () =>
        voronoi<BasePoint>({
          x: (d) => xScale(x(d)),
          y: (d) => yScale(y(d)),
          width,
          height,
        })(decimatedData),
      [width, height, xScale, yScale, decimatedData],
    );

    const findClosest = useCallback(
      (event: React.MouseEvent | React.TouchEvent) => {
        if (!svgRef.current) return;
        const point = localPoint(svgRef.current, event);
        if (!point) return;
        return voronoiLayout.find(
          point.x - defaultMargin.left,
          point.y - defaultMargin.top,
          neighborRadius,
        );
      },
      [voronoiLayout],
    );

    const handleMouseClick = useCallback(
      (event: React.MouseEvent) => {
        const closest = findClosest(event);
        if (closest && onPointClicked) {
          onPointClicked(x(closest.data), y(closest.data));
        }
      },
      [findClosest, onPointClicked],
    );

    const handleMouseMove = useCallback(
      (event: React.MouseEvent | React.TouchEvent) => {
        clearTimeout(2);
        const closest = findClosest(event);
        if (closest) {
          showTooltip({
            tooltipLeft: xScale(x(closest.data)),
            tooltipTop: yScale(y(closest.data)),
            tooltipData: closest.data,
          });
        }
      },
      [xScale, yScale, showTooltip, findClosest],
    );

    const handleMouseLeave = useCallback(() => {
      setTimeout(() => {
        hideTooltip();
      }, 300);
    }, [hideTooltip]);

    return (
      <div>
        <svg data-testid='graph-svg' width={width} height={height} ref={svgRef}>
          <rect
            width={xMax}
            height={yMax}
            rx={14}
            x={defaultMargin.left}
            y={defaultMargin.top}
            fill='white'
            aria-label='Graph'
            shapeRendering='optimizeSpeed'
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseLeave}
            onClick={handleMouseClick}
          />
          <Group pointerEvents='none' left={defaultMargin.left} top={defaultMargin.top}>
            <GridRows
              shapeRendering='optimizeSpeed'
              scale={yScale}
              width={xMax}
              height={yMax}
              stroke='#e0e0e0'
            />
            <GridColumns
              shapeRendering='optimizeSpeed'
              scale={xScale}
              width={xMax}
              height={yMax}
              stroke='#e0e0e0'
            />
            <AxisBottom
              label={config.x.label}
              top={yMax}
              scale={xScale}
              numTicks={5}
              tickFormat={(v) => roundTo(v as number, config.x.precision)}
            />
            <AxisLeft
              label={config.y.label}
              scale={yScale}
              numTicks={5}
              tickFormat={(v) => roundTo(v as number, config.y.precision)}
            />
            {decimatedData.map((point, i) => (
              <Circle
                data-testid='dot'
                key={`point-${decimatedData[0]}-${i}`}
                className='dot'
                cx={xScale(x(point))}
                cy={yScale(y(point))}
                r={config.points.dotRadius}
                fill={tooltipData === point ? "pink" : "#ff5733"}
              />
            ))}
          </Group>
        </svg>
        {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
          <Tooltip left={tooltipLeft + 10} top={tooltipTop + 10}>
            <div aria-label='X'>
              <b>x:</b> {x(tooltipData)}
            </div>
            <div aria-label='Y'>
              <b>y:</b> {y(tooltipData)}
            </div>
          </Tooltip>
        )}
      </div>
    );
  },
);
