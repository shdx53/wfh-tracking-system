// Library
import { z } from "zod";

// Define schema for the dynamic fields
const actionSchema = z.enum([
  "Approve",
  "Reject",
  "Withdraw entire arrangement",
  "Withdraw this specific arrangement only",
  "Cancel",
]);
const reasonSchema = z
  .string()
  .min(1, "Reason is required when rejecting or withdrawing");

export const arrangementRequestsSchema = z
  .object({})
  .catchall(z.union([actionSchema, reasonSchema.optional()]))
  .superRefine((data, ctx) => {
    // Loop through each key in the data object
    for (const key of Object.keys(data)) {
      // Check if it’s an action field
      if (key.endsWith("Action")) {
        const action = data[key];

        // Ensure action is selected
        if (!action) {
          ctx.addIssue({
            path: [key], // The field to show the error message for
            message: "Action is required",
          });
        }

        const reasonKey = key.replace("Action", "Reason");
        const reason = data[reasonKey];

        // Validate reason based on action
        if (
          (action === "Reject" ||
            action === "Withdraw entire arrangement" ||
            action === "Withdraw this specific arrangement only") &&
          (!reason || reason.trim() === "")
        ) {
          ctx.addIssue({
            path: [reasonKey],
            message: "Reason is required when rejecting or withdrawing",
          });
        }
      }
    }
  });
