import { z } from 'zod';
import { generateMock } from '@anatine/zod-mock';
import { faker } from '@faker-js/faker';

/**
 * Generates a Zod-compliant fake dataset based on the provided schema and number of rows.
 *
 * @param schema - The Zod schema definition.
 * @param numRows - The number of rows to generate in the fake dataset.
 * @returns An array of Zod-compliant fake dataset rows based on the provided schema.
 */
export function generateFakeDataset<T extends z.ZodObject<any, any>>(
  schema: T,
  numRows: number,
): z.infer<T>[] {
  // Define custom faker functions for specific fields in the schema
  const customFakers = {
    id: () => faker.string.uuid(),
    email: () => faker.internet.email(),
    primaryColor: () => faker.internet.color(),
    // Add more custom field generators as needed
  };

  // Create an array of fake data rows based on the specified number of rows
  const fakeDataset: z.infer<T>[] = Array.from({ length: numRows }, () =>
    generateMock(schema, {
      stringMap: customFakers,
    }),
  );

  return fakeDataset;
}

// Example usage:
// import { requestsSchema as Schema } from '@/models/schema';
// const fakeData = generateFakeDataset(Schema, 5);
// console.log(fakeData);
