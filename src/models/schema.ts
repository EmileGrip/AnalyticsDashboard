import { z } from 'zod';

export const requestsSchema = z.object({
  toetsing_referentienummer: z.optional(z.nullable(z.string())),
  energiecontract_id: z.optional(z.nullable(z.number())),
  status_code: z.optional(z.nullable(z.string())),
  energiemaatschappij_identificatiecode: z.optional(z.nullable(z.string())),
});
