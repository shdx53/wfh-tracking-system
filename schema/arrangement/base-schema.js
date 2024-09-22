import { z } from "zod";

// Base schema
const baseSchema = z.object({
  "arrangement-type": z.enum(["Ad-hoc", "Recurring"], {
    required_error: "Required.",
  }),
  dates: z
    .array(
      z.object({
        date: z.date({
          required_error: "Required.",
        }),
        shiftType: z.enum(["AM", "PM", "Full Day"], {
          required_error: "Required.",
        }),
      }),
    )
    .min(1, { message: "At least one date is required." }),
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
      "recurring-frequency": z.enum(["Weekly", "Monthly"], {
        required_error: "Required.",
      }),
    });
  }
  return baseSchema;
};
