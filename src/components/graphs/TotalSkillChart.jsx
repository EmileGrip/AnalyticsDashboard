import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

function transformData(data) {
  const skillMap = {};

  data.forEach((employee) => {
    employee.Skills.forEach((skill) => {
      const skillKey = `${skill.SkillName}-${skill.SkillCategory}`;

      const skillLevelMapping = {
        1: 'Beginner',
        2: 'Intermediate',
        3: 'Advanced',
        4: 'Expert',
      };

      const skillLevelKey = `${skillLevelMapping[skill.SkillLevel]}`;

      if (!skillMap[skillKey]) {
        skillMap[skillKey] = {
          skill: skill.SkillName,
          category: skill.SkillCategory,
          total: 0, // Initialize total count
        };
      }

      if (!skillMap[skillKey][skillLevelKey]) {
        skillMap[skillKey][skillLevelKey] = 0;
      }

      skillMap[skillKey][skillLevelKey] += 1;
      skillMap[skillKey].total += 1; // Increment total count
    });
  });

  const result = Object.values(skillMap);

  // Sort the result by the total count in descending order
  result.sort((a, b) => b.total - a.total);

  // Remove the 'total' property if not needed in final output
  result.forEach((item) => delete item.total);

  return result;
}

export function TotalSkillChart({ data }) {
  const transformedData = transformData(data);

  console.log(transformedData);

  return <BarBar data={transformedData} />;
}

const BarBar = ({ data }) => {
  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        data={data.slice(0, 10).reverse()}
        keys={['Beginner', 'Intermediate', 'Advanced', 'Expert']}
        indexBy='skill'
        layout='horizontal'
        enableGridY={false}
        enableGridX={true}
        onMouseEnter={(_datum, event) => {
          event.currentTarget.style.cursor = 'pointer';
        }}
        colors={['#f47560', '#e8c1a0', '#61cdbb', '#97e3d5']}
        margin={{ top: 0, right: 0, bottom: 50, left: 150 }}
        padding={0.4}
        valueScale={{ type: 'linear' }}
        animate={true}
        enableLabel={false}
      />
    </div>
  );
};
