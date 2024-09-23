import { z } from "zod";

// Base schema
const baseSchema = z.object({
  "arrangement-type": z
    .enum(["Ad-hoc", "Recurring"])
    .nullable()
    .refine((value) => value !== null, {
      message: "Required.",
    }),
  "start-date": z
    .date({})
    .nullable()
    .refine((value) => value !== null, {
      message: "Required.",
    }),
  "shift-type": z
    .enum(["AM", "PM", "Full Day"])
    .nullable()
    .refine((value) => value !== null, {
      message: "Required.",
    }),
  "apply-reason": z
    .string()
    .max(50, {
      message: "Reason must be 50 characters or fewer",
    })
    .optional(),
});

// Function to get the full schema based on arrangement type
export const getSchema = (isRecurring) => {
  if (isRecurring) {
    return baseSchema.extend({
      "end-date": z
      .date({})
      .nullable()
      .refine((value) => value !== null, {
        message: "Required.",
      }),
      "recurring-frequency": z
        .enum(["Weekly", "Monthly"], {
          required_error: "Required.",
        })
        .nullable(),
    });
  }
  return baseSchema;
};
