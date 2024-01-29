import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; //CardDescription,
import { Grid, Heading, Flex } from '@radix-ui/themes';
import employeeData from '@/data/employees.json';
// import { Slider } from '@/components/ui/slider';

import { Button } from '@/components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { SkillGapChart, TopSkillGapChart } from '../components/graphs/SkillGapChart';
import { TotalSkillChart } from '../components/graphs/TotalSkillChart';
import { SkillHeatmap } from '../components/graphs/SkillHeatmap';
import { FacetedFilter } from '../components/faceted-filter';

function filterData(data, departmentFilter, skillCategoryFilter, experienceFilter, skillFilter) {
  let filteredData = data;
  if (departmentFilter.length > 0) {
    filteredData = filteredData.filter((employee) =>
      departmentFilter.includes(employee.Department),
    );
  }
  if (skillCategoryFilter.length > 0) {
    filteredData = filteredData
      .map((employee) => ({
        ...employee,
        Skills: employee.Skills.filter((skill) =>
          skillCategoryFilter.includes(skill.SkillCategory),
        ),
      }))
      .filter((employee) => employee.Skills.length > 0);
  }
  if (experienceFilter.length > 0) {
    filteredData = filteredData.filter((employee) =>
      experienceFilter.includes(employee.ExperienceLevel),
    );
  }
  if (skillFilter.length > 0) {
    filteredData = filteredData
      .map((employee) => ({
        ...employee,
        Skills: employee.Skills.filter((skill) => skillFilter.includes(skill.SkillName)), //skillFilter.includes(skill.SkillName)
      }))
      .filter((employee) => employee.Skills.length > 0);
  }
  return filteredData;
}

const getUniqueSkillCategoriesWithCounts = (data, variable) => {
  const uniqueValuesMap = new Map();

  // Iterate through each employee
  data.forEach((employee) => {
    // Handle employee-level property
    if (variable in employee) {
      const value = employee[variable];
      uniqueValuesMap.set(value, (uniqueValuesMap.get(value) || 0) + 1);
    }

    // Handle skills (assuming each employee has a 'Skills' array)
    if (Array.isArray(employee.Skills)) {
      employee.Skills.forEach((skill) => {
        if (variable in skill) {
          const value = skill[variable];
          uniqueValuesMap.set(value, (uniqueValuesMap.get(value) || 0) + 1);
        }
      });
    }
  });

  // Convert the map to an array of objects with { key, value }
  const result = Array.from(uniqueValuesMap, ([key, value]) => ({
    key,
    value,
  }));

  // Sort the result array if needed
  result.sort((a, b) => {
    if (typeof a.key === 'number' && typeof b.key === 'number') {
      // Numeric sort
      return a.key - b.key;
    } else {
      // String sort
      return ('' + a.key).localeCompare(b.key);
    }
  });

  return result;
};

export default function StatsPage() {
  const [departmentFilter, setDepartmentFilter] = useState([]);
  const [skillCategoryFilter, setSkillCategoryFilter] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState([]);
  const [skillFilter, setSkillFilter] = useState([]);
  const [highlightedSkill, setHighlightedSkill] = useState(null); //['Python', 'SQL']
  console.log('highlightedSkill', highlightedSkill);
  console.log('skillFilter', skillFilter);

  function setSkillFilterOnOff(skill) {
    if (skillFilter.includes(skill)) {
      setSkillFilter(skillFilter.filter((item) => item !== skill));
    } else {
      setSkillFilter([...skillFilter, skill]);
    }
  }

  const isFiltered =
    departmentFilter.length > 0 ||
    skillCategoryFilter.length > 0 ||
    experienceFilter.length > 0 ||
    skillFilter.length > 0;

  function resetFilters() {
    setDepartmentFilter('');
    setSkillCategoryFilter('');
    setExperienceFilter('');
    setSkillFilter([]);
  }

  const resetFiltersButton = isFiltered && (
    <Button variant='ghost' onClick={() => resetFilters()} className='text-destructive'>
      Reset filters
      <Cross2Icon className='ml-2 h-4 w-4' />
    </Button>
  );
  const filteredData = filterData(employeeData, departmentFilter, skillCategoryFilter, '', []);

  const graphData = filterData(filteredData, '', '', experienceFilter, skillFilter);

  const Skills = getUniqueSkillCategoriesWithCounts(filteredData, 'SkillName');
  const SkillCategories = getUniqueSkillCategoriesWithCounts(filteredData, 'SkillCategory');
  const experienceLevels2 = getUniqueSkillCategoriesWithCounts(employeeData, 'ExperienceLevel');
  const departments2 = getUniqueSkillCategoriesWithCounts(employeeData, 'Department');

  const nameOfDepartment = departmentFilter.length === 1 ? departmentFilter : `Company X`;
  //   return <div>{data}</div>;
  return (
    <Flex gap='3' direction={'column'} justify={'center'}>
      <Flex mb={'3'}>
        <Heading className='font-normal mr-2' size={'4'}>
          {`Admin > Analytics > `}
        </Heading>
        <Heading size={'4'}>Skills analysis</Heading>
      </Flex>
      <Flex gap='3' align={'center'}>
        <Heading size={'3'}>Filters: </Heading>
        <FacetedFilter
          title='Departments'
          stateFilterValues={departmentFilter}
          setFilterValues={setDepartmentFilter}
          facets={departments2}
        />
        <FacetedFilter
          title='Skill categories'
          stateFilterValues={skillCategoryFilter}
          setFilterValues={setSkillCategoryFilter}
          facets={SkillCategories}
        />
        <FacetedFilter
          title='Skills'
          stateFilterValues={skillFilter}
          setFilterValues={setSkillFilter}
          facets={Skills}
        />
        <FacetedFilter
          title='Experience levels'
          stateFilterValues={experienceFilter}
          setFilterValues={setExperienceFilter}
          facets={experienceLevels2}
        />
        {resetFiltersButton}
      </Flex>
      <Grid columns={{ initial: '2', md: '2', lg: '3' }} gap={'3'} mb={'8'} align={'stretch'}>
        <Card>
          <CardHeader>
            <CardTitle>{nameOfDepartment} is better than expected in these skills</CardTitle>
            <CardDescription>
              The skill gap is calculated as the difference between expected skill level and actual
              skill level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='w-full h-full'>
              <TopSkillGapChart data={graphData} setSkillFilter={setSkillFilterOnOff} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Skills {nameOfDepartment} needs to develop in</CardTitle>
            <CardDescription>
              The skill gap is calculated as the difference between expected skill level and actual
              skill level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='w-full h-full'>
              <SkillGapChart data={graphData} setSkillFilter={setHighlightedSkill} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Most common skills in {nameOfDepartment}</CardTitle>
            <CardDescription>
              The skills depicted below are divided per level of skill (beginner to expert)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TotalSkillChart data={graphData} />
          </CardContent>
        </Card>
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Most common skills in {nameOfDepartment}</CardTitle>
            <CardDescription>
              The skills depicted below are divided per level of skill (beginner to expert)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SkillHeatmap filteredData={graphData} />
          </CardContent>
        </Card>
      </Grid>
    </Flex>
  );
}
