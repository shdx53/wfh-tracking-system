import { z } from "zod";

// Base schema
const baseSchema = z.object({
  arrangementType: z
    .enum(["Ad-hoc", "Recurring"])
    .nullable()
    .refine((value) => value !== null, {
      message: "Required.",
    }),
  startDate: z
    .date({})
    .nullable()
    .refine((value) => value !== null, {
      message: "Required.",
    }),
  shiftType: z
    .enum(["AM", "PM", "Full Day"])
    .nullable()
    .refine((value) => value !== null, {
      message: "Required.",
    }),
  applyReason: z
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
      endDate: z
      .date({})
      .nullable()
      .refine((value) => value !== null, {
        message: "Required.",
      }),
      recurringInterval: z
        .enum(["Weekly", "Monthly"], {
          required_error: "Required.",
        })
        .nullable(),
    });
  }
  return baseSchema;
};
