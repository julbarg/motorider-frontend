import { PieChart } from 'react-minimal-pie-chart'
import React, { useState, ComponentProps } from 'react'

type PieChartFullOptionProps = {
  data: ComponentProps<typeof PieChart>['data']
}

/**
 * This component was taken from https://github.com/toomuchdesign/react-minimal-pie-chart/blob/master/stories/FullOption.tsx
 * Belongs to example of react-minimal-pie-chart library
 * https://toomuchdesign.github.io/react-minimal-pie-chart/index.html?path=/story/pie-chart--full-option
 * By toomuchdesign
 * @param props
 * @returns
 */
export const PieChartFullOption = (props: PieChartFullOptionProps) => {
  const [selected, setSelected] = useState<number | undefined>(0)
  const [hovered, setHovered] = useState<number | undefined>(undefined)

  const data = props.data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: 'grey',
      }
    }
    return entry
  })

  const lineWidth = 60

  return (
    <PieChart
      style={{
        fontFamily:
          '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
        fontSize: '8px',
      }}
      data={data}
      radius={PieChart.defaultProps.radius - 6}
      lineWidth={60}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={(index) => (index === selected ? 6 : 1)}
      animate
      label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
      labelPosition={100 - lineWidth / 2}
      labelStyle={{
        fill: '#fff',
        opacity: 0.75,
        pointerEvents: 'none',
      }}
      onClick={(_, index) => {
        setSelected(index === selected ? undefined : index)
      }}
      onMouseOver={(_, index) => {
        setHovered(index)
      }}
      onMouseOut={() => {
        setHovered(undefined)
      }}
    />
  )
}
