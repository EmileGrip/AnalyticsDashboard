// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/heatmap
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { useState } from 'react';

const convertDataset = (dataset, metric, aggregationKey) => {
  const skillData = {};
  const departmentContributions = {};

  // Aggregate skills and department contributions
  dataset.forEach((employee) => {
    const department = employee.Department;

    if (!departmentContributions[department]) {
      departmentContributions[department] = {};
    }

    employee.Skills.forEach((skill) => {
      const key = skill[aggregationKey]; // 'SkillName' or 'SkillCategory'
      const skillValue =
        metric === 'SkillLevel' ? skill.SkillLevel : skill.ExpectedLevel - skill.SkillLevel;

      if (!skillData[key]) {
        skillData[key] = { total: 0, departments: {} };
      }

      skillData[key].total += skillValue;

      if (!skillData[key].departments[department]) {
        skillData[key].departments[department] = 0;
      }

      skillData[key].departments[department] += skillValue;
      departmentContributions[department][key] = skillData[key].departments[department];
    });
  });

  // Sort skills and pick top 10
  const topSkills = Object.entries(skillData)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 10)
    .map(([key, data]) => ({
      skill: key,
      total: data.total,
      departments: data.departments,
    }));

  // Format data for departments
  const result = Object.entries(departmentContributions).map(([department, skills]) => ({
    id: department,
    data: topSkills
      .filter((skill) => skill.departments[department] !== undefined)
      .map((skill) => ({
        x: skill.skill,
        y: skill.departments[department],
      })),
  }));

  return result;
};

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export function SkillHeatmap({ filteredData }) {
  const [metric] = useState('SkillLevel'); // or 'SkillGap'
  const [aggregationKey] = useState('SkillName'); // or 'SkillCategory'

  const transformedData = convertDataset(filteredData, metric, aggregationKey);

  const data2 = [
    {
      id: 'Japan',
      data: [
        {
          x: 'Train',
          y: 85544,
        },
        {
          x: 'Subway',
          y: -74205,
        },
        {
          x: 'Bus',
          y: -5790,
        },
        {
          x: 'Car',
          y: -70798,
        },
        {
          x: 'Boat',
          y: -65427,
        },
        {
          x: 'Moto',
          y: 85869,
        },
        {
          x: 'Moped',
          y: 69614,
        },
        {
          x: 'Bicycle',
          y: -39416,
        },
        {
          x: 'Others',
          y: 55789,
        },
      ],
    },
    {
      id: 'France',
      data: [
        {
          x: 'Train',
          y: 80434,
        },
        {
          x: 'Subway',
          y: -53637,
        },
        {
          x: 'Bus',
          y: 72155,
        },
        {
          x: 'Car',
          y: 65142,
        },
        {
          x: 'Boat',
          y: -30427,
        },
        {
          x: 'Moto',
          y: -41377,
        },
        {
          x: 'Moped',
          y: 99440,
        },
        {
          x: 'Bicycle',
          y: 60498,
        },
        {
          x: 'Others',
          y: 34295,
        },
      ],
    },
    {
      id: 'US',
      data: [
        {
          x: 'Train',
          y: 99344,
        },
        {
          x: 'Subway',
          y: -31364,
        },
        {
          x: 'Bus',
          y: 56774,
        },
        {
          x: 'Car',
          y: -59852,
        },
        {
          x: 'Boat',
          y: 44659,
        },
        {
          x: 'Moto',
          y: 11123,
        },
        {
          x: 'Moped',
          y: -60749,
        },
        {
          x: 'Bicycle',
          y: -66061,
        },
        {
          x: 'Others',
          y: -44208,
        },
      ],
    },
    {
      id: 'Germany',
      data: [
        {
          x: 'Train',
          y: 17161,
        },
        {
          x: 'Subway',
          y: 73667,
        },
        {
          x: 'Bus',
          y: -94190,
        },
        {
          x: 'Car',
          y: 64057,
        },
        {
          x: 'Boat',
          y: -37326,
        },
        {
          x: 'Moto',
          y: 90765,
        },
        {
          x: 'Moped',
          y: 5983,
        },
        {
          x: 'Bicycle',
          y: 57659,
        },
        {
          x: 'Others',
          y: -5986,
        },
      ],
    },
    {
      id: 'Norway',
      data: [
        {
          x: 'Train',
          y: -21190,
        },
        {
          x: 'Subway',
          y: -15234,
        },
        {
          x: 'Bus',
          y: -20883,
        },
        {
          x: 'Car',
          y: -33093,
        },
        {
          x: 'Boat',
          y: 42948,
        },
        {
          x: 'Moto',
          y: -39268,
        },
        {
          x: 'Moped',
          y: 27529,
        },
        {
          x: 'Bicycle',
          y: -97605,
        },
        {
          x: 'Others',
          y: -22622,
        },
      ],
    },
    {
      id: 'Iceland',
      data: [
        {
          x: 'Train',
          y: -48258,
        },
        {
          x: 'Subway',
          y: 15847,
        },
        {
          x: 'Bus',
          y: 24306,
        },
        {
          x: 'Car',
          y: 76199,
        },
        {
          x: 'Boat',
          y: 19198,
        },
        {
          x: 'Moto',
          y: 78555,
        },
        {
          x: 'Moped',
          y: 43712,
        },
        {
          x: 'Bicycle',
          y: 1926,
        },
        {
          x: 'Others',
          y: 36320,
        },
      ],
    },
    {
      id: 'UK',
      data: [
        {
          x: 'Train',
          y: -58250,
        },
        {
          x: 'Subway',
          y: 94161,
        },
        {
          x: 'Bus',
          y: 52273,
        },
        {
          x: 'Car',
          y: -83007,
        },
        {
          x: 'Boat',
          y: 25419,
        },
        {
          x: 'Moto',
          y: 61279,
        },
        {
          x: 'Moped',
          y: 40914,
        },
        {
          x: 'Bicycle',
          y: 54213,
        },
        {
          x: 'Others',
          y: 96552,
        },
      ],
    },
    {
      id: 'Vietnam',
      data: [
        {
          x: 'Train',
          y: -99690,
        },
        {
          x: 'Subway',
          y: -58098,
        },
        {
          x: 'Bus',
          y: -68480,
        },
        {
          x: 'Car',
          y: -83734,
        },
        {
          x: 'Boat',
          y: -1406,
        },
        {
          x: 'Moto',
          y: -18698,
        },
        {
          x: 'Moped',
          y: -14577,
        },
        {
          x: 'Bicycle',
          y: 76273,
        },
        {
          x: 'Others',
          y: 94208,
        },
      ],
    },
  ];
  console.log('heatmap data', data2);
  console.log('skill data', transformedData);
  return (
    <div style={{ height: '400px' }}>
      <ResponsiveHeatMap
        data={transformedData}
        // data={data2}
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        valueFormat='>-.2s'
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -90,
          legend: '',
          legendOffset: 46,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Department',
          legendPosition: 'middle',
          legendOffset: -72,
        }}
        colors={{
          type: 'diverging',
          scheme: 'yellow_green_blue',
        }}
        emptyColor='#555555'
      />
    </div>
  );
}
