import { useCallback, useMemo } from "react";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear, scaleLog } from "@visx/scale";
import { withTooltip, Tooltip } from "@visx/tooltip";
import { GridRows } from "@visx/grid";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { BoxPlotOptions, BoxPlotStats, CompleteBoxOptions } from "utils/interfaces";
import { detectZeroCross, mergeDeep, roundTo } from "utils/generic";
import { BoxPlot as BoxPlotInner } from "@visx/stats";
import { getFillColour } from "styles/colours";
import { defaultMargin } from "utils/config/plot";

const label = (d: BoxPlotStats) => d.label;
const min = (d: BoxPlotStats) => d.min;
const max = (d: BoxPlotStats) => d.max;
const q1 = (d: BoxPlotStats) => d.q1;
const q3 = (d: BoxPlotStats) => d.q3;
const median = (d: BoxPlotStats) => d.median;

export type BoxPlotProps = {
  width?: number;
  height?: number;
  options?: BoxPlotOptions;
  data: BoxPlotStats[];
};

const defaultPlotOptions: BoxPlotOptions = {
  y: { domain: { min: undefined, max: undefined }, label: "", log: false, base: 10, precision: 2 },
  x: { label: "" },
};

export const BoxPlot: React.FunctionComponent<BoxPlotProps> = withTooltip<BoxPlotProps, BoxPlotStats>(
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
    data,
  }) => {
    const config: CompleteBoxOptions = useMemo(() => {
      const newConfig: CompleteBoxOptions = mergeDeep(
        defaultPlotOptions,
        options ?? {},
      ) as CompleteBoxOptions;

      newConfig.y.domain = {
        min: newConfig.y.domain.min ?? Math.min(...data.map(min)) - 1,
        max: newConfig.y.domain.max ?? Math.max(...data.map(max)) + 1,
      };

      detectZeroCross(newConfig.y);

      return newConfig;
    }, [data, options]);

    const xMax = useMemo(() => {
      return width - defaultMargin.left - defaultMargin.right;
    }, [width]);

    const yMax = useMemo(() => {
      return height - defaultMargin.top - defaultMargin.bottom;
    }, [height]);

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

    const xScale = useMemo(
      () =>
        scaleBand<string>({
          range: [0, xMax],
          round: true,
          domain: data.map(label),
          padding: 0.4,
        }),
      [data, xMax],
    );

    const checkBoundaries = useCallback(
      (d: BoxPlotStats) => {
        return config.y.domain.min < min(d) && config.y.domain.max > max(d);
      },
      [config],
    );

    const boxWidth = xScale.bandwidth();
    const constrainedWidth = Math.min(40, boxWidth);

    return (
      <div>
        <svg data-testid='graph-svg' width={width} height={height}>
          <rect
            width={xMax}
            height={yMax}
            rx={14}
            x={defaultMargin.left}
            y={defaultMargin.top}
            fill='white'
            aria-label='Graph'
          />
          <Group left={defaultMargin.left} top={defaultMargin.top}>
            <GridRows scale={yScale} width={xMax} height={yMax} stroke='#e0e0e0' />
            <AxisLeft
              label={config.y.label}
              scale={yScale}
              numTicks={5}
              tickFormat={(v) => roundTo(v as number, config.y.precision)}
            />
            <AxisBottom top={yMax} scale={xScale} tickValues={data.map(label)} />
            {data.map(
              (d: BoxPlotStats, i) =>
                checkBoundaries(d) && (
                  <g key={i} data-testid='box-item'>
                    <BoxPlotInner
                      valueScale={yScale}
                      min={min(d)}
                      max={max(d)}
                      left={xScale(label(d))! + boxWidth / 2 - constrainedWidth * 0.2}
                      firstQuartile={q1(d)}
                      thirdQuartile={q3(d)}
                      boxWidth={constrainedWidth * 0.4}
                      stroke='var(--chakra-colors-diamond-800)'
                      fill={getFillColour(i)}
                      median={median(d)}
                      boxProps={{
                        "aria-label": "Box",
                        onMouseOver: () => {
                          showTooltip({
                            tooltipTop: yScale(median(d)),
                            tooltipLeft: xScale(label(d))!,
                            tooltipData: {
                              ...d,
                            },
                          });
                        },
                        onMouseLeave: hideTooltip,
                      }}
                      medianProps={{
                        style: {
                          stroke: "#FFF",
                        },
                      }}
                    />
                  </g>
                ),
            )}
          </Group>
        </svg>
        {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
          <Tooltip left={tooltipLeft} top={tooltipTop}>
            <div aria-label='Box Title'>
              <b style={{ color: "var(--chakra-colors-diamond-700)" }}>{tooltipData.label}</b>
            </div>
            <div style={{ marginTop: "5px", fontSize: "12px" }}>
              <div aria-label='Maximum'>
                <b>max:</b> {tooltipData.max}
              </div>
              <div aria-label='Third Quartile'>
                <b>third quartile:</b> {tooltipData.q3}
              </div>
              <div aria-label='Median'>
                <b>median:</b> {tooltipData.median}
              </div>
              <div aria-label='First Quartile'>
                <b>first quartile:</b> {tooltipData.q1}
              </div>
              <div aria-label='Minimum'>
                <b>min:</b> {tooltipData.min}
              </div>
            </div>
          </Tooltip>
        )}
      </div>
    );
  },
);
