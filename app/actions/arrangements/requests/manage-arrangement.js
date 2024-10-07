"use server";

// Library
import connection from "@/app/lib/db";

const requestStatus = {
  Approve: "approved",
  Reject: "rejected",
  "Withdraw this specific arrangement only": "withdrawn",
};

export async function manageArrangement(formData) {
  try {
    // Establish the connection using the pool
    const pool = await connection();

    // Get a connection from the pool
    const conn = await pool.getConnection();

    for (const key in formData) {
      if (key.includes("Action")) {
        const actionKey = key;
        const action = formData[actionKey];
        const arrangementID = key.match(/\d+/)[0];

        const reasonKey = `${arrangementID}Reason`;
        let reason;
        if (reasonKey in formData) {
          reason = formData[reasonKey];
        }

        // Update arrangement
        try {
          if (reason) {
            /* If a reason is provided (for rejection or withdrawawl) */
            if (action === "Withdraw entire arrangement") {
              /* Withdraw entire arrangement */
              // Fetch Applied_Datetime
              const [rows] = await conn.query(
                `SELECT Applied_Datetime FROM Arrangement WHERE Arrangement_ID = ? LIMIT 1`,
                [arrangementID],
              );
              const appliedDatetime = rows[0].Applied_Datetime;

              // Update all arrangements with the same Applied_Datetime
              await conn.query(
                `
                  UPDATE Arrangement 
                  SET Request_Status = "withdrawn", Update_Reason = ? 
                  WHERE Applied_Datetime = ?
                `,
                [reason, appliedDatetime],
              );
            } else {
              await conn.query(
                "UPDATE Arrangement SET Request_Status = ?, Update_Reason = ? WHERE Arrangement_ID = ?",
                [requestStatus[action], reason, arrangementID],
              );
            }
          } else {
            /* *Override Update_Reason to NULL */
            await conn.query(
              "UPDATE Arrangement SET Request_Status = ?, Update_Reason = NULL WHERE Arrangement_ID = ?",
              [requestStatus[action], arrangementID],
            );
          }
        } catch (error) {
          return {
            message: "Failed to update arrangement(s)",
          };
        }
      }
    }

    // Release the connection back to the pool
    conn.release();

    return {
      message: "Arrangement(s) updated successfully",
    };
  } catch (error) {
    return {
      message: "Failed to update arrangement(s)",
    };
  }
}
