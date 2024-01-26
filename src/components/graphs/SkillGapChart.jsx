import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

function transformData(data) {
  const skillGaps = {};

  data.forEach((employee) => {
    employee.Skills.forEach((skill) => {
      const gap = skill.ExpectedLevel - skill.SkillLevel;
      if (!skillGaps[skill.SkillName]) {
        skillGaps[skill.SkillName] = { totalGap: 0, count: 0 };
      }
      skillGaps[skill.SkillName].totalGap += gap;
      skillGaps[skill.SkillName].count += 1;
    });
  });

  const transformedData = Object.keys(skillGaps).map((skillName) => {
    const { totalGap, count } = skillGaps[skillName];
    return { SkillName: skillName, SkillGap: Math.round((10 * totalGap) / count) / 10 };
  });

  return transformedData;
}

export function SkillGapChart({ data, setSkillFilter }) {
  const transformedData = transformData(data);
  console.log('transformedData', transformedData);

  return (
    <BarBar
      data={transformedData
        .filter((item) => item.SkillGap < 0)
        .sort((a, b) => a.SkillGap - b.SkillGap)
        .slice(0, 10)
        .reverse()}
      color='#f47560'
      setSkillFilter={setSkillFilter}
    />
  );
}

export function TopSkillGapChart({ data, setSkillFilter }) {
  const transformedData = transformData(data);
  return (
    <BarBar
      data={transformedData
        .filter((item) => item.SkillGap > 0)
        .sort((a, b) => b.SkillGap - a.SkillGap)
        .slice(0, 10)
        .reverse()}
      color='#61cdbb'
      setSkillFilter={setSkillFilter}
    />
  );
}
const BarBar = ({ data, color, setSkillFilter }) => {
  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        data={data}
        keys={['SkillGap']}
        indexBy='SkillName'
        layout='horizontal'
        enableGridY={false}
        enableGridX={true}
        colors={color}
        colorBy='color'
        margin={{ top: 0, right: 0, bottom: 50, left: 150 }}
        padding={0.4}
        valueScale={{ type: 'linear' }}
        animate={true}
        enableLabel={false}
        // unique skillNames only:
        onClick={(e) => setSkillFilter(e.data.SkillName)}
        isInteractive={true}
        onMouseEnter={(_datum, event) => {
          event.currentTarget.style.cursor = 'pointer';
          console.log(_datum.indexValue);
        }}
        theme={{
          text: {
            fontFamily: 'Poppins, sans-serif',
          },
        }}
      />
    </div>
  );
};
